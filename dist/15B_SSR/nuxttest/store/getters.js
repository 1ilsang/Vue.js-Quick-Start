"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    getContactOne: function getContactOne(state) {
        var no = state.no;
        var arr = state.contacts.filter(function (item, index) {
            return item.no == no;
        });
        if (arr.length == 1) return arr[0];else return {};
    },
    getContacts: function getContacts(state) {
        return state.contacts;
    }
};
//# sourceMappingURL=getters.js.map