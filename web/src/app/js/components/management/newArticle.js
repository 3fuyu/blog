/**
 * Created by 3fuyu on 16/10/5.
 */

import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import TextField from '../../../../../node_modules/material-ui/TextField';
import FloatingActionButton from '../../../../../node_modules/material-ui/FloatingActionButton';
import ContentAdd from '../../../../../node_modules/material-ui/svg-icons/content/add';
import moment from 'moment';
import '../../../css/newArticle.less';
import marked from 'marked';

class NewArticle extends Component {
    getDate() {
        let date = new Date();

        return moment(date).format('YYYY-MM-DD');
    }

    componentDidMount() {
        let target = ReactDOM.findDOMNode(document.getElementById('article-editor')),
            parentTitle = ReactDOM.findDOMNode(document.getElementsByClassName('article-title')[0]),
            parentDate = ReactDOM.findDOMNode(document.getElementsByClassName('article-date')[0]);

        target.addEventListener('scroll', function () {
            let scrollTop = this.scrollTop;

            if (scrollTop < 30) {
                $(parentTitle).fadeIn(100);
                $(parentDate).fadeIn(100);
            } else {
                $(parentTitle).fadeOut(100);
                $(parentDate).fadeOut(100);
            }
        });
    }

    submit () {
        console.log(marked(this.refs.articleValue.value));
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
                />

                <div className="article-date">Date: &nbsp;&nbsp;&nbsp;&nbsp;{date}</div>

                <textarea name="newArticle" id="article-editor" ref="articleValue"></textarea>
                
                <FloatingActionButton className="article-submit" onClick={() => this.submit()}>
                    <ContentAdd />
                </FloatingActionButton>
            </div>
        );
    }
}

export default NewArticle;