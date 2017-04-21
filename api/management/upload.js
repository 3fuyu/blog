/**
 * Created by 3fuyu on 2017/2/14.
 */

"use strict";

let express = require('express');
let formidable = require('formidable');
let keyMaps = require('../../models/key_maps');
let fs = require('fs');

let baseRoute = '/admin/upload'

let uploadApis = [{
    type: 'post',
    url: baseRoute + '/image',
    success: function (req, res) {
        console.log(req.body);
        let files = JSON.parse(req.body.files);
        files.forEach(function (value, key) {
            let path =  './static/imgs/' + (+new Date()) + value.name;//从app.js级开始找--在我的项目工程里是这样的

            let base64 = value.src.replace(/^data:image\/\w+;base64,/, "");//去掉图片base64码前面部分data:image/png;base64
            let dataBuffer = new Buffer(base64, 'base64'); //把base64码转成buffer对象，
            console.log('dataBuffer是否是Buffer对象：' + Buffer.isBuffer(dataBuffer));
            fs.writeFile(path, dataBuffer, function (err) {//用fs写入文件
                if (err) {
                    console.log(err);
                } else {
                    console.log('写入成功！');
                    res.send({
                        code: 200,
                        description: 'success'
                        // data: Tools.para2camel(data)
                    });
                }
            });
        });
    }
}];

module.exports = uploadApis;