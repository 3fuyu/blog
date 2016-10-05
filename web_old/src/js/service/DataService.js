/**
 * Created by 3fuyu on 16/03/10.
 */
"use strict";

var request = require('superagent');
var FYT = require('./FYToolService.js');
var StorageService = require('./StorageService.js');
var _ = require('lodash');
require('babel-polyfill');

var dataService = {};

// var baseUrl = '120.25.92.21:8081/api/';
var baseUrl = 'http://localhost:8081/api/';

function prepend(prefix, name, separator) {
    if (prefix) {
        if (separator) {
            return prefix + "." + name;
        }
        return prefix + name;
    }
    return name;
}

function flatten(prefix, obj, map) {
    if (obj) {
        if (_.isArray(obj)) {
            for (var i = 0; i < obj.length; i++) {
                var item = obj[i];
                flatten(prepend(prefix, "[" + i + "]", false), item, map);
            }
        } else if (_.isPlainObject(obj)) {
            if (obj['__type__'] === 'map') {
                _.each(obj, function (propertyObject, propertyName) {
                    if (propertyName !== '__type__') {
                        flatten(prepend(prefix, "[" + propertyName + "]", false), propertyObject, map);
                    }
                });
            } else {
                _.each(obj, function (propertyObject, propertyName) {
                    flatten(prepend(prefix, propertyName, true), propertyObject, map);
                });
            }
        }
        else {
            map[prefix] = obj;
        }
    }
}

function toFlattenMap(obj) {
    var map = {};

    flatten(null, obj, map);
    return map;
}

function fixBigNum(data, jqXHR) {
    if (hasBigNumForJSONStr(jqXHR.responseText)) {
        data = fixBigNum2JSON(jqXHR.responseText);
    }
    return data;
}

function fixBigNum2JSON(str) {
    if (!str) {
        return '';
    }
    return str2json(str);
}

function hasBigNumForJSONStr(str) {
    if (str) {
        return !!str.match(/([^\\])":(\d{15,})/g);
    }
    return false;
}

function str2json(str) {
    if (!str) {
        return {};
    }
    // bignum = Math.pow(2, 53)    length:16
    str = str.replace(/([^\\])":(\d{15,})/g, '$1":"$2"');
    return $.parseJSON(str);
}

function post(url, params) {

    var promise = new Promise(function (resolve, reject) {
        request
            .post(baseUrl + url)
            .type('form')
            .send(toFlattenMap(params))
            .end(function (err, res) {
                if (err || !res.ok) {
                    reject('服务器错误');
                } else {
                    var data = res.body;
                    if (data.errorCode === 401) {
                        console.log('未登录');
                        return false;
                    } else if (data.errorCode === 200) {
                        resolve(data);
                    } else {
                        // 走失败函数
                        reject(data);
                    }
                }
            });
    });

    return processPromise(promise, url);
}
function get(url, params) {

    var promise = new Promise(function (resolve, reject) {
        request
            .get(baseUrl + url)
            .type('form')
            .send(toFlattenMap(params))
            .end(function (err, res) {
                if (err || !res.ok) {
                    reject('服务器错误');
                } else {
                    var data = res.body;
                    if (data.errorCode === 401) {
                        console.log('未登录');
                        return false;
                    } else if (data.errorCode === 200) {
                        resolve(data);
                    } else {
                        // 走失败函数
                        reject(data);
                    }
                }
            });
    });

    return processPromise(promise, url);
}

function processPromise(promise, url) {
    var tempData = '';
    return promise.then(function (data) {
        if (data.errorCode === 200) {
            return data.response;
        }
    }, function (data) {
        throw (data);
        return data;
    });
}

dataService.postNew = function (params) {
    return post('postNew', params);
};

dataService.queryArticalList = function (params) {
    return get('artical/queryList', params);
};

dataService.login = function (params) {
    return post('user/login', params);
};

module.exports = dataService;
