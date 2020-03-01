"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chain_executor_1 = require("./chain.executor");
const parallel_executor_1 = require("./parallel.executor");
class StreamExecutorFacade {
    constructor(initialValue) {
        this._initialValue = initialValue;
    }
    chain(act1, act2, act3, act4, act5, act6, act7, act8, act9, act10) {
        const executor = new chain_executor_1.ChainExecutor(this._initialValue).stream(act1, act2, act3, act4, act5, act6, act7, act8, act9, act10);
        return executor;
    }
    parallel(act1, act2, act3, act4, act5, act6, act7, act8, act9, act10) {
        const executor = new parallel_executor_1.ParallelExecutor(this._initialValue).stream(act1, act2, act3, act4, act5, act6, act7, act8, act9, act10);
        return executor;
    }
}
exports.StreamExecutorFacade = StreamExecutorFacade;
/**
 * create streamer, initialValue is deep copied
 * @param initialValue T
 */
exports.createStream = (initialValue) => new StreamExecutorFacade(initialValue);
