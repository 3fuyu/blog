/**
 * Created by 3fuyu on 2016/11/20.
 */

"use strict";

let express = require('express');
let termsModel = require('../../models/management/article/terms');
let keyMapsModel = require('../../models/key_maps');
let Tools = require('../../tools/tools');

let baseRoute = '/admin/terms';

let termsApis = [{
    // 新增分类
    type: 'post',
    url: baseRoute + '/termsNew',
    success: function (req, res, next) {
        let max_id = 1;

        keyMapsModel.find({terms_map_key: true}, function (err, docs) {
            if (err) {
                console.error(err);
            } else {
                if (docs.length === 0) {
                    let termsMapKey = JSON.stringify({max_id: 1});

                    let keyMapsEntity = new keyMapsModel({
                        terms_map_key: true,
                        terms_map_value: termsMapKey
                    });

                    keyMapsEntity.save(function (err, docs) {
                        if (err) console.error(err);
                    });
                } else {
                    max_id = parseInt(JSON.parse(docs[0].terms_map_value).max_id) + 1;
                }

                // 存数据库
                let termsEntity = new termsModel({
                    _id: max_id,
                    name: req.body.name,
                    slug: req.body.slug || req.body.name,
                    term_group: '未分组'
                });

                termsEntity.save(function (err, docs) {
                    if (err) {
                        console.error('Somthing wrong: ' + err);
                    } else {
                        let conditions = {terms_map_key: true};
                        let update = {$set: {terms_map_value: JSON.stringify({max_id: max_id})}};
                        let options = {upsert: true};

                        keyMapsModel.update(conditions, update, options, function (err, suc) {
                            if (err) console.error(err);

                            if (suc) console.log(suc);

                            res.send({
                                code: 200,
                                description: 'success'
                            });
                        });
                    }
                });
            }
        });
    }
}, {
    // 查询分类列表
    type: 'get',
    url: baseRoute + '/queryList',
    success: function (req, res, next) {
        termsModel
        .find({})
        .sort({'_id': 'desc'})
        .exec(function (err, data) {
            res.send({
                code: 200,
                description: 'success',
                data: Tools.para2camel(data)
            });
        });
    }
}, {
    // 删除分类
    type: 'post',
    url: baseRoute + '/del',
    success: function (req, res, next) {
        var conditions = {'_id': req.body.id};
        termsModel.remove(conditions, function (error) {
            if (error) {
                console.error(error);
            } else {
                console.log('delete ok!');
                res.send({
                    code: 200,
                    description: 'success'
                });
            }
        });
    }
}];

module.exports = termsApis;