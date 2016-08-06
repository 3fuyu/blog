/**
 * Created by 3fuyu on 16/8/6.
 */

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/3fuyu');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connect error'));
db.once('open', function (callback) {
    console.log.bind(console, 'connection success');
});

var kittySchema = mongoose.Schema({
    name: String
});
var Kitten = mongoose.model('Kitten', kittySchema);
var silence = new Kitten({name: 'this is form mogodb by 3fuyu'});

router.get('/', function(req, res) {
    res.json({
        status: 200,
        message: silence.name,
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