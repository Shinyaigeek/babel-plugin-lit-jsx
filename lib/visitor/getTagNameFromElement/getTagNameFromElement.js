"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTagNameFromElement = void 0;
var types_1 = require("@babel/types");
var accessObjectPropertyRecursively_1 = require("../accessObjectPropertyRecursively/accessObjectPropertyRecursively");
exports.getTagNameFromElement = function (element) {
    if (types_1.isJSXNamespacedName(element.openingElement.name)) {
        throw new Error("jsx namespaced name is not supported");
    }
    if (types_1.isJSXIdentifier(element.openingElement.name)) {
        return element.openingElement.name.name;
    }
    else {
        return accessObjectPropertyRecursively_1.accessObjectPropertyRecursively(element.openingElement.name, "");
    }
};
