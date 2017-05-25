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
        this.loadData();
    }

    initComment() {
        var t = this;

        setTimeout(function () {
            document.getElementById('SOHUCS').setAttribute('sid', t.state.articleObj.id);

            window.changyan.api.config({
                appid: 'cyt1S1w3M',
                conf: 'prod_73f06d34400f0e589effbae941fad7d8'
            });
        }, 500)
    }

    loadData() {
        let t = this,
            id = '',
            hash = window.location.hash;

        id = hash.split('/')[hash.split('/').length - 1];

        window.scrollTo(0, 0);

        DataServicce.getArticleDetail({
            id: id
        }).then(function (data) {
            t.setState({
                articleObj: data
            });
            t.initComment();
        });
    }

    componentWillReceiveProps() {
        this.loadData();
        console.log('come in');
    }

    render() {
        return (
            <div id="article-detail">
                <div className="article-detail-content">
                    <div className="article-main">
                        <h1 className="article-title">{this.state.articleObj.postTitle}</h1>

                        <div className="article-date">
                            {moment(this.state.articleObj.postDate).format('MMMM Do YYYY')}
                        </div>

                        <div dangerouslySetInnerHTML={{__html: this.state.articleObj.postMdContent}}
                             className="article-content"></div>
                    </div>
                    <div className="article-sidebar">
                        <div className="article-sidebar-tag">
                            标签
                        </div>
                        <div className="article-sidebar-tag-list">
                            {this.state.categorys.map(function (value, key) {
                                return (
                                    <div key={key} className="tag-item">{value}</div>
                                );
                            })}
                        </div>
                    </div>
                </div>
                <div id="cloud-tie-wrapper" className="cloud-tie-wrapper"
                     style={{margin: '10px 125px 30px 125px'}}></div>

                <div id="SOHUCS"></div>
            </div>

        );
    }
}

export default ArticleDetail;
