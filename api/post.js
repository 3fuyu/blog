"use strict";

var express = require('express');
var router = express.Router();
var postsModel = require('../models/posts');

/* GET home page. */
router.get('/', function (req, res, next) {

});

// 发表文章
router.post('/postNew', function (req, res, next) {
    console.log(req);
    res.send({
        errCode: 200,
        errSuccess: 'success'
    });
});

// 查询文章
router.post('/queryList', function (req, res, next) {
    var data = postsModel.find({post_author:'对应作者ID'});

    res.send({
        errCode: 200,
        errSuccess: 'success',
        data: '123'
    });
});
module.exports = router;
