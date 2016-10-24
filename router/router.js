/**
 * Created by 3fuyu on 16/8/12.
 */
"use strict";

var express = require('express');
var router = express.Router();
var _ = require('lodash');

var adminArticle = require('../api/management/article'),
	user = require('../api/management/user'),
	article = require('../api/user/article');

// 合并api
var apis = _.concat(adminArticle, article, user);

apis.forEach(function (value, key) {
    if (value.type === 'get') {
		router.get(value.url, value.success);
	} else if (value.type === 'post') {
		router.post(value.url, value.success);
	}
});

module.exports = router;