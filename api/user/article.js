"use strict";

var express = require('express');
var postsModel = require('../../models/management/article/posts');
var Tools = require('../../tools/tools');
let request = require('superagent');

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

            if (err) {
                res.send(err);
            } else {
                let query = {_id: req.query.id},
                    update = '',
                    options = {multi: true};

                if (data[0].view_count) {
                    // 原子操作，+1
                    update = {$inc: {view_count: 1}};
                } else {
                    // 没有则插入该字段
                    update = {$set: {view_count: 1}}
                }

                request
                .get('http://changyan.sohu.com/api/2/topic/count?client_id=cyt1S1w3M&topic_id=&topic_source_id=99&topic_url=')
                .type('form')
                .end(function (err, suc) {
                    if (err) {
                        console.log(err);
                    } else {
                        if (update.$set) {
                            update.$set.comment_count = suc.body.result.comments;
                        } else {
                            update.$set = {
                                comment_count: suc.body.result.comments
                            }
                        }
                        console.log('update', update);
                        console.log('suc', suc.body);

                        postsModel.update(query, update, options, function (err, data) {
                        });
                    }
                });


                res.send({
                    code: 200,
                    description: 'success',
                    data: Tools.para2camel(data)[0]
                });
            }

        });
    }
}, {

    // 获取文章详情
    type: 'get',
    url: baseRoute + '/queryList',
    success: function (req, res, next) {
        let pageIndex = parseInt(req.query.pageIndex),
            pageSize = parseInt(req.query.pageSize),
            position = parseInt(pageIndex - 1),
            search = {},
            type = req.query.type || '',
            category = [],
            _postModel,
            __postModel;

        if (type) {
            switch (type) {
                case '1':
                    category.push('js', 'javascript', 'angularJs', 'web前端', 'react');
                    break;
                case '2':
                    category.push('ubuntu', 'linux');
                    break;
                default:
                    break;
            }
            search.post_category_name = type;
        }

        if (category.length > 0) {
            _postModel = postsModel.where('post_category_name').in(category);
            // copy 一份统计数据用
            __postModel = postsModel.where('post_category_name').in(category);
        } else {
            _postModel = postsModel.find({});
            // copy 一份统计数据用
            __postModel = postsModel.find({});
        }

        _postModel
        .skip(position)
        .limit(pageSize)
        .sort({'post_date': 'desc'})
        .exec(function (err, data) {
            if (err) {
                res.send(err);
            } else {
                __postModel.count(function (errcount, count) {
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
}];


module.exports = postApis;
