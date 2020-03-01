import { Action, WithoutGetterAndFunction } from '../types'
import { ChainExecutor } from './chain.executor'
import { ParallelExecutor } from './parallel.executor'
import { deepCopy } from '../utils'

export class StreamExecutorFacade<T> {
  private _initialValue: WithoutGetterAndFunction<T>

  constructor(initialValue: T, doDeepCopy: boolean) {
    this._initialValue = doDeepCopy
      ? deepCopy(initialValue)
      : (initialValue as WithoutGetterAndFunction<T>)
  }

  chain<A, B, C, D, E, F, G, H, I, J>(
    act1: Action<WithoutGetterAndFunction<T>, A>,
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

    return executor as Omit<typeof executor, 'stream'>
  }

  parallel<A, B, C, D, E, F, G, H, I, J>(
    act1: Action<WithoutGetterAndFunction<T>, A>,
    act2?: Action<WithoutGetterAndFunction<T>, B>,
    act3?: Action<WithoutGetterAndFunction<T>, C>,
    act4?: Action<WithoutGetterAndFunction<T>, D>,
    act5?: Action<WithoutGetterAndFunction<T>, E>,
    act6?: Action<WithoutGetterAndFunction<T>, F>,
    act7?: Action<WithoutGetterAndFunction<T>, G>,
    act8?: Action<WithoutGetterAndFunction<T>, H>,
    act9?: Action<WithoutGetterAndFunction<T>, I>,
    act10?: Action<WithoutGetterAndFunction<T>, J>
  ) {
    const executor = new ParallelExecutor(this._initialValue).stream(
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

    return executor as Omit<typeof executor, 'stream'>
  }
}

/**
 * create streamer
 * @param initialValue T
 * @param doDeepCopy default `true`. don't deepCody if `false`.
 */
export const createStream = <T>(initialValue: T, doDeepCopy = true) =>
  new StreamExecutorFacade(initialValue, doDeepCopy)
