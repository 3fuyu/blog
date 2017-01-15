/**
 * Created by 3fuyu on 16/10/5.
 */

import React, {Component, PropTypes} from "react";
import ReactDOM from "react-dom";
import TextField from "../../../../../node_modules/material-ui/TextField";
import FloatingActionButton from "../../../../../node_modules/material-ui/FloatingActionButton";
import ContentAdd from "../../../../../node_modules/material-ui/svg-icons/content/add";
import AutoComplete from "../../../../../node_modules/material-ui/AutoComplete";
import DatePicker from "../../../../../node_modules/material-ui/DatePicker";
import moment from "moment";
import "../../../css/newArticle.less";
import DataService from "../../service/DataService";
import Util from "../../service/FYToolService";

const dataSourceConfig = {
    text: 'name',
    value: 'id'
};

let categoryObj = {};

class NewArticle extends Component {
    state = {
        title: '',
        date: new Date(),
        dataSource: []
    };

    static contextTypes = {
        muiTheme: PropTypes.object.isRequired,
        router: PropTypes.object.isRequired,
    };

    getDate() {
        let date = new Date();

        return moment(date).format('YYYY-MM-DD');
    }

    componentDidMount() {
        let target = ReactDOM.findDOMNode(document.getElementById('article-editor')),
            parentTitle = ReactDOM.findDOMNode(document.getElementsByClassName('article-title')[0]),
            parentDate = ReactDOM.findDOMNode(document.getElementsByClassName('article-date')[0]),
            parentCategory = ReactDOM.findDOMNode(document.getElementsByClassName('article-category')[0]);

        target.addEventListener('scroll', function () {
            let scrollTop = this.scrollTop;

            if (scrollTop < 20) {
                $(parentTitle).fadeIn(100);
                $(parentDate).fadeIn(100);
                $(parentCategory).fadeIn(100);
            } else {
                $(parentTitle).fadeOut(100);
                $(parentDate).fadeOut(100);
                $(parentCategory).fadeOut(100);
            }
        });

    }

    componentWillMount() {
        this.getCategoryList();
    }

    getCategoryList() {
        var t = this;

        DataService.adminQueryTermsList({}).then(function (data) {
            t.setState({
                dataSource: data
            });
        });
    }

    submit() {
        const t = this;
        DataService.adminPostNew({
            title: t.state.title,
            content: t.refs.articleContent.value,
            categoryId: categoryObj.id,
            categoryName: categoryObj.name,
            date: +new Date(t.state.date)
        }).then(function (data) {
            Util.tips('发布成功');
            t.context.router.push('/management/article-list');
        });
    }

    titleChange(e) {
        this.setState({
            title: e.target.value
        });
    }

    dateChange(event, date) {
        this.setState({
            date: date
        });
    }

    handleUpdateInput(value) {
        // console.log(value);
    }

    selectedCategory(value) {
        categoryObj = value;
    }

    render() {
        var t = this,
            date = this.getDate();

        return (
            <div id="new-article">
                <TextField
                    className="article-title"
                    hintText="Title"
                    fullWidth={true}
                    value={this.state.title}
                    onChange={(event) => this.titleChange(event)}
                />

                <DatePicker
                    hintText="Date Input"
                    style={{zIndex: '99',position:'relative'}}
                    value={this.state.date}
                    onChange={(event, date) => this.dateChange(event, date)}
                />
                <div className="article-date">Date: &nbsp;&nbsp;&nbsp;&nbsp;{date}</div>

                <AutoComplete
                    className="article-category"
                    hintText="Category"
                    openOnFocus={true}
                    filter={AutoComplete.fuzzyFilter}
                    dataSource={this.state.dataSource}
                    dataSourceConfig={dataSourceConfig}
                    onNewRequest={(value) => this.selectedCategory(value)}
                    onUpdateInput={(value) => this.handleUpdateInput(value)}
                />

                <textarea name="newArticle" id="article-editor" ref="articleContent"></textarea>

                <FloatingActionButton className="article-submit" onClick={() => this.submit()}>
                    <ContentAdd />
                </FloatingActionButton>
            </div>
        );
    }
}

export default NewArticle;