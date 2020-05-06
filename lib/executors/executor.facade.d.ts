import { Action } from '../types';
import { Constructor, BaseExecutor } from './__interfaces__';
export declare class StreamExecutorFacade<T> {
    private _initialValue;
    private _chainClass;
    private _batchClass;
    constructor(initialValue: T, option: {
        chainClass?: Constructor<BaseExecutor>;
        batchClass?: Constructor<BaseExecutor>;
    });
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
    chain<A, B, C, D, E, F, G, H, I, J>(act1: Action<T, A>, act2?: Action<A, B>, act3?: Action<B, C>, act4?: Action<C, D>, act5?: Action<D, E>, act6?: Action<E, F>, act7?: Action<F, G>, act8?: Action<G, H>, act9?: Action<H, I>, act10?: Action<I, J>): Pick<Pick<BaseExecutor, "execute">, "execute">;
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
    batch<A, B, C, D, E, F, G, H, I, J>(act1: Action<T, A>, act2?: Action<T, B>, act3?: Action<T, C>, act4?: Action<T, D>, act5?: Action<T, E>, act6?: Action<T, F>, act7?: Action<T, G>, act8?: Action<T, H>, act9?: Action<T, I>, act10?: Action<T, J>): Pick<Pick<BaseExecutor, "execute">, "execute">;
    private _create;
}
/**
 * create streamer, initialValue is shallow copied.
 *
 *
 * Use `deepCopy` in this library if you'd like to do deep copy.
 *
 *
 * Set `option.chainClass` or `option.batchClass` if you would change execution process.
 *   - https://github.com/nor-ko-hi-jp/stream-executor/blob/master/README.md#6-replace-chain-or-batch-executor
 * @param initialValue T
 * @param option: { chainClass?: { new (...args: any[]): BaseExecutor }, batchClass?: { new (...args: any[]): BaseExecutor } }
 */
export declare const createStream: <T>(initialValue: T, option?: {
    chainClass?: Constructor<BaseExecutor> | undefined;
    batchClass?: Constructor<BaseExecutor> | undefined;
}) => StreamExecutorFacade<T>;
