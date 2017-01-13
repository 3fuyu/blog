"use strict";

import React, {Component, PropTypes} from 'react';
import TextField from '../../../../../node_modules/material-ui/TextField';
import DataService from '../../service/DataService';
import FYT from '../../service/FYToolService';
import { Navigation } from "react-router";
import '../../../css/login.less';

class Login extends React.Component {
    static contextTypes = {
        router: PropTypes.object.isRequired
    };

    state = {
        name: '',
        password: '',
        loginStyle: {
            color: '#bbb'
        },
        nameErr: '',
        passwordErr: ''
    };

    handleChange(event) {
        let t = this;

        if (event.target.id === 'login-name') {
            this.setState({
                name: event.target.value
            });
        } else if (event.target.id === 'login-password') {
            this.setState({
                password: event.target.value
            });
        }

        setTimeout(function () {
            if (t.state.name && t.state.password) {
                t.setState({
                    loginStyle: {
                        color: '#ff4081'
                    }
                });
            } else {
                t.setState({
                    loginStyle: {
                        color: '#bbb'
                    }
                });
            }
        }, 0);
    }

    onLogin() {
        let t = this;

        t.state.name ? t.setState({nameErr: ''}) : t.setState({nameErr: '请输入用户名'});
        t.state.password ? t.setState({passwordErr: ''}) : t.setState({passwordErr: '请输入密码'});

        if (t.state.name && t.state.password) {
            DataService.login({
                name: t.state.name,
                password: t.state.password
            }).then(function (data) {
                FYT.tips('登录成功!');
                window.location.href = '#/management/article-list';
            }, function (data) {
                if (data.errorCode === 401) {
                    FYT.tips(data.errorDescription);
                } else {
                    throw (data.errorDescription);
                }
            });
        }
    }
    listenKeyPress(e) {
        if (e.nativeEvent.keyCode === 13) {
            this.onLogin();
        }
    }

    render() {
        return (
            <div id="login" onKeyPress={(e) => this.listenKeyPress(e)}>
                <div className="title">
                    3fuyu's  blog
                </div>
                <div className="content">
                    <TextField
                        id="login-name"
                        hintText=""
                        style={{width: '100%'}}
                        floatingLabelText="name"
                        errorText={this.state.nameErr}
                        value={this.state.name}
                        onChange={(event) => this.handleChange(event)} /><br />

                    <div className="on-login" onClick={() => this.onLogin()} style={this.state.loginStyle}>
                        <i className="iconfont icon-pullright"></i>
                    </div>

                    <TextField
                        id="login-password"
                        hintText=""
                        style={{width: '100%'}}
                        errorText={this.state.passwordErr}
                        floatingLabelText="password"
                        type="password"
                        value={this.state.password}
                        onChange={(event) => this.handleChange(event)}/><br />
                </div>
            </div>
        );
    }
}
//
// Login.contextTypes = {
//     router: React.PropTypes.func.isRequired
// }

export default Login;