/**
 * Created by 3fuyu on 16/8/11.
 */

var mongoose = require('../../db/mongoose');
var Schema = mongoose.Schema;
var postsSchema = new Schema({
    "_id": {
        type: 'Number',
        required: [true, '请输入id']
    },
    "post_author": {
        type: 'String',
        required: [true, '请输入作者名称']
    },
    "post_date": {
        type: 'Number'
    },
    "post_content": {
        type: 'String',
        required: [true, '请输入内容']
    },
    "post_title": {
        type: 'String',
        required: [true, '请输入标题']
    },
    "post_excerpt": {
        type: 'String',
    },
    "post_status": {
        type: 'String',
    },
    "comment_status": {
        type: 'String',
    },
    "post_password": {
        type: 'String',
    },
    "post_name": {
        type: 'String',
    },
    "post_modified": {
        type: 'String',
    },
    "post_parent": {
        type: 'String',
    },
    "menu_order": {
        type: 'String',
    },
    "post_type": {
        type: 'String',
    },
    "view_count": {
        type: 'Number',
    },
    "comment_count": {
        type: 'String',
    }
}, { _id: false });

var postsModel = mongoose.model('posts', postsSchema);

module.exports = postsModel;