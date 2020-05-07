import { BaseExecutor } from './__interfaces__';
import { Action } from '../types';
export declare class BatchExecutor<T> implements BaseExecutor {
    private _initialValue;
    private _actions;
    constructor(initialValue: T);
    get initialValue(): T;
    stream<A, B, C, D, E, F, G, H, I, J>(act1: Action<T, A>, act2?: Action<T, B>, act3?: Action<T, C>, act4?: Action<T, D>, act5?: Action<T, E>, act6?: Action<T, F>, act7?: Action<T, G>, act8?: Action<T, H>, act9?: Action<T, I>, act10?: Action<T, J>): Omit<this, 'stream'>;
    execute(onError?: (error: any) => any): void;
}
