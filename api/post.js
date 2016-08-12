"use strict";

var express = require('express');
var postsModel = require('../models/posts');

var baseRoute = '/artical';

var postApis = [{

    // 发布文章
    type: 'post',
    url: baseRoute + '/postNew',
    success: function (req, res, next) {
        res.send({
            errorCode: 200,
            errorDescription: 'success'
        });
    }
}, {

    // 查询文章
    type: 'get',
    url: baseRoute + '/queryList',
    success: function (req, res, next) {
        postsModel
            .find({post_author: '对应作者ID'})
            .exec(function (err, data) {
                var _data = data;

                res.send({
                    errorCode: 200,
                    errorDescription: 'success',
                    data: _data
                });
            });
    }
}];


module.exports = postApis;
