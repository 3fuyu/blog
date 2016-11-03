/**
 * Created by 3fuyu on 2016/11/3.
 */

import {Component} from "react";
import CircularProgress from "../../../../../node_modules/material-ui/CircularProgress";

class Loading extends Component {
    render() {
        let style = _.extend({
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
            margin: '100px auto 400px'
        }, this.props.style);

        let contentStyle = {
            marginTop: '20px',
            color: '#1FBCD2',
            fontSie: '20px',
            fontWeight: 'bold'
        }

        return (
            <div style={style} id="loading">
                <div>
                    <CircularProgress />
                </div>
                <div style={contentStyle}>Loading...</div>
            </div>
        );
    }
}

export default Loading;