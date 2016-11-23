/**
 * Created by 3fuyu on 16/10/5.
 */

import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import TextField from '../../../../../node_modules/material-ui/TextField';
import FloatingActionButton from '../../../../../node_modules/material-ui/FloatingActionButton';
import ContentAdd from '../../../../../node_modules/material-ui/svg-icons/content/add';
import AutoComplete from '../../../../../node_modules/material-ui/AutoComplete';
import moment from 'moment';
import '../../../css/newArticle.less';
import DataService from '../../service/DataService';
import Util from '../../service/FYToolService';

class NewArticle extends Component {
    state = {
        title: '',
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

    submit () {
        const t = this;
        DataService.adminPostNew({
            title: t.state.title,
            content: t.refs.articleContent.value
        }).then(function (data) {
            Util.tips('发布成功');
            t.context.router.push('/management/article-list');
        });
    }

    titleChange (e) {
        this.setState({
            title: e.target.value
        });
    }

    handleUpdateInput (value) {
        this.setState({
            dataSource: [
                value,
                value + value,
                value + value + value,
            ],
        });
    };

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

                <div className="article-date">Date: &nbsp;&nbsp;&nbsp;&nbsp;{date}</div>

                <AutoComplete
                    className="article-category"
                    hintText="选择分类"
                    dataSource={this.state.dataSource}
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