"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tagHtmlPrefix = void 0;
var types_1 = require("@babel/types");
exports.tagHtmlPrefix = function (templateLiteral) {
    return types_1.taggedTemplateExpression(types_1.identifier("html"), templateLiteral);
};
