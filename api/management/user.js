"use strict";

var baseRoute = '/admin/user';
var usersModel = require('../../models/management/user/users');
var Tools = require('../../tools/tools');

var userApis = [{

    type: 'get',
    url: baseRoute + '/getUserInfo',
    success: function (req, res, next) {
        usersModel
        .find({ID: req.session.user_id})
        .exec(function (err, data) {
            var _data = Tools.para2camel(data);

            res.send({
                code: 200,
                description: 'success',
                data: _data
            });
        });

    }
}, {
    type: 'post',
    url: baseRoute + '/login',
    success: function (req, res, next) {
        usersModel
        .find({ID: '1'})
        .exec(function (err, data) {
            var _data = Tools.para2camel(data);

            if (req.body.name === _data[0].userLogin && req.body.password === _data[0].userPass) {

                req.session.user_id = '1';
                req.session.user = '3fuyu';

                res.send({
                    code: 200,
                    description: 'success'
                });
            } else {
                res.send({
                    code: 500,
                    description: 'name or password wrong'
                });
            }
        });
    }
}, {
    type: 'post',
    url: baseRoute + '/logout',
    success: function (req, res, next) {
        req.session.destroy();

        res.send({
            code: 200,
            description: 'success'
        });

    }
}];


module.exports = userApis;
