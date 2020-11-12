"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.justifyEventListener = void 0;
var types_1 = require("@babel/types");
var convertEventListener_1 = require("../convertEventListener/convertEventListener");
var getPropsKey_1 = require("../getPropsKey/getPropsKey");
exports.justifyEventListener = function (eventListener) {
    var key = getPropsKey_1.getPropsKey(eventListener);
    eventListener.replaceWith(types_1.jsxAttribute(types_1.jsxIdentifier(convertEventListener_1.convertEventListener(key)), eventListener.node.value));
};
