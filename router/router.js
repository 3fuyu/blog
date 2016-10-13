/**
 * Created by 3fuyu on 16/8/12.
 */
"use strict";

var express = require('express');
var router = express.Router();
var _ = require('lodash');

var post = require('../api/management/article/post');
var user = require('../api/management/user/user');

// 合并api
var apis = _.concat(post, user);

apis.forEach(function (value, key) {
    if (value.type === 'get') {
		router.get(value.url, value.success);
	} else if (value.type === 'post') {
		router.post(value.url, value.success);
	}
});

module.exports = router;