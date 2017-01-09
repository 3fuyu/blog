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
        router.get(value.url, function (req, res) {
            if (req.session.lastPage) {
                console.log('Last page was: ' + req.session.lastPage + '.');
            }
            req.session.lastPage = value.url;

            value.success(req, res);
        });
    } else if (value.type === 'post') {
        router.post(value.url, function (req, res) {
            if (req.session.lastPage) {
                console.log('Last page was: ' + req.session.lastPage + '.');
            }
            req.session.lastPage = value.url;

            value.success(req, res);
        });
    }
});

module.exports = router;