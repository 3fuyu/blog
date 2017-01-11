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
            // if (req.session.lastPage) {
            console.log('Last page was: ' + req.session.lastPage + '.');
            // }
            req.session.lastPage = value.url;

            value.success(req, res);
        });
    } else if (value.type === 'post') {
        router.post(value.url, authorize, function (req, res, next) {
            // if (req.session.lastPage) {
            console.log('Last page was: ' + req.session.lastPage + '.');
            // }
            console.log('after redirect');
            req.session.lastPage = value.url;

            value.success(req, res);
        });
    }
});

function authorize(req, res, next) {
    console.log(req.cookies);
    if (req.cookies.isVisit) {
        console.log(req.cookies);
        res.send({
            code: 500,
            description: '再次欢迎访问'
        });
    } else {
        // res.setHeader("Set-Cookie", ['a=000', 't=1111', 'w=2222']);
        res.cookie('isVisit', 1, {maxAge: 600 * 1000, path: '/'});
        res.send({
            code: 500,
            description: '欢迎首次访'
        });
    }
    // if (req.route.path !== '/admin/user/login') {
    //     console.log(req.session);
    //     if (!req.session.user_id) {
    //         res.send({
    //             code: 401,
    //             description: '用户未登录'
    //         });
    //     } else {
    //         next();
    //     }
    // } else {
    //     next();
    // }
}

module.exports = router;