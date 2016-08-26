/**
 * Created by 3fuyu on 16/8/12.
 */
"use strict";

var _ = require('lodash');
var Tools = {};
var formatPara2CamelArray = [];

function isArray(data) {
    if (data && (data instanceof Array) && (data.constructor === Array)) {
        return true;
    }
}

function isObject(data) {
    if (data && (data instanceof Object) && (data.constructor === Object)) {
        return true;
    } else {
        return false;
    }
}

function checkUnderline(key) {
    for (var i = 0; i < key.split('_').length; i++) {
        if (key.split('_')[i] !== '') {
            return key.split('_')[i];
        }
    }
}

function formatPara2Camel(data) {
    // 过滤mogodb返回对象多余类型
    data = JSON.stringify(data);
    data = JSON.parse(data);
    if (isArray(data) || isObject(data)) {
        _.each(data, function (value, key) {
            if (isArray(value) || isObject(value)) {
                formatPara2Camel(value);
            } else {
                if (key.indexOf('_') > -1) {
                    if (key.split('_')[0] === '') {
                        var _key = checkUnderline(key);
                        data[_key] = data[key];
                        delete data[key];
                    } else {
                        var _key = key.replace(/_./g, function (a) {return a.split('_')[1].toUpperCase();});
                        data[_key] = data[key];
                        delete data[key];
                    }
                }
            }
        });
        // 收集数据
        formatPara2CamelArray.push(data);
    } else {
        return data;
    }
}

Tools.para2camel = function (para) {
    formatPara2Camel(para);
    formatPara2CamelArray.pop();
    return formatPara2CamelArray;
};

module.exports = Tools;