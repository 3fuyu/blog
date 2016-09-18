"use strict";

var baseRoute = '/user';
var usersModel = require('../models/users');
var Tools = require('../tools/tools');

var userApis = [{

    // test
    type: 'get',
    url: baseRoute + '/getUserInfo',
    success: function (req, res, next) {
        res.send({
            errorCode: 200,
            errorDescription: 'success',
            data: 'test getUserInfo'
        });
    }
}, {
    // test
    type: 'post',
    url: baseRoute + '/login',
    success: function (req, res, next) {
        usersModel
            .find({ID: '1'})
            .exec(function (err, data) {
                var _data = Tools.para2camel(data);

                if (req.body.name === _data[0].userLogin && req.body.password === _data[0].userPass) {
                    res.send({
                        errorCode: 200,
                        errorDescription: 'success'
                    });
                } else {
                    res.send({
                        errorCode: 505,
                        errorDescription: 'name or password wrong'
                    });
                }
            });
    }
}];


module.exports = userApis;
