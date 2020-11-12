"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.justifyStyle = void 0;
var types_1 = require("@babel/types");
var convertStyle_1 = require("../convertStyle/convertStyle");
var getPropsKey_1 = require("../getPropsKey/getPropsKey");
exports.justifyStyle = function (style) {
    var key = getPropsKey_1.getPropsKey(style);
    if (types_1.isJSXExpressionContainer(style.node.value)) {
        if (types_1.isObjectExpression(style.node.value.expression)) {
            style.replaceWith(types_1.jsxAttribute(types_1.jsxIdentifier(key), convertStyle_1.convertStyle(style.node.value.expression)));
        }
        else {
            throw new Error("style object prop should be object expression");
        }
    }
    else {
        throw new Error("style object prop should be jsx expression container");
    }
};
