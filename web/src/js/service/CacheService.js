/**
 * Created by 3fuyu on 16/03/10.
 */
"use strict";

var _ = require('lodash');

var CacheService = {};

var Params = {
    SelectAddress: null,
    AllAddress: null,
    SelectBill: null
};

_.each(Params, function (value, key) {
    CacheService[key] = {
        get: function () {
            return Params[key];
        },
        set: function (_value) {
            Params[key] = _value;
        },
        getReset: function () {
            var _cookie = Params[key];
            Params[key] = null;
            return _cookie;
        }
    };
});

module.exports = CacheService;
