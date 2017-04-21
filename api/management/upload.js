/**
 * Created by 3fuyu on 2017/2/14.
 */

"use strict";

let express = require('express');
let formidable = require('formidable');
let util = require('util');
let keyMaps = require('../../models/key_maps');
let fs = require('fs');

let baseRoute = '/admin/upload'

let uploadApis = [{
    type: 'post',
    url: baseRoute + '/image',
    success: function (req, res) {
        console.log(req.payload);
        let form = new formidable.IncomingForm();

        form.parse(req, function (err, fields, files) {
            res.writeHead(200, {'content-type': 'text/plain'});
            res.write('received upload: \n\n');
            res.end(util.inspect({fields: fields, files: files}));
            fs.renameSync(files.img.path, './static/imgs/' + files.img.name);
        });
    }
}];

module.exports = uploadApis;