"use strict";

import React from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import '../../../css/base.less';
import '../../../css/main.less';

class Main extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            leftOpen: true
        };
    }

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
                    <MenuItem primaryText="文章管理" onItemTouchTap={() => this.goWrite()}/>
                    <MenuItem primaryText="分类管理" />
                    <MenuItem primaryText="评论管理" />
                </Drawer>
            </div>
        );
    }
}

export default Main;