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
        let pageIndex = parseInt(req.query.pageIndex),
            pageSize = parseInt(req.query.pageSize),
            position = parseInt(pageIndex - 1);

        console.log(pageIndex, pageSize, position);

        postsModel
        .find({})
        .skip(position)
        .limit(pageSize)
        .sort({'post_date': 'desc'})
        .exec(function (err, data) {
            if (err) {
                res.send(err);
            } else {
                postsModel.count(function (errcount, count) {
                    if (errcount) {
                        res.send(errcount);
                    } else {
                        let total = count,
                            nextPage = pageIndex + pageSize,
                            isFinish = total <= nextPage ? true : false;

                        res.send({
                            code: 200,
                            description: 'success',
                            data: {
                                data: Tools.para2camel(data),
                                pageObj: {
                                    nextPage: nextPage,
                                    total: total,
                                    isFinish: isFinish
                                }
                            }
                        });
                    }
                });

            }

        });
    }
}, ];


module.exports = postApis;
