/**
 * Created by 3fuyu on 16/03/25.
 */
"use strict";

import React from 'react';
import Snackbar from '../../../../node_modules/material-ui/Snackbar';
import MuiThemeProvider from '../../../../node_modules/material-ui/styles/MuiThemeProvider';
import {render} from 'react-dom';
var _ = require('lodash');

var FY = {};


/***** time *****/
var moment = {
    timestamp2d: function (data) {
        var date = new Date(data);
        var result = date.getFullYear() + '-' + (date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-' + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());

        return result;
    },
    timestamp2dh: function (data) {
        var date = new Date(data);
        var result = date.getFullYear() + '年' + (date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '月' + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + '日';

        return result;
    },
    timestamp2M: function (data) {
        var date = new Date(data);
        var result = date.getFullYear() + '-' + (date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);

        return result;
    },
    timestamp2Mh: function (data) {
        var date = new Date(data);
        var result = date.getFullYear() + '年' + (date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '月';

        return result;
    },
    timestamp2m_T: function (data) {
        var date = new Date(data);
        var result = date.getFullYear() + '-' + (date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-' + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + 'T' + (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':' + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());

        return result;
    },
    timestamp2s_T: function (data) {
        var date = new Date(data);
        var result = date.getFullYear() + '-' + (date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-' + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + 'T' + (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':' + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':' + (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());

        return result;
    },
    timestamp2m: function (data) {
        var date = new Date(data);
        var result = date.getFullYear() + '-' + (date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-' + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ' + (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':' + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());

        return result;
    },
    timestamp2s: function (data) {
        var date = new Date(data);
        var result = date.getFullYear() + '-' + (date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-' + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ' + (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':' + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':' + (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());

        return result;
    },
    UTC2CSTtimestamp: function (data) {
        return new Date(data).getTime() - 28800000;
    },

};


/***** tips *****/

var tipsConfig = {
    content: '',
    timeout: 1000
};

function tips(content, timeout = 2000) {
    if (content) {
        tipsConfig.content = content;
    }

    tipsConfig.timeout = timeout;

    // setTimeout(function () {
    //     tipsConfig.content = '';
    //     tipsConfig.render();
    // }, tipsConfig.timeout);

    tipsConfig.render();
}

tipsConfig.render = function () {
    var open = tipsConfig.content === '' ? 'false' : 'true';

    render(
        <MuiThemeProvider>
            <Snackbar
                open={open}
                message={tipsConfig.content}
                autoHideDuration={tipsConfig.timeout}
            />
        </MuiThemeProvider>,

        document.getElementById('alert')
    );
}


/***** confirm *****/
var confirmConfig = {
    content: '',
    title: ''
};

function confirm(title, content, submit) {
    if (title) {
        confirmConfig.title = title;
    }

    if (content) {
        confirmConfig.content = content;
    }

    if (submit) {
        confirmConfig.submit = submit;
    }

    confirmConfig.render();
}

confirmConfig.confirm = function () {
    confirmConfig.content = '';
    confirmConfig.title = '';

    confirmConfig.render();

    confirmConfig.submit && confirmConfig.submit();
};

confirmConfig.cancel = function () {
    confirmConfig.content = '';
    confirmConfig.title = '';

    confirmConfig.render();
};

confirmConfig.render = function () {
    var className = confirmConfig.title || confirmConfig.content ? '' : 'zl-hide';

    render(
        <div id="dialog1" className={className}>
            <div className="zl-mask-fixed"></div>
            <div className="zl-dialog">
                <div className="zl-dialog-hd" style={{display: confirmConfig.title ? 'block' : 'none'}}><strong
                    className="zl-dialog-title">{confirmConfig.title}</strong>
                </div>
                <div className="zl-dialog-bd"
                     style={{display: confirmConfig.content ? 'block' : 'none', marginTop: confirmConfig.title ? '0' : '15px'}}>{confirmConfig.content}</div>
                <div className="zl-dialog-ft zl-box zl-box-horizontal zl-border zl-border-top">
                    <a href="javascript:void(0)" className="zl-btn-dialog" onClick={confirmConfig.cancel}>取消</a>
                    <a href="javascript:void(0)" className="zl-btn-dialog" onClick={confirmConfig.confirm}>确定</a>
                </div>
            </div>
        </div>,
        document.getElementById('dialog')
    );
};


/***** loading *****/

function loading(status, timeout) {
    var style;

    if (timeout) {
        setTimeout(function () {
            style = 'end'
        }, timeout);
    }

    style = status === 'start' ? 'block' : 'none';

    render(
        <div id="loadingToast" style={{display: style}}>
            <div className="zl-toast">
                <div className="zl-loading">
                    <div className="zl-loading-leaf zl-loading-leaf-0"></div>
                    <div className="zl-loading-leaf zl-loading-leaf-1"></div>
                    <div className="zl-loading-leaf zl-loading-leaf-2"></div>
                    <div className="zl-loading-leaf zl-loading-leaf-3"></div>
                    <div className="zl-loading-leaf zl-loading-leaf-4"></div>
                    <div className="zl-loading-leaf zl-loading-leaf-5"></div>
                    <div className="zl-loading-leaf zl-loading-leaf-6"></div>
                    <div className="zl-loading-leaf zl-loading-leaf-7"></div>
                    <div className="zl-loading-leaf zl-loading-leaf-8"></div>
                    <div className="zl-loading-leaf zl-loading-leaf-9"></div>
                    <div className="zl-loading-leaf zl-loading-leaf-10"></div>
                    <div className="zl-loading-leaf zl-loading-leaf-11"></div>
                </div>
                <p className="zl-loading-content">数据加载中</p>
            </div>
        </div>,
        document.getElementById('dialog')
    );
}


/***** string *****/

var string = {};

string.compareObj = function (o1, o2) {
    if (o1 === o2) return true;
    //类型
    if (typeof o1 != typeof o2) return false;
    if (o1 instanceof Date) {
        //时间
        return +o1 === +o2;
    } else if (typeof o1 == 'object') {
        //keys 数量是否一样
        if (Object.keys(o1).length !== Object.keys(o2).length) return false;
        for (var o in o1) {
            if (!compareObj(o1[o], o2[o])) return false;
        }
        return true;
    }
};

string.round = function (digit, length) { //四舍五入
    length = length ? parseInt(length) : 0;
    if (length <= 0) {
        return Math.round(digit);
    }
    digit = Math.round(digit * Math.pow(10, length)) / Math.pow(10, length);
    return digit;
};

string.isPhoneNum = function (str) {
    if (!str) {
        return false;
    }
    return str.match(/^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$/) !== null || str.match(/^1\d{10}$/) !== null;
}

FY.moment = moment;
FY.tips = tips;
FY.confirm = confirm;
FY.loading = loading;
FY.string = string;

module.exports = FY;