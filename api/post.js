"use strict";

var express = require('express');
var postsModel = require('../models/posts');
var keyMapsModel = require('../models/key_maps');
var Tools = require('../tools/tools');
var mongoose = require('mongoose');

var baseRoute = '/artical';

var postApis = [{

    // 发布文章
    type: 'post',
    url: baseRoute + '/postNew',
    success: function (req, res, next) {
        let max_id = 1;

        keyMapsModel.find({post_map_key: true}, function (err, docs) {
            if (err) {
                console.error(err);
            } else {
                if (docs.length === 0) {
                    let postMapObj = JSON.stringify({max_id: 1});

                    let keyMapsEntity = new keyMapsModel({
                        post_map_key: true,
                        post_map_value: postMapObj
                    });

                    keyMapsEntity.save(function (err, docs) {
                        if (err) console.error(err);
                    });
                } else {
                    max_id = parseInt(JSON.parse(docs[0].post_map_value).max_id) + 1;
                }

                // 存数据库
                let postEntity = new postsModel({
                    post_author: '3fuyu',
                    post_content: req.body.content,
                    post_title: req.body.title,
                    _id: max_id
                });

                postEntity.save(function (err, tree) {
                    if (err) {
                        console.error('Somthing wrong: ' + err);
                    } else {

                        var conditions = {post_map_key: true};
                        var update = {$set: {post_map_value: JSON.stringify({max_id: max_id})}};
                        var options = {upsert: true};
                        keyMapsModel.update(conditions, update, options, function (err, suc) {
                            if (err) console.error(err);

                            if (suc) console.log(suc);
                        });
                    }
                });

                res.send({
                    errorCode: 200,
                    errorDescription: 'success'
                });
            }
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
            res.send({
                errorCode: 200,
                errorDescription: 'success',
                data: Tools.para2camel(data)
            });
        });
    }
}];


module.exports = postApis;
