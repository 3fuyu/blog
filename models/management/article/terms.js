/**
 * Created by 3fuyu on 2016/11/20.
 */

let mongoose = require('../../../db/mongoose');
let Schema = mongoose.Schema;
let termsSchema = new Schema({
    "_id": {
        type: 'Number',
        required: [true, '请输入id']
    },
    "name": { // 分类名
        type: 'String',
        required: [true, '请输入分类名称']
    },
    "slug": {  // 缩略名
        type: 'String'
    },
    "term_group": {  // 相似的 terms 集合在一起
        type: 'String'
    }
}, { _id: false });

let termsModel = mongoose.model('terms', termsSchema);

module.exports = termsModel;

