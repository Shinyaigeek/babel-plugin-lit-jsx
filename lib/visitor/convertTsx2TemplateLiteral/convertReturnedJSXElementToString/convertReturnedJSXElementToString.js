"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertReturnedJSXElementToString = void 0;
var types_1 = require("@babel/types");
var accessRootProgramRecursively_1 = require("../../accessRootProgramRecursively/accessRootProgramRecursively");
var convertJsxElementToTemplateLiteral_1 = require("../convertJsxElementToTemplateLiteral/convertJsxElementToTemplateLiteral");
var insertHTMLImport_1 = require("../insertHtmlImport/insertHTMLImport");
var tagHtmlPrefix_1 = require("../tagHtmlPrefix/tagHtmlPrefix");
//TODO later
exports.convertReturnedJSXElementToString = function (nodePath) {
    if (types_1.isJSXElement(nodePath.node.argument) ||
        types_1.isJSXFragment(nodePath.node.argument)) {
        var Convert = new convertJsxElementToTemplateLiteral_1.ConvertJSXElementToTemplateLiteral(nodePath.node.argument);
        Convert.traverse();
        var rootNode = accessRootProgramRecursively_1.accessRootProgramRecursively(nodePath);
        insertHTMLImport_1.insertHTMLImport(rootNode);
        nodePath.replaceWith(types_1.returnStatement(tagHtmlPrefix_1.tagHtmlPrefix(Convert.render())));
    }
    else {
        console.warn("pure functional component should return jsx element");
    }
};
