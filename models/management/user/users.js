/**
 * Created by 3fuyu on 16/8/11.
 */

var mongoose = require('../../../db/mongoose');

var usersSchema = mongoose.Schema({
    "ID" : {
        type: "String"
    },
    "user_login" : {
        type: "String"
    },
    "user_pass" : {
        type: "String"
    },
    "user_nicename" : {
        type: "String"
    },
    "user_email" : {
        type: "String"
    },
    "user_url" : {
        type: "String"
    },
    "user_registered" : {
        type: "String"
    },
    "user_status" : {
        type: "String"
    },
    "display_name" : {
        type: "String"
    }
});

var usersModel = mongoose.model('users', usersSchema);

module.exports = usersModel;