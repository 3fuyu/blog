/**
 * Created by 3fuyu on 16/8/12.
 */
"use strict";

var express = require('express');
var router = express.Router();
var _ = require('lodash');

var adminArticle = require('../api/management/article'),
    user = require('../api/management/user'),
    article = require('../api/user/article'),
    terms = require('../api/management/terms');

// 合并api
var apis = _.concat(adminArticle, article, user, terms);

apis.forEach(function (value, key) {
    if (value.type === 'get') {
        router.get(value.url, authorize, function (req, res, next) {
            req.session.lastPage = value.url;

            value.success(req, res);
        });
    } else if (value.type === 'post') {
        router.post(value.url, authorize, function (req, res, next) {
            req.session.lastPage = value.url;

            value.success(req, res);
        });
    }
});

function authorize(req, res, next) {

    // debug 去掉登录态，方便开发
    next();
    return;

    if (req.route.path !== '/admin/user/login' && req.route.path.indexOf('/admin/') > -1) {
        if (!req.session.user_id) {
            res.send({
                code: 401,
                description: '用户未登录'
            });
        } else {
            next();
        }
    } else {
        next();
    }
}

module.exports = router;