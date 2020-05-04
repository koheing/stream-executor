import { BaseExecutor } from './__interfaces__';
import { Action, PromiseOr } from '../types';
export declare class ChainExecutor<T> implements BaseExecutor {
    private _initialValue;
    private _actions;
    private _isPromiseContained;
    constructor(initialValue: T);
    stream<A, B, C, D, E, F, G, H, I, J>(act1: Action<T, A>, act2?: Action<A, B>, act3?: Action<B, C>, act4?: Action<C, D>, act5?: Action<D, E>, act6?: Action<E, F>, act7?: Action<F, G>, act8?: Action<G, H>, act9?: Action<H, I>, act10?: Action<I, J>): Pick<this, Exclude<keyof this, "stream">>;
    asAsync(): Pick<this, "execute">;
    execute(onError?: (error: any) => any): PromiseOr<any>;
    private _execute;
    private _promiseExecute;
}
