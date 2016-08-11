/**
 * Created by 3fuyu on 16/8/11.
 */

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/blog');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
    // yay!
    console.log.bind(console, 'connection success!');
});

module.exports = mongoose;