/**
 * Created by 3fuyu on 16/8/6.
 */

var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    res.json({
        status: 200,
        message: "这是一个JSON接口",
        data:[{
            a:1
        }, {
            b:2
        }]
    });
});

router.get('/userInfo', function(req, res) {
    res.json({
        status: 200,
        message: "my name is 3fuyu",
        data:[{
            a:1
        }, {
            b:2
        }]
    });
});

module.exports = router;