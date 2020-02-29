/**
 * Convert A to B, like `map` in RxJS
 * @param mapper (data: T) => U
 * @example
 *  createStream(1)
 *    .chain(
 *      map(num => num + 1),
 *      ..
 *    )
 */
export declare const map: <T, U>(mapper: (data: T) => U) => (data: T) => U;
/**
 * like `tap` in RxJS
 * @param tapper (data: T) => void
 * @example
 *  createStream(1)
 *    .chain(
 *      tap(num => console.log(tap)),
 *      ..
 *    )
 */
export declare const tap: <T>(tapper: (data: T) => void) => (data: T) => T;
/**
 * like `filter` in RxJS
 * @param predicate (data: T) => boolean
 * @example
 *  createStream(1)
 *    .chain(
 *      filter(num => num > 2),
 *      ..
 *    )
 */
export declare const filter: <T>(predicate: (data: T) => boolean) => (data: T) => T;
/**
 * if `predicate` is true,`right` called, otherwise `left` called
 * @param predicate (data: T) => boolean
 * @param right (data: T) => U
 * @param left (data: T) => U
 * @example
 *  let isSucceded: boolean
 *  createStream(1)
 *    .chain(
 *      which(
 *        num => num > 2,
 *        tap(_ => { isSucceded = true }),
 *        tap(_ => { isSucceded = false })
 *      ),
 *      ..
 *    )
 */
export declare const which: <T, U, V>(predicate: (data: T) => boolean, right: (data: T) => U, left: (data: T) => V) => (data: T) => U | V;
/**
 * if `predicate` is true,`right` called
 * @param predicate (data: T) => boolean
 * @param right (data: T) => U
 * @example
 *  let isSucceded: boolean
 *  createStream(1)
 *    .chain(
 *      ifRight(
 *        num => num > 2,
 *        tap(num => console.log(num))
 *      ),
 *      ..
 *    )
 */
export declare const ifRight: <T, U>(predicate: (data: T) => boolean, right: (data: T) => any) => (data: T) => T;
/**
 * filter if true :`typeof data === type`
 * @param type
 * @example
 *  createStream(1)
 *    .chain(
 *      map(it => it as string | number),
 *      asTypeOf<number>('number'),
 *      ..
 *    )
 */
export declare const asTypeOf: <T>(type: "string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "function") => <U>(data: U) => T;
/**
 * filter if true :`data instanceof instance`
 * @param type
 * @example
 *  class Wrapper {
 *    value: number
 *    constructor(value: number) {
 *      this.value = value
 *    }
 *  }
 *
 *  createStream(new Wrapper(1)})
 *    .chain(
 *      map(it => ({ ...it, value: 100 })),
 *      asInstanceOf(Wrapper)
 *      ..
 *    )
 */
export declare const asInstanceOf: <T>(instance: new (...args: any[]) => T) => <U>(data: U) => T;
/**
 * stop further processing
 * @example
 *  createStream(1)
 *    .chain(
 *      which(
 *        num => num > 2,
 *        stop(),
 *        tap(num => console.log(num))
 *      ),
 *      ..
 *    )
 */
export declare const stop: () => <T>(_: T) => T;
