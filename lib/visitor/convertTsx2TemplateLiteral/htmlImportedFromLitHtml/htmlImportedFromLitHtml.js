"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.htmlImportedFromLitHtml = void 0;
var types_1 = require("@babel/types");
exports.htmlImportedFromLitHtml = function (rootNode) {
    return !rootNode.node.body.every(function (child) {
        if (types_1.isImportDeclaration(child)) {
            if (child.source.value === "lit-html") {
                if (child.specifiers.some(function (specify) {
                    if (types_1.isImportSpecifier(specify)) {
                        return specify.imported.name === "html";
                    }
                })) {
                    return false;
                }
            }
        }
        return true;
    });
};
