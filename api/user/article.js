"use strict";

var express = require('express');
var postsModel = require('../../models/management/article/posts');
var Tools = require('../../tools/tools');

var baseRoute = '/article';

var postApis = [{

    // 获取文章详情
    type: 'get',
    url: baseRoute + '/getDetail',
    success: function (req, res, next) {
        postsModel
        .find({'_id': req.query.id})
        .sort({'post_date': 'desc'})
        .exec(function (err, data) {
            res.send({
                code: 200,
                description: 'success',
                data: Tools.para2camel(data)[0]
            });
        });
    }
}, {

    // 获取文章详情
    type: 'get',
    url: baseRoute + '/queryList',
    success: function (req, res, next) {
        postsModel
        .find({})
        .sort({'post_date': 'desc'})
        .exec(function (err, data) {
            res.send({
                code: 200,
                description: 'success',
                data: Tools.para2camel(data)
            });
        });
    }
}, ];


module.exports = postApis;
