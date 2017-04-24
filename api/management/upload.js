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

let baseRoute = '/admin/upload'

let uploadApis = [{
    // 新增附件
    type: 'post',
    url: baseRoute + '/image',
    success: function (req, res) {
        let form = new formidable.IncomingForm(),
            max_id = 1;

        form.parse(req, function (err, fields, files) {
            let url = '/static/imgs/' + (+new Date()) + '_' + files.img.name;

            keyMapsModel.find({imgs_map_key: true}, function (err, docs) {
                if (err) {
                    console.error(err);
                } else {
                    if (docs.length === 0) {
                        let imgsMapKey = JSON.stringify({max_id: 1});

                        let keyMapsEntity = new keyMapsModel({
                            imgs_map_key: true,
                            imgs_map_value: imgsMapKey
                        });

                        keyMapsEntity.save(function (err, docs) {
                            if (err) console.error(err);
                        });
                    } else {
                        max_id = parseInt(JSON.parse(docs[0].imgs_map_value).max_id) + 1;
                    }

                    // 存数据库
                    let imgsEntity = new imgsModel({
                        _id: max_id,
                        name: files.img.name,
                        url: url
                    });

                    imgsEntity.save(function (err, docs) {
                        if (err) {
                            console.error('Somthing wrong: ' + err);
                        } else {
                            let conditions = {imgs_map_key: true};
                            let update = {$set: {imgs_map_value: JSON.stringify({max_id: max_id})}};
                            let options = {upsert: true};

                            keyMapsModel.update(conditions, update, options, function (err, suc) {
                                if (err) console.error(err);

                                if (suc) console.log(suc);

                                res.writeHead(200, {'content-type': 'text/plain'});
                                res.write('received upload: \n\n');
                                // res.end(util.inspect({fields: fields, files: files}));
                                res.end(util.inspect({code: 200, description: 'success', data: {url: url}}));
                                fs.renameSync(files.img.path, './web/static/imgs/' + files.img.name);
                            });
                        }
                    });
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

module.exports = uploadApis;