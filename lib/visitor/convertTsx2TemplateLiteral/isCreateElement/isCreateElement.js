"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isCreateElement = void 0;
var types_1 = require("@babel/types");
exports.isCreateElement = function (nodePath) {
    var callee = nodePath.node.callee;
    if (types_1.isMemberExpression(callee)) {
        return (types_1.isIdentifier(callee.object) &&
            callee.object.name === "React" &&
            types_1.isIdentifier(callee.property) &&
            callee.property.name === "createElement");
    }
    return false;
};
