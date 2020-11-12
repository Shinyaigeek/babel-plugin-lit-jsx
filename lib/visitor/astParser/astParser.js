"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.astParser = void 0;
var parser_1 = require("@babel/parser");
var fileReader_1 = require("../fileReader/fileReader");
exports.astParser = function (entry) {
    var source = fileReader_1.fileReader(entry);
    return parser_1.parse(source, {
        sourceType: "module",
        plugins: ["jsx", "typescript"],
    });
};
