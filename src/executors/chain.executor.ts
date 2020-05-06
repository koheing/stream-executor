import { BaseExecutor } from './__interfaces__'
import { Action, PromiseOr } from '../types'

export class ChainExecutor<T> implements BaseExecutor {
  private _initialValue: T
  private _actions: Action<PromiseOr<any>, PromiseOr<any>>[] = []
  private _isPromiseContained = false

  constructor(initialValue: T) {
    this._initialValue = initialValue
  }

  stream<A, B, C, D, E, F, G, H, I, J>(
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
  ): Omit<this, 'stream'> {
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
      act10,
    ].filter((act) => typeof act !== 'undefined') as Action<
      PromiseOr<any>,
      PromiseOr<any>
    >[]
    this._actions = _actions
    return this as Omit<this, 'stream'>
  }

  asAsync(): Pick<this, 'execute'> {
    this._isPromiseContained = true
    return this as Pick<this, 'execute'>
  }

  execute(onError?: (error: any) => any): PromiseOr<any> {
    let result: PromiseOr<any> = this._initialValue
    try {
      result = this._isPromiseContained
        ? this._promiseExecute()
        : this._execute()
    } catch (e) {
      if (onError) {
        onError(e)
      } else {
        console.error(e)
      }
    }

    return result
  }

  private _execute(): any {
    let result = this._initialValue
    this._actions.reduce((pre, curr) => {
      if (typeof pre === 'undefined') {
        return
      }
      const _result = curr(pre)
      result = _result
      return _result
    }, this._initialValue)
    return result
  }

  private async _promiseExecute(): Promise<any> {
    let result = this._initialValue
    await this._actions.reduce(
      async (pre, curr: Action<PromiseOr<any>, PromiseOr<any>>) => {
        if (pre instanceof Promise && typeof (await pre) === 'undefined') {
          return
        }

        const _result = await curr(pre)
        result = _result
        return _result
      },
      Promise.resolve(this._initialValue)
    )

    return result
  }
}
