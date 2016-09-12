"use strict";

import React from 'react';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import '../../css/login.less';

const style = {
    marginLeft: 20,
    marginRight: 20,
    display: 'block',
    width: 'auto'
};

const login = () => (
    <div id="login">
        <div className="title">
            3fuyu's blog
        </div>
        <Paper zDepth={2} className="content">
            <TextField hintText='用户名' style={style} underlineShow={false}/>
            <Divider />
            <TextField hintText='密码' style={style} underlineShow={false}/>
            <Divider />
        </Paper>
    </div>
);

export default login;