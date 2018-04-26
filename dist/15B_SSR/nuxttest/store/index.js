'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

var _vuex = require('vuex');

var _vuex2 = _interopRequireDefault(_vuex);

var _state = require('./state.js');

var _state2 = _interopRequireDefault(_state);

var _getters = require('./getters.js');

var _getters2 = _interopRequireDefault(_getters);

var _mutations = require('./mutations.js');

var _mutations2 = _interopRequireDefault(_mutations);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var store = function store() {
    return new _vuex2.default.Store({
        state: _state2.default,
        getters: _getters2.default,
        mutations: _mutations2.default
    });
};

exports.default = store;
//# sourceMappingURL=index.js.map