"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.accessRootProgramRecursively = void 0;
var types_1 = require("@babel/types");
exports.accessRootProgramRecursively = function (entry) {
    var parentNode = entry.parentPath;
    if (types_1.isProgram(parentNode.node)) {
        // TODO type guardでparentNode.nodeがParentNodeだからparentNodeはNodePath<ParentNode>って推論できない
        return parentNode;
    }
    return exports.accessRootProgramRecursively(parentNode);
};
