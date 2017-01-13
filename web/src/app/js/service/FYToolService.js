/**
 * Created by 3fuyu on 16/03/25.
 */
"use strict";

import React from "react";
import {render} from "react-dom";
import Snackbar from "../../../../node_modules/material-ui/Snackbar";
import MuiThemeProvider from "../../../../node_modules/material-ui/styles/MuiThemeProvider";
import Dialog from "../../../../node_modules/material-ui/Dialog";
import FlatButton from "../../../../node_modules/material-ui/FlatButton";
import Loading from "../components/lib/Loading";
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
    title: '',
    open: true
};

function confirm(title, content, submit) {
    confirmConfig.open = true;

    if (title) {
        confirmConfig.title = title || '';
    }

    if (content) {
        confirmConfig.content = content || '';
    }

    if (submit) {
        confirmConfig.submit = submit || function () {

        };
    }

    confirmConfig.render();
}

function handleSubmit() {
    confirmConfig.open = false;
    confirmConfig.render();
    confirmConfig.submit && confirmConfig.submit();
}

function handleCancel() {
    confirmConfig.open = false;
    confirmConfig.render();
}

confirmConfig.render = function () {
    var className = confirmConfig.title || confirmConfig.content ? '' : 'zl-hide';
    var actions = [
        <FlatButton
            label="Cancel"
            primary={false}
            onTouchTap={handleCancel}
        />,
        <FlatButton
            label="Submit"
            primary={true}
            onTouchTap={handleSubmit}
        />
    ];

    render(
        <div id="dialog1" className={className}>
            <div className="zl-mask-fixed"></div>
            <div className="zl-dialog">
                <MuiThemeProvider>
                    <Dialog
                        title={confirmConfig.title}
                        contentStyle={{width: '30%'}}
                        actions={actions}
                        modal={false}
                        open={confirmConfig.open}
                    >
                        {confirmConfig.content}
                    </Dialog>
                </MuiThemeProvider>
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

/***** new loading *****/
let loadingContainer = '';
let loadingTime = 0;
let originContainer = '';

let startLoading = function (container) {
    $(container).after('<div class="loading"></div>');

    loadingContainer = $(container).next('.loading')[0];
    loadingTime = +new Date();
    originContainer = $(container);

    originContainer.hide();

    render(<MuiThemeProvider>
            <Loading/>
        </MuiThemeProvider>,
        loadingContainer);
}

let endLoading = function () {
    loadingTime = +new Date() - loadingTime;

    if (loadingTime < 1000) {
        setTimeout(function () {
            originContainer.show();
            loadingContainer.remove();
        }, 1000 - loadingTime);
    } else {
        originContainer.show();
        loadingContainer.remove();
    }
}


/**
 * HSL颜色值转换为RGB.
 * 换算公式改编自 http://en.wikipedia.org/wiki/HSL_color_space.
 * h, s, 和 l 设定在 [0, 1] 之间
 * 返回的 r, g, 和 b 在 [0, 255]之间
 *
 * @param   Number  h       色相
 * @param   Number  s       饱和度
 * @param   Number  l       亮度
 * @return  Array           RGB色值数值
 */
let hexToRgb = function (_sColor, opacity) {
    var sColor = _sColor.toLowerCase();
    var opacity = opacity || 1;

    if (sColor.indexOf('#') <= -1) {
        sColor += '#' + sColor
    }
    var hexReg = /^\#([0-9a-f]{3}|[0-9a-f]{6})$/gi;

    if (sColor && (hexReg.test(sColor))) {
        if (sColor.length === 4) {
            var sColorNew = '#';
            for (var i = 1; i < 4; i += 1) {
                sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
            }
            sColor = sColorNew
        }
        //处理六位的颜色值
        var sColorChange = [];
        for (var i = 1; i < 7; i += 2) {
            sColorChange.push(parseInt('0x' + sColor.slice(i, i + 2)))
        }
        return 'rgba(' + sColorChange.join(', ') + ',' + opacity + ')';
    } else {
        return sColor;
    }
};

FY.moment = moment;
FY.tips = tips;
FY.confirm = confirm;
FY.loading = loading;
FY.string = string;
FY.hexToRgb = hexToRgb;
FY.startLoading = startLoading;
FY.endLoading = endLoading;

module.exports = FY;