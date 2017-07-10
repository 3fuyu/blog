/**
 * Created by 3fuyu on 16/03/10.
 */
"use strict";

let request = require('superagent');
let FYT = require('./FYToolService.js');
let StorageService = require('./StorageService.js');
let _ = require('lodash');
require('babel-polyfill');

let dataService = {};

let host = window.location.host;
let baseUrl = 'http://' + host + '/api/';
// let baseUrl = 'http://localhost:8080/api/';


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
            for (let i = 0; i < obj.length; i++) {
                let item = obj[i];
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
    let map = {};

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

    let promise = new Promise(function (resolve, reject) {
        request
            .post(baseUrl + url)
            .type('form')
            // .set('Content-Type', 'application/json')
            .send(toFlattenMap(params))
            .end(function (err, res) {
                if (err || !res.ok) {
                    reject('服务器错误');
                } else {
                    let data = res.body;
                    if (data.code === 401) {
                        FYT.tips('用户未登录');

                        setTimeout(function () {
                            window.location.href = '#/login';
                        }, 2000);
                        return false;
                    } else if (data.code === 200) {
                        resolve(data);
                    } else {
                        // 走失败函数
                        FYT.tips(data.description);
                        reject(data);
                    }
                }
            });
    });

    return processPromise(promise, url);
}
function get(url, params) {

    let promise = new Promise(function (resolve, reject) {
        let para = '';
        if (params) {
            para = '?';
            _.each(params, function (value, key) {
                para += key + '=' + value + '&';
            });
        }
        para = para.slice(0, para.length - 1);

        request
            .get(baseUrl + url + para)
            .type('form')
            .send(toFlattenMap(params))
            .end(function (err, res) {
                if (err || !res.ok) {
                    reject('服务器错误');
                } else {
                    let data = res.body;
                    if (data.code === 401) {
                        FYT.tips('用户未登录');

                        setTimeout(function () {
                            window.location.href = '#/login';
                        }, 2000);
                        return false;
                    } else if (data.code === 200) {
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
    let tempData = '';
    return promise.then(function (data) {
        if (data.code === 200) {
            return data.data;
        }
    }, function (data) {
        throw (data);
        return data;
    });
}

// 后台管理
dataService.adminPostNew = function (params) {
    return post('admin/article/postNew', params);
};

dataService.adminQueryArticleList = function (params) {
    return get('admin/article/queryList', params);
};

dataService.adminDelArticle = function (params) {
    return post('admin/article/del', params);
};

dataService.adminGetArticle = function (params) {
    return get('admin/article/get', params);
};

dataService.adminPostUpdate = function (params) {
    return post('admin/article/update', params);
};

dataService.getUserInfo = function (params) {
    return get('admin/user/getUserInfo', params);
};

dataService.login = function (params) {
    return post('admin/user/login', params);
};

dataService.logout = function (params) {
    return post('admin/user/logout', params);
};

dataService.adminTermsNew = function (params) {
    return post('admin/terms/termsNew', params);
};

dataService.adminQueryTermsList = function (params) {
    return get('admin/terms/queryList', params);
};

dataService.adminDelTerm = function (params) {
    return post('admin/terms/del', params);
};

dataService.adminUploadImg = function (params) {
    return post('admin/upload/image', params);
};

dataService.adminQueryImgList = function (params) {
    return get('admin/upload/queryList', params);
};

dataService.adminDelImg = function (params) {
    return post('admin/upload/del', params);
};


// 前端用户
dataService.queryArticleList = function (params) {
    return get('article/queryList', params);
};
dataService.getArticleDetail = function (params) {
    return get('article/getDetail', params);
};

module.exports = dataService;
