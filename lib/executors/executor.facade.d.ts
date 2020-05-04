import { Action } from '../types';
import { ChainExecutor } from './chain.executor';
import { BatchExecutor } from './batch.executor';
export declare class StreamExecutorFacade<T> {
    private _initialValue;
    constructor(initialValue: T);
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
    chain<A, B, C, D, E, F, G, H, I, J>(act1: Action<T, A>, act2?: Action<A, B>, act3?: Action<B, C>, act4?: Action<C, D>, act5?: Action<D, E>, act6?: Action<E, F>, act7?: Action<F, G>, act8?: Action<G, H>, act9?: Action<H, I>, act10?: Action<I, J>): Pick<Pick<ChainExecutor<T>, "execute" | "asAsync">, "execute" | "asAsync">;
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
    batch<A, B, C, D, E, F, G, H, I, J>(act1: Action<T, A>, act2?: Action<T, B>, act3?: Action<T, C>, act4?: Action<T, D>, act5?: Action<T, E>, act6?: Action<T, F>, act7?: Action<T, G>, act8?: Action<T, H>, act9?: Action<T, I>, act10?: Action<T, J>): Pick<BatchExecutor<T>, "execute">;
}
/**
 * create streamer, initialValue is shallow copied.
 * Use `deepCopy` in this library if you'd like to do deep copy
 * @param initialValue T
 */
export declare const createStream: <T>(initialValue: T) => StreamExecutorFacade<T>;
