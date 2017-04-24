/**
 * Created by 3fuyu on 2017/2/14.
 */

"use strict";

let express = require('express');
let formidable = require('formidable');
let util = require('util');
let keyMapsModel = require('../../models/key_maps');
let imgsModel = require('../../models/management/attachment/imgs');
let fs = require('fs');
let Tools = require('../../tools/tools');
let _ = require('lodash');

let baseRoute = '/admin/upload'

let uploadApis = [{
    // 新增附件
    type: 'post',
    url: baseRoute + '/image',
    success: function (req, res) {
        let form = new formidable.IncomingForm();

        form.keepExtensions = true;
        form.multiples = true;
        form.parse(req, function (err, fields, files) {

            keyMapsModel.find({imgs_map_key: true}, function (err, docs) {
                if (err) {
                    console.error(err);
                } else {
                    if (docs.length === 0) {
                        let keyMapsEntity = new keyMapsModel({
                            imgs_map_key: true,
                            imgs_max_id: 1
                        });

                        keyMapsEntity.save(function (err, docs) {
                            if (err) console.error(err);

                            if (_.isArray(files.img)) {
                                files.img.forEach(function (value, key) {
                                    setImg(res, value);
                                });
                            } else {
                                setImg(res, files.img);
                            }

                            res.send({
                                code: 200,
                                description: 'success'
                            });
                        });
                    } else {
                        if (_.isArray(files.img)) {
                            files.img.forEach(function (value, key) {
                                setImg(res, value);
                            });
                        } else {
                            setImg(res, files.img);
                        }

                        res.send({
                            code: 200,
                            description: 'success'
                        });
                    }
                }
            });
        });
    }
}, {
    // 查询附件列表
    type: 'get',
    url: baseRoute + '/queryList',
    success: function (req, res, next) {
        imgsModel
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
        imgsModel.remove(conditions, function (error) {
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

function setImg(res, img) {
    keyMapsModel.findOneAndUpdate({imgs_map_key: true}, {$inc: {'imgs_max_id': 1}}, function (err, suc) {
        let name = +new Date() + '.' + img.type.split('/')[1],
            url = '/static/imgs/' + name;

        if (err) return console.log(err);

        // 存数据库
        let imgsEntity = new imgsModel({
            _id: suc.imgs_max_id,
            name: img.name,
            url: url
        });

        imgsEntity.save(function (err, docs) {
            fs.renameSync(img.path, './static/imgs/' + name);
        });
    });
}


module.exports = uploadApis;