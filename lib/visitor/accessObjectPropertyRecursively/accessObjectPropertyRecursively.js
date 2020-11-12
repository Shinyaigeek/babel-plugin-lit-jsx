"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.accessObjectPropertyRecursively = void 0;
var types_1 = require("@babel/types");
exports.accessObjectPropertyRecursively = function (root, prev) {
    if (prev === void 0) { prev = ""; }
    if (types_1.isJSXMemberExpression(root.object)) {
        return exports.accessObjectPropertyRecursively(root.object, prev === "" ? root.property.name : root.property.name + "." + prev);
    }
    if (prev === "") {
        return root.object.name + "." + root.property.name;
    }
    return root.object.name + "." + root.property.name + "." + prev;
};
