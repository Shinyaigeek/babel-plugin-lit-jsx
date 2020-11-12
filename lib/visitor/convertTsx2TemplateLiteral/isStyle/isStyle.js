"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isStyle = void 0;
var types_1 = require("@babel/types");
exports.isStyle = function (attr) {
    if (types_1.isJSXElement(attr.parentPath.node) ||
        types_1.isJSXOpeningElement(attr.parentPath.node)) {
        if (types_1.isJSXIdentifier(attr.node.name)) {
            return attr.node.name.name === "style";
        }
        throw new Error("jsx namespaced name is not support");
    }
};
