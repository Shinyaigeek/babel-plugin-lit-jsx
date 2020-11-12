"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertHTMLImport = void 0;
var types_1 = require("@babel/types");
var htmlImportedFromLitHtml_1 = require("../htmlImportedFromLitHtml/htmlImportedFromLitHtml");
exports.insertHTMLImport = function (rootNode) {
    if (!htmlImportedFromLitHtml_1.htmlImportedFromLitHtml(rootNode)) {
        rootNode.unshiftContainer("body", types_1.importDeclaration([types_1.importSpecifier(types_1.identifier("html"), types_1.identifier("html"))], types_1.stringLiteral("lit-html")));
    }
};
