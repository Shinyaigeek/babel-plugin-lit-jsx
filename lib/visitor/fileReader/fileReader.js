"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileReader = void 0;
var fs_1 = require("fs");
exports.fileReader = function (target) {
    return fs_1.readFileSync(target, "utf-8");
};
