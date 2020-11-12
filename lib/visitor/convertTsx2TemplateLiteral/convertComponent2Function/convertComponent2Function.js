"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertComponent2Function = void 0;
var types_1 = require("@babel/types");
var getTagNameFromElement_1 = require("../../getTagNameFromElement/getTagNameFromElement");
var isUserDefinedComponent_1 = require("../../isUserDefinedComponent/isUserDefinedComponent");
var resolveAttrValue_1 = require("../resolveAttrValue/resolveAttrValue");
exports.convertComponent2Function = function (node) {
    if (isUserDefinedComponent_1.isUserDefinedComponent(node)) {
        var tagName = getTagNameFromElement_1.getTagNameFromElement(node);
        var spreadAttributes = node.openingElement.attributes
            .map(function (attr) { return (types_1.isJSXSpreadAttribute(attr) ? attr : undefined); })
            .filter(function (attr) { return typeof attr !== "undefined"; });
        var children = types_1.jsxFragment(types_1.jsxOpeningFragment(), types_1.jsxClosingFragment(), node.children);
        return types_1.callExpression(types_1.identifier(tagName), [
            types_1.callExpression(types_1.memberExpression(types_1.identifier("Object"), types_1.identifier("assign")), __spreadArrays([
                types_1.objectExpression(node.openingElement.attributes
                    .map(function (attr) {
                    //TODO
                    if (types_1.isJSXAttribute(attr)) {
                        if (types_1.isJSXIdentifier(attr.name)) {
                            return types_1.objectProperty(types_1.identifier(attr.name.name), resolveAttrValue_1.resolveAttrValue(attr.value));
                        }
                        else {
                            throw new Error("jsx named space is not supported");
                        }
                    }
                })
                    .filter(function (attr) { return typeof attr !== "undefined"; })
                    .concat(types_1.objectProperty(types_1.identifier("children"), children)))
            ], spreadAttributes.map(function (attr) {
                return types_1.identifier(attr.argument.name);
            }))),
        ]);
    }
};
var h = [1, 2];
var i = __spreadArrays([1], h.map(function (i) { return i * 2; }));
