/**
 * Created by 3fuyu on 16/03/10.
 */
"use strict";

var request = require('superagent');
var ZLT = require('./FuyuToolService.js');
var StorageService = require('./StorageService.js');
var _ = require('lodash');
require('babel-polyfill');

var dataService = {};

var baseUrl = '120.25.92.21:8081/api/';

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
                    var data = JSON.stringify(res.body);
                    if (data.errorCode === 401) {
                        console.log('未登录');
                        return false;
                    } else {
                        //data = fixBigNum(data, jqXHR);
                        resolve(data);
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
                    var data = JSON.stringify(res.body);
                    if (data.errorCode === 401) {
                        console.log('未登录');
                        return false;
                    } else {
                        //data = fixBigNum(data, jqXHR);
                        resolve(data);
                    }
                }
            });
    });

    return processPromise(promise, url);
}

function processPromise(promise, url) {

    return promise.then(function (_data) {
        var data = eval('(' + _data + ')');
        if (data.errorCode === 200) {
            //return def.resolve(data.body);
            return data.response;
        } else if (data.errorCode === 401) {
            throw (data.errorDescription || '未知错误');
        } else {
            ZLT.tips(data.errorDescription || '未知错误');
            throw (data.errorDescription || '未知错误');
        }
    }, function (reason) {
        if (reason.status === 401) {
            window.location.href = "/zl-ec?sourceUrl=" + encodeURIComponent(window.location.href);

            throw "未登录";
        }

        if (reason.data && reason.data.result === false && reason.data.body) {
        
        } else {
        
        }
    });
}

dataService.postNew = function (params) {
    return post('postNew', params);
};

dataService.queryArticalList = function (params) {
    return get('artical/queryList', params);
};

module.exports = dataService;
