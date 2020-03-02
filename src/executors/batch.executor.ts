import { BaseExecutor } from './__interfaces__'
import { Action } from '../types'

export class BatchExecutor<T> implements BaseExecutor {
  private _initialValue: T
  private _actions: Action<T, any>[] = []
  constructor(initialValue: T) {
    this._initialValue = initialValue
  }

  stream<A, B, C, D, E, F, G, H, I, J>(
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
    const _actions = [
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
    ].filter((act) => typeof act !== 'undefined') as Action<any, any>[]
    this._actions = _actions
    return this
  }

  execute(onError?: (error: any) => any) {
    try {
      this._actions.forEach((it) => {
        it(this._initialValue)
      })
    } catch (e) {
      if (onError) {
        onError(e)
      } else {
        console.error(e)
      }
    }
  }
}
