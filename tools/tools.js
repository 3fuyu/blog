/**
 * Created by 3fuyu on 16/8/12.
 */
"use strict";

var _ = require('lodash');
var Tools = {};

function isArray(data) {
    if (data && (data instanceof Array) && (data.constructor === Array)) {
        return true;
    }
}

function isObject(data) {
    if (data && (data instanceof Object) && (data.constructor === Object)) {
        return true;
    }
}

function formatPara2Camel(data) {
    if (isArray(data) || isObject(data)) {
        _.each(data, function (value, key) {
            if (isArray(value) || isObject(value)) {
                formatPara2Camel(value);
            } else {
                if (key.indexOf('_') > -1) {
                    if (key.split('_')[0] == '') {
                        var _key = key.split('_')[1];
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
        return data;
    } else {
        return data;
    }
}

Tools.para2camel = function (para) {
	return formatPara2Camel(para);
};

module.exports = Tools;