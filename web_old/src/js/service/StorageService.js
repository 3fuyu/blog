/**
 * Created by 3fuyu on 16/03/10.
 */
"use strict";

var Storage = require('store');
var _ = require('lodash');

var StorageService = {};

var Params = {
    TASK_LIST_DATA: null,
    GROUP_USERS: null,
    DRAFTS_BOX: null,
    SIGNATURE: null
};

_.each(Params, function (value, key) {
    StorageService[key] = {
        set: function (value) {
            Storage.set(key, value);
        },
        get: function () {
            return Storage.get(key);
        },
        getReset: function () {
            var _value = Storage.get(key);
            Storage.remove(key);
            return _value;
        },
        clear: function () {
            Storage.remove(key);
        },
        clearAll: function () {
            Storage.clear();
        },
        has: function () {
            return Storage.has(key);
        }
    };
});

module.exports = StorageService;