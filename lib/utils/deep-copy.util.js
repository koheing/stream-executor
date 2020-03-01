"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * This method do deep copy property, excluded `Function` and `getter`
 * @param object any
 */
exports.deepCopy = (object) => {
    if (typeof object !== 'object') {
        return object;
    }
    if (object instanceof Array) {
        return object.map((it) => exports.deepCopy(it));
    }
    const newObject = { ...object };
    Object.keys(object)
        .filter((key) => typeof object[key] === 'object')
        .forEach((key) => {
        const value = object[key];
        if (value instanceof Array) {
            const _object = value.map((it) => exports.deepCopy(it));
            newObject[key] = _object;
            return;
        }
        const _object = exports.deepCopy(value);
        newObject[key] = _object;
    });
    return newObject;
};
