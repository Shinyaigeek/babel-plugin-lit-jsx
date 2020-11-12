"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.justifyJSXProps = void 0;
var types_1 = require("@babel/types");
var getPropsKey_1 = require("../getPropsKey/getPropsKey");
var isEventListener_1 = require("../isEventListener/isEventListener");
var isStyle_1 = require("../isStyle/isStyle");
var justifyEventListener_1 = require("../justifyEventListener/justifyEventListener");
var justifyStyle_1 = require("../justifyStyle/justifyStyle");
var table = {
    "className": "class",
};
exports.justifyJSXProps = function (nodePath) {
    var key = getPropsKey_1.getPropsKey(nodePath);
    if (key in table) {
        var proper = table[key];
        if (types_1.isStringLiteral(nodePath.node.value)) {
            nodePath.replaceWith(types_1.jsxAttribute(types_1.jsxIdentifier(proper), types_1.stringLiteral("\"" + nodePath.node.value.value + "\"")));
        }
        else {
            nodePath.replaceWith(types_1.jsxAttribute(types_1.jsxIdentifier(proper), nodePath.node.value));
        }
    }
    if (isEventListener_1.isEventListener(nodePath)) {
        justifyEventListener_1.justifyEventListener(nodePath);
    }
    if (isStyle_1.isStyle(nodePath)) {
        justifyStyle_1.justifyStyle(nodePath);
    }
};
