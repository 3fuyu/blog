/**
 * Created by 3fuyu on 2016/10/19.
 */

import {Component} from 'react';
import DataServicce from '../../service/DataService';
import Login from '../management/Login';

class ArticleDetail extends Component {

    state = {
        articleObj: {}
    };

    componentWillMount () {
        let t = this,
            id = this.props.params.id;

        DataServicce.getArticalDetail({
            id: id
        }).then(function (data) {

            console.log(data);
        });
    }

    render () {
        return (
            <div>
                <div>test</div>
                <Login params = {this.props.params}/>
            </div>

        );
    }
}

export default ArticleDetail;
