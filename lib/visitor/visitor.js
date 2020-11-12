"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.astParser = exports.visitor = void 0;
var types_1 = require("@babel/types");
var accessRootProgramRecursively_1 = require("./accessRootProgramRecursively/accessRootProgramRecursively");
var astParser_1 = require("./astParser/astParser");
Object.defineProperty(exports, "astParser", { enumerable: true, get: function () { return astParser_1.astParser; } });
var convertJSX2TemplateLiteral_1 = require("./convertJSX2TemplateLiteral/convertJSX2TemplateLiteral");
var convertComponent2Function_1 = require("./convertTsx2TemplateLiteral/convertComponent2Function/convertComponent2Function");
var insertHTMLImport_1 = require("./convertTsx2TemplateLiteral/insertHtmlImport/insertHTMLImport");
var isCreateElement_1 = require("./convertTsx2TemplateLiteral/isCreateElement/isCreateElement");
var isForwardRef_1 = require("./convertTsx2TemplateLiteral/isForwardRef/isForwardRef");
var tagHtmlPrefix_1 = require("./convertTsx2TemplateLiteral/tagHtmlPrefix/tagHtmlPrefix");
var isUserDefinedComponent_1 = require("./isUserDefinedComponent/isUserDefinedComponent");
exports.visitor = {
    JSXElement: function (nodePath) {
        if (!types_1.isJSXElement(nodePath.parent) && !types_1.isJSXFragment(nodePath.parent)) {
            var jsx = nodePath.node;
            var templateLiteral = convertJSX2TemplateLiteral_1.convertJSX2TemplateLiteral(jsx);
            var taggedTemplateLiteral = tagHtmlPrefix_1.tagHtmlPrefix(templateLiteral);
            var rootProgram = accessRootProgramRecursively_1.accessRootProgramRecursively(nodePath);
            insertHTMLImport_1.insertHTMLImport(rootProgram);
            nodePath.replaceWith(taggedTemplateLiteral);
        }
        else {
            var jsx = nodePath.node;
            if (isUserDefinedComponent_1.isUserDefinedComponent(jsx)) {
                var litHtmlComponent = convertComponent2Function_1.convertComponent2Function(jsx);
                if (litHtmlComponent) {
                    nodePath.replaceWith(litHtmlComponent);
                }
            }
        }
    },
    JSXFragment: function (nodePath) {
        if (!types_1.isJSXElement(nodePath.parent) && !types_1.isJSXFragment(nodePath.parent)) {
            var jsx = nodePath.node;
            var templateLiteral = convertJSX2TemplateLiteral_1.convertJSX2TemplateLiteral(jsx);
            var taggedTemplateLiteral = tagHtmlPrefix_1.tagHtmlPrefix(templateLiteral);
            var rootProgram = accessRootProgramRecursively_1.accessRootProgramRecursively(nodePath);
            insertHTMLImport_1.insertHTMLImport(rootProgram);
            nodePath.replaceWith(taggedTemplateLiteral);
        }
    },
    CallExpression: function (nodePath) {
        if (isCreateElement_1.isCreateElement(nodePath)) {
            var _a = nodePath.node.arguments, component = _a[0], props = _a[1];
            if (types_1.isIdentifier(props)) {
                if (types_1.isIdentifier(component)) {
                    if (component.name === "tag") {
                        nodePath.replaceWithSourceString("html`<${" + component.name + "} ${Object.keys(" + props.name + ").map(key => `${key}=\"${" + props.name + "[key]}\"`)}></${" + component.name + "}>`");
                    }
                    else {
                        nodePath.replaceWithSourceString("html`${" + component.name + "(" + props.name + ")}`");
                    }
                }
            }
        }
    },
    MemberExpression: function (nodePath) {
        if (isForwardRef_1.isForwardRef(nodePath)) {
            nodePath.replaceWithSourceString("undefined");
        }
    },
};
