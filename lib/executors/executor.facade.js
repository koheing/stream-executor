"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chain_executor_1 = require("./chain.executor");
const batch_executor_1 = require("./batch.executor");
class StreamExecutorFacade {
    constructor(initialValue) {
        this._initialValue = initialValue;
    }
    /**
     * sequential execute.
     * call `asAsync` method after chain method if you use async/await in chain.
     * @see https://github.com/nor-ko-hi-jp/stream-executor/blob/master/README.md#4-use-asynchronous-execution-in-createstreamchain
     * @see https://github.com/nor-ko-hi-jp/stream-executor/blob/master/README.md#using-stream-executor
     * @param act1 (value: T) => U
     * @param act2 (value: T) => U
     * @param act3 (value: T) => U
     * @param act4 (value: T) => U
     * @param act5 (value: T) => U
     * @param act6 (value: T) => U
     * @param act7 (value: T) => U
     * @param act8 (value: T) => U
     * @param act9 (value: T) => U
     * @param act10 (value: T) => U
     */
    chain(act1, act2, act3, act4, act5, act6, act7, act8, act9, act10) {
        const executor = new chain_executor_1.ChainExecutor(this._initialValue).stream(act1, act2, act3, act4, act5, act6, act7, act8, act9, act10);
        return executor;
    }
    /**
     * batch execute, like `when` in Kotlin.
     * @see https://github.com/nor-ko-hi-jp/stream-executor/blob/master/README.md#using-stream-executor-1
     * @param act1 (value: T) => U
     * @param act2 (value: T) => U
     * @param act3 (value: T) => U
     * @param act4 (value: T) => U
     * @param act5 (value: T) => U
     * @param act6 (value: T) => U
     * @param act7 (value: T) => U
     * @param act8 (value: T) => U
     * @param act9 (value: T) => U
     * @param act10 (value: T) => U
     */
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
