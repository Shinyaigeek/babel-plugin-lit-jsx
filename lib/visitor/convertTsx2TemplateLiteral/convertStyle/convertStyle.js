"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertStyle = void 0;
var types_1 = require("@babel/types");
// TODO type styles
exports.convertStyle = function (style) {
    return types_1.jsxExpressionContainer(types_1.callExpression(types_1.identifier("styleMap"), [style]));
};
