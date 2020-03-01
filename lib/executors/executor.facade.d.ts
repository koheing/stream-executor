import { Action, WithoutGetterAndFunction } from '../types';
import { ChainExecutor } from './chain.executor';
import { ParallelExecutor } from './parallel.executor';
export declare class StreamExecutorFacade<T> {
    private _initialValue;
    constructor(initialValue: T, doDeepCopy: boolean);
    chain<A, B, C, D, E, F, G, H, I, J>(act1: Action<WithoutGetterAndFunction<T>, A>, act2?: Action<A, B>, act3?: Action<B, C>, act4?: Action<C, D>, act5?: Action<D, E>, act6?: Action<E, F>, act7?: Action<F, G>, act8?: Action<G, H>, act9?: Action<H, I>, act10?: Action<I, J>): Pick<ChainExecutor<WithoutGetterAndFunction<T>>, "execute">;
    parallel<A, B, C, D, E, F, G, H, I, J>(act1: Action<WithoutGetterAndFunction<T>, A>, act2?: Action<WithoutGetterAndFunction<T>, B>, act3?: Action<WithoutGetterAndFunction<T>, C>, act4?: Action<WithoutGetterAndFunction<T>, D>, act5?: Action<WithoutGetterAndFunction<T>, E>, act6?: Action<WithoutGetterAndFunction<T>, F>, act7?: Action<WithoutGetterAndFunction<T>, G>, act8?: Action<WithoutGetterAndFunction<T>, H>, act9?: Action<WithoutGetterAndFunction<T>, I>, act10?: Action<WithoutGetterAndFunction<T>, J>): Pick<ParallelExecutor<WithoutGetterAndFunction<T>>, "execute">;
}
/**
 * create streamer
 * @param initialValue T
 * @param doDeepCopy default `true`. don't deepCody if `false`.
 */
export declare const createStream: <T>(initialValue: T, doDeepCopy?: boolean) => StreamExecutorFacade<T>;
