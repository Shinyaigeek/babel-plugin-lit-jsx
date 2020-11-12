"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPropsKey = void 0;
var types_1 = require("@babel/types");
exports.getPropsKey = function (attrNode) {
    var attr = attrNode.node.name;
    if (types_1.isJSXIdentifier(attr)) {
        return attr.name;
    }
    // JSXNamespacedName
    throw new Error("lit-jsx doesn't support namespaced attribute key");
};
