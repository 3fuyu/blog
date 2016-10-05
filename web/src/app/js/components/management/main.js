import React, {Component, PropTypes} from "react";
import AppBar from "../../../../../node_modules/material-ui/AppBar";
import Drawer from "../../../../../node_modules/material-ui/Drawer";
import MenuItem from "../../../../../node_modules/material-ui/MenuItem";
import "../../../css/base.less";
import "../../../css/main.less";

class Main extends React.Component {
    static propTypes = {
    };

    static contextTypes = {
        muiTheme: PropTypes.object.isRequired,
        router: PropTypes.object.isRequired
    };

    state = {
        leftOpen: false,
    };

    handleToggle() {this.setState({leftOpen: !this.state.leftOpen})}

    clickLeft() {
        this.setState({
            leftOpen: true
        });
    }

    goWrite() {
        console.log('test');
    }

    render() {
        return (
            <div>
                test
            </div>
        );
    }
}

export default Main;