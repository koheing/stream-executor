import { createStream } from '../executors'

/**
 * Convert A to B, like `map` in RxJS
 * @param mapper (data: T) => U
 * @example
 *  createStream(1)
 *    .sequential(
 *      map(num => num + 1),
 *      ..
 *    )
 */
export const map = <T, U>(mapper: (data: T) => U) => (data: T) => {
  const mapped = mapper(data)
  return mapped
}

/**
 * like `tap` in RxJS
 * @param tapper (data: T) => void
 * @example
 *  createStream(1)
 *    .sequential(
 *      tap(num => console.log(tap)),
 *      ..
 *    )
 */
export const tap = <T>(tapper: (data: T) => void) => (data: T) => {
  tapper(data)
  return data
}

/**
 * like `filter` in RxJS
 * @param predicate (data: T) => boolean
 * @example
 *  createStream(1)
 *    .sequential(
 *      filter(num => num > 2),
 *      ..
 *    )
 */
export const filter = <T>(predicate: (data: T) => boolean) => (data: T) => {
  const result = (predicate(data) ? data : undefined) as T
  return result
}

/**
 * if `predicate` is true,`right` called, otherwise `left` called
 * @param predicate (data: T) => boolean
 * @param right (data: T) => U
 * @param left (data: T) => U
 * @example
 *  let isSucceded: boolean
 *  createStream(1)
 *    .sequential(
 *      which(
 *        num => num > 2,
 *        tap(_ => { isSucceded = true }),
 *        tap(_ => { isSucceded = false })
 *      ),
 *      ..
 *    )
 */
export const which = <T, U, V>(
  predicate: (data: T) => boolean,
  right: (data: T) => U,
  left: (data: T) => V
) => (data: T) => {
  const result = predicate(data) ? right(data) : left(data)
  return result
}

/**
 * if `predicate` is true,`right` called
 * @param predicate (data: T) => boolean
 * @param right (data: T) => U
 * @example
 *  let isSucceded: boolean
 *  createStream(1)
 *    .sequential(
 *      ifRight(
 *        num => num > 2,
 *        tap(num => console.log(num))
 *      ),
 *      ..
 *    )
 */
export const ifRight = <T, U>(
  predicate: (data: T) => boolean,
  right: (data: T) => U
) => (data: T): T | U => {
  if (predicate(data)) {
    right(data)
  }
  return data
}

/**
 * filter if true :`typeof data === type`
 * @param type
 * @example
 *  createStream(1)
 *    .sequential(
 *      ifRight(
 *        num => num > 2,
 *        map(num => num.toString())
 *      ),
 *      asType<string>('string'),
 *      ..
 *    )
 */
export const asType = <T>(
  type:
    | 'string'
    | 'number'
    | 'boolean'
    | 'object'
    | 'function'
    | 'symbol'
    | 'undefined'
    | 'bigint'
) => <U>(data: U) => ((typeof data === type ? data : undefined) as unknown) as T

/**
 * stop further processing
 * @example
 *  createStream(1)
 *    .sequential(
 *      ifRight(
 *        num => num > 2,
 *        stop()
 *      ),
 *      ..
 *    )
 */
export const stop = () => <T>(_: T) => (undefined as unknown) as T

const _logging = <T>(data: T) => console.log(data)
export const logging = tap(_logging)
