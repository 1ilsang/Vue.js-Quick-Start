"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _constant = require("~/constant");

var _constant2 = _interopRequireDefault(_constant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

exports.default = _defineProperty({}, _constant2.default.CHANGE_NO, function (state, payload) {
    if (payload.no !== "") {
        state.no = payload.no;
    }
});
//# sourceMappingURL=mutations.js.map