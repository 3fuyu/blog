"use strict";

let express = require('express');
let postsModel = require('../../models/management/article/posts');
let keyMapsModel = require('../../models/key_maps');
let Tools = require('../../tools/tools');
let MD = require('marked');
let hljs = require('../../node_modules/highlight/highlight');

let baseRoute = '/admin/article';

let postApis = [{

    // 发布文章
    type: 'post',
    url: baseRoute + '/postNew',
    success: function (req, res, next) {
        let max_id = 1;
        MD.setOptions({
            gfm: true,
            tables: true,
            breaks: false,
            pedantic: false,
            sanitize: true, // if false -> allow plain old HTML ;)
            smartLists: true,
            smartypants: false,
            highlight: function (code, lang) {
                if (lang && hljs.getLanguage(lang)) {
                    return hljs.highlight(lang, code, true).value;
                } else {
                console.log(hljs.highlightAuto(code).value);
                    return hljs.highlightAuto(code).value;
                }
            }
        });

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
                    post_md_content: MD(req.body.content),
                    post_title: req.body.title,
                    post_date: +new Date(),
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
                    code: 200,
                    description: 'success'
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
}];


module.exports = postApis;
