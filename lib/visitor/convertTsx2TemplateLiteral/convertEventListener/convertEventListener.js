"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertEventListener = void 0;
exports.convertEventListener = function (eventName) {
    return eventName.replace("on", "@").toLowerCase();
};
