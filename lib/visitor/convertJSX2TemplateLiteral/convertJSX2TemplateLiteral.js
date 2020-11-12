"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertJSX2TemplateLiteral = void 0;
var convertJsxElementToTemplateLiteral_1 = require("../convertTsx2TemplateLiteral/convertJsxElementToTemplateLiteral/convertJsxElementToTemplateLiteral");
exports.convertJSX2TemplateLiteral = function (node) {
    var Converter = new convertJsxElementToTemplateLiteral_1.ConvertJSXElementToTemplateLiteral(node);
    Converter.traverse();
    return Converter.render();
};
