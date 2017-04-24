/**
 * Created by 3fuyu on 2017/4/24.
 */

"use strict";

let mongoose = require('../../../db/mongoose');
let Schema = mongoose.Schema;

let imgsSchema = new Schema({
    "_id": {
        type: 'Number',
        required: [true, '请输入id']
    },
    "url": {
        type: 'String',
    },
    "name": {
        type: 'String'
    }
}, { _id: false });

let imgsModel = mongoose.model('imgs', imgsSchema);
module.exports = imgsModel;