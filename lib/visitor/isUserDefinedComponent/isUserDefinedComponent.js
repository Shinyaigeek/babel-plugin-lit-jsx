"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isUserDefinedComponent = void 0;
var getTagNameFromElement_1 = require("../getTagNameFromElement/getTagNameFromElement");
var htmltags_1 = require("../htmltags/htmltags");
exports.isUserDefinedComponent = function (element) {
    var tagName = getTagNameFromElement_1.getTagNameFromElement(element);
    return !htmltags_1.htmltags.includes(tagName);
};
