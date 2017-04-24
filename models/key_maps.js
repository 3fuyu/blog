/**
 * Created by 3fuyu on 16/8/11.
 */

var mongoose = require('../db/mongoose');

var mapsSchema = mongoose.Schema({
    'post_map_key' : {
        type: 'Boolean'
    },
    "post_map_value" : {
        type: 'String'
    },
    'terms_map_key': {
        type: 'Boolean'
    },
    'terms_map_value': {
        type: 'String'
    },
    'imgs_map_key': {
        type: 'Boolean'
    },
    'imgs_map_value': {
        type: 'String'
    }
});

var mapsModel = mongoose.model('key_maps', mapsSchema);

module.exports = mapsModel;