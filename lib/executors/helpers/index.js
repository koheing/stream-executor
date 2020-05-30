"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stop = exports.asInstanceOf = exports.asTypeOf = exports.ifRight = exports.which = exports.filter = exports.tap = exports.map = void 0;
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
exports.map = (mapper) => (data) => {
    const mapped = mapper(data);
    return mapped;
};
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
exports.tap = (tapper) => (data) => {
    tapper(data);
    return data;
};
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
exports.filter = (predicate) => (data) => {
    const result = (predicate(data) ? data : undefined);
    return result;
};
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
exports.which = (predicate, right, left) => (data) => {
    const result = predicate(data) ? right(data) : left(data);
    return result;
};
/**
 * if `predicate` is true,`right` called
 * @param predicate (data: T) => boolean
 * @param right (data: T) => void
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
exports.ifRight = (predicate, right) => (data) => {
    if (predicate(data)) {
        right(data);
    }
    return data;
};
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
exports.asTypeOf = (type) => (data) => (typeof data === type ? data : undefined);
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
exports.asInstanceOf = (instance) => (data) => (data instanceof instance ? data : undefined);
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
exports.stop = () => (_) => undefined;
