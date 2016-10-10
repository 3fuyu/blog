"use strict";

var express = require('express');
var postsModel = require('../models/posts');
var Tools = require('../tools/tools');
var mongoose = require('mongoose');

var baseRoute = '/artical';

var postApis = [{

    // 发布文章
    type: 'post',
    url: baseRoute + '/postNew',
    success: function (req, res, next) {

        // let getNewID = function(callback){
        postsModel.find({}, ['first', 'last'], function (err, docs) {
            if (err) {
                console.log(err);
            }
            console.log(docs)
        });      //     docs 此时只包含文档的部分键值

        //     return ret.seq;
        // };
        // console.log(getNewID());

        // let postEntity = new postsModel({
        //     post_author: '3fuyu',
        //     post_content: req.body.content,
        //     post_title: req.body.title,
        //     _id: '15'
        // });
        //
        // postEntity.save(function (err, tree) {
        //     if (err) {
        //         console.log('Somthing wrong: ' + err);
        //     } else {
        //         console.log('Add a new node', tree);
        //     }
        // });

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
            res.send({
                errorCode: 200,
                errorDescription: 'success',
                data: Tools.para2camel(data)
            });
        });
    }
}];


module.exports = postApis;
