"use strict";

var baseRoute = '/user';

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
}];


module.exports = userApis;
