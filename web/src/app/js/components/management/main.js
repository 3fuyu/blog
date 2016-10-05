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
            <div id="main">
                <AppBar
                    className="app-bar-title"
                    title="fdf"
                    onLeftIconButtonTouchTap={() => this.clickLeft()}
                />
                <Drawer open={this.state.leftOpen} className="menu">
                    <div className="menu-title">3fuyu 管理后台</div>
                    <MenuItem primaryText="文章管理" onClick={() => this.goWrite()}/>
                    <MenuItem primaryText="分类管理"/>
                    <MenuItem primaryText="评论管理"/>
                </Drawer>
            </div>
        );
    }
}

export default Main;