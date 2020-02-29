"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var executors_1 = require("./executors");
exports.createStream = executors_1.createStream;
exports.StreamExecutorFacade = executors_1.StreamExecutorFacade;
__export(require("./utils"));
