/**
 * Created by 3fuyu on 16/8/6.
 */

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/blog');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connect error'));
db.once('open', function (callback) {
    console.log.bind(console, 'connection success');
});

var postsSchema = mongoose.Schema({
    "post_author": String,
    "post_date": String,
    "post_content": String,
    "post_title": String,
    "post_excerpt": String,
    "post_status": String,
    "comment_status": String,
    "post_password": String,
    "post_name": String,
    "post_modified": String,
    "post_parent": String,
    "menu_order": String,
    "post_type": String,
    "comment_count": String
});
var postsModel = db.model('posts', postsSchema);
var silence = new postsModel({
    "post_author": "对应作者ID",
    "post_date": "发布时间",
    "post_content": "正文",
    "post_title": "标题",
    "post_excerpt": "摘录",
    "post_status": "文章状态（publish/auto-draft/inherit等）",
    "comment_status": "评论状态（open/closed）",
    "post_password": "文章密码",
    "post_name": "文章缩略名",
    "post_modified": "修改时间",
    "post_parent": "父文章，主要用于PAGE",
    "menu_order": "排序ID",
    "post_type": "文章类型（post文章/page页面等） attachment 表示媒体库 ",
    "comment_count": "评论总数"
});

silence.save();

router.get('/', function (req, res) {
    res.json({
        status: 200,
        message: silence.name,
        data: [{
            a: 1
        }, {
            b: 2
        }]
    });
});

router.get('/userInfo', function (req, res) {
    res.json({
        status: 200,
        message: "my name is 3fuyu",
        data: [{
            a: 1
        }, {
            b: 2
        }]
    });
});

module.exports = router;
