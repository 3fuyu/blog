/**
 * Created by 3fuyu on 2016/10/19.
 */

import {Component} from "react";
import DataServicce from "../../service/DataService";
import moment from "moment";
import "../../../css/articleDetail.less";
import "../../../../../node_modules/highlight.js/styles/github-gist.css";

class ArticleDetail extends Component {

    state = {
        articleObj: {},
        categorys: ['java', 'javascript', 'python', 'ruby', 'c', 'c++', 'c#', 'ObjectC', 'go']
    };

    componentWillMount() {
        let t = this,
            id = this.props.params.id;

        DataServicce.getArticleDetail({
            id: id
        }).then(function (data) {
            t.setState({
                articleObj: data
            });
        });
    }

    render() {
        return (
            <div id="article-detail">
                <div className="article-main">
                    <h1 className="article-title">{this.state.articleObj.postTitle}</h1>

                    <div className="article-date">
                        {moment(this.state.articleObj.postDate).format('MMMM Do YYYY')}
                    </div>

                    <div dangerouslySetInnerHTML={{__html: this.state.articleObj.postMdContent}}
                         className="article-content"></div>
                </div>
                <div className="article-sidebar">
                    <div className="article-sidebar-category">
                        分类标签
                    </div>
                    <div className="article-sidebar-category-list">
                        {this.state.categorys.map(function (value, key) {
                            return (
                                <div key={key} className="category-item">{value}</div>
                            );
                        })}
                    </div>
                </div>

            </div>

        );
    }
}

export default ArticleDetail;
