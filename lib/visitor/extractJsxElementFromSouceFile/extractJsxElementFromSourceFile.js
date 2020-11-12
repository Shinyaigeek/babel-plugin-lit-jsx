"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractJsxElementFromSouceFile = void 0;
var types_1 = require("@babel/types");
var astParser_1 = require("../astParser/astParser");
exports.extractJsxElementFromSouceFile = function (target) {
    var ast = astParser_1.astParser(target);
    return ast.program.body
        .map(function (program) {
        if (!types_1.isExportNamedDeclaration(program) &&
            !types_1.isExportDefaultDeclaration(program)) {
            return undefined;
        }
        var component = program.declaration;
        // Arrow Func
        if (types_1.isVariableDeclaration(component)) {
            var arrow = component.declarations[0].init;
            if (types_1.isArrowFunctionExpression(arrow)) {
                if (types_1.isBlockStatement(arrow.body)) {
                    var returnStatement = arrow.body.body[0];
                    if (types_1.isReturnStatement(returnStatement)) {
                        if (types_1.isJSXElement(returnStatement.argument) ||
                            types_1.isJSXFragment(returnStatement.argument)) {
                            return returnStatement.argument;
                        }
                    }
                }
                if (types_1.isJSXElement(arrow.body) || types_1.isJSXFragment(arrow.body)) {
                    return arrow.body;
                }
            }
        }
        // Func
        if (types_1.isFunctionDeclaration(component)) {
            if (types_1.isBlockStatement(component.body)) {
                var returnStatement = component.body.body[0];
                if (types_1.isReturnStatement(returnStatement)) {
                    if (types_1.isJSXElement(returnStatement.argument) ||
                        types_1.isJSXFragment(returnStatement.argument)) {
                        return returnStatement.argument;
                    }
                }
            }
        }
        return undefined;
    })
        .filter(function (res) { return typeof res !== "undefined"; });
};
