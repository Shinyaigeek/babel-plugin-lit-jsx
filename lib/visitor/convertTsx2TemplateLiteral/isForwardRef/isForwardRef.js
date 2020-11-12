"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isForwardRef = void 0;
var types_1 = require("@babel/types");
exports.isForwardRef = function (nodePath) {
    var callee = nodePath.node;
    return (types_1.isIdentifier(callee.object) &&
        callee.object.name === "React" &&
        types_1.isIdentifier(callee.property) &&
        callee.property.name === "forwardRef");
    return false;
};
