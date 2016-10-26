/**
 * Created by 3fuyu on 2016/10/19.
 */

import {Component} from 'react';
import DataServicce from '../../service/DataService';
import moment from 'moment';

import '../../../css/articleDetail.less';


class ArticleDetail extends Component {

    state = {
        articleObj: {}
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
                    <div className="article-title">{this.state.articleObj.postTitle}</div>

                    <div className="article-date">
                        {moment(this.state.articleObj.postDate).format('YYYY-MM-DD')}
                    </div>

                    <div dangerouslySetInnerHTML={{__html: this.state.articleObj.postMdContent}}
                         className="article-content"></div>
                </div>
                <div className="article-sidebar">

                </div>

            </div>

        );
    }
}

export default ArticleDetail;
