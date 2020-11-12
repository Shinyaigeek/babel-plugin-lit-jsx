"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveAttrValue = void 0;
var types_1 = require("@babel/types");
//TODO 型付け
exports.resolveAttrValue = function (attrValue) {
    if (types_1.isJSXExpressionContainer(attrValue)) {
        if (types_1.isIdentifier(attrValue.expression)) {
            return attrValue.expression;
        }
        if (types_1.isArrowFunctionExpression(attrValue.expression)) {
            return attrValue.expression;
        }
        if (types_1.isJSXElement(attrValue.expression)) {
            return attrValue.expression;
        }
    }
    return attrValue;
};
