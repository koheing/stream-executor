"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chain_executor_1 = require("./chain.executor");
const batch_executor_1 = require("./batch.executor");
class StreamExecutorFacade {
    constructor(initialValue) {
        this._initialValue = initialValue;
    }
    chain(act1, act2, act3, act4, act5, act6, act7, act8, act9, act10) {
        const executor = new chain_executor_1.ChainExecutor(this._initialValue).stream(act1, act2, act3, act4, act5, act6, act7, act8, act9, act10);
        return executor;
    }
    batch(act1, act2, act3, act4, act5, act6, act7, act8, act9, act10) {
        const executor = new batch_executor_1.BatchExecutor(this._initialValue).stream(act1, act2, act3, act4, act5, act6, act7, act8, act9, act10);
        return executor;
    }
}
exports.StreamExecutorFacade = StreamExecutorFacade;
/**
 * create streamer, initialValue is shallow copied.
 * Use `deepCopy` in this library if you'd like to do deep copy
 * @param initialValue T
 */
exports.createStream = (initialValue) => new StreamExecutorFacade(initialValue);
