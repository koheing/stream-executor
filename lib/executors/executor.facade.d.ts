import { Action, WithoutGetterAndFunction } from '../types';
import { ChainExecutor } from './chain.executor';
import { ParallelExecutor } from './parallel.executor';
declare type WithoutGetterAndFunctionOr<U> = U extends U ? U : WithoutGetterAndFunction<U>;
export declare class StreamExecutorFacade<T> {
    private _initialValue;
    constructor(initialValue: T, doDeepCopy: boolean);
    chain<A, B, C, D, E, F, G, H, I, J>(act1: Action<WithoutGetterAndFunctionOr<T>, A>, act2?: Action<A, B>, act3?: Action<B, C>, act4?: Action<C, D>, act5?: Action<D, E>, act6?: Action<E, F>, act7?: Action<F, G>, act8?: Action<G, H>, act9?: Action<H, I>, act10?: Action<I, J>): Pick<ChainExecutor<WithoutGetterAndFunctionOr<T>>, "execute">;
    parallel<A, B, C, D, E, F, G, H, I, J>(act1: Action<WithoutGetterAndFunctionOr<T>, A>, act2?: Action<WithoutGetterAndFunctionOr<T>, B>, act3?: Action<WithoutGetterAndFunctionOr<T>, C>, act4?: Action<WithoutGetterAndFunctionOr<T>, D>, act5?: Action<WithoutGetterAndFunctionOr<T>, E>, act6?: Action<WithoutGetterAndFunctionOr<T>, F>, act7?: Action<WithoutGetterAndFunctionOr<T>, G>, act8?: Action<WithoutGetterAndFunctionOr<T>, H>, act9?: Action<WithoutGetterAndFunctionOr<T>, I>, act10?: Action<WithoutGetterAndFunctionOr<T>, J>): Pick<ParallelExecutor<WithoutGetterAndFunctionOr<T>>, "execute">;
}
/**
 * create streamer
 * @param initialValue T
 * @param doDeepCopy default `true`. don't deepCody if `false`.
 */
export declare const createStream: <T>(initialValue: T, doDeepCopy?: boolean) => StreamExecutorFacade<T>;
export {};
