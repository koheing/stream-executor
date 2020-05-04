import { Action, PromiseOr } from '../types'
import { ChainExecutor } from './chain.executor'
import { BatchExecutor } from './batch.executor'

export class StreamExecutorFacade<T> {
  private _initialValue: T

  constructor(initialValue: T) {
    this._initialValue = initialValue
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
  chain<A, B, C, D, E, F, G, H, I, J>(
    act1: Action<T, A>,
    act2?: Action<A, B>,
    act3?: Action<B, C>,
    act4?: Action<C, D>,
    act5?: Action<D, E>,
    act6?: Action<E, F>,
    act7?: Action<F, G>,
    act8?: Action<G, H>,
    act9?: Action<H, I>,
    act10?: Action<I, J>
  ) {
    const executor = new ChainExecutor(this._initialValue).stream(
      act1 as Action<PromiseOr<any>, PromiseOr<any>>,
      act2 as Action<PromiseOr<any>, PromiseOr<any>>,
      act3 as Action<PromiseOr<any>, PromiseOr<any>>,
      act4 as Action<PromiseOr<any>, PromiseOr<any>>,
      act5 as Action<PromiseOr<any>, PromiseOr<any>>,
      act6 as Action<PromiseOr<any>, PromiseOr<any>>,
      act7 as Action<PromiseOr<any>, PromiseOr<any>>,
      act8 as Action<PromiseOr<any>, PromiseOr<any>>,
      act9 as Action<PromiseOr<any>, PromiseOr<any>>,
      act10 as Action<PromiseOr<any>, PromiseOr<any>>
    )

    return executor as Omit<typeof executor, 'stream'>
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
  batch<A, B, C, D, E, F, G, H, I, J>(
    act1: Action<T, A>,
    act2?: Action<T, B>,
    act3?: Action<T, C>,
    act4?: Action<T, D>,
    act5?: Action<T, E>,
    act6?: Action<T, F>,
    act7?: Action<T, G>,
    act8?: Action<T, H>,
    act9?: Action<T, I>,
    act10?: Action<T, J>
  ) {
    const executor = new BatchExecutor(this._initialValue).stream(
      act1,
      act2,
      act3,
      act4,
      act5,
      act6,
      act7,
      act8,
      act9,
      act10
    )

    return executor as Pick<typeof executor, 'execute'>
  }
}

/**
 * create streamer, initialValue is shallow copied.
 * Use `deepCopy` in this library if you'd like to do deep copy
 * @param initialValue T
 */
export const createStream = <T>(initialValue: T) =>
  new StreamExecutorFacade(initialValue)
