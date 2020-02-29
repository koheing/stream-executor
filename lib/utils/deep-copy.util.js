"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @param object any
 */
exports.deepCopy = (object) => {
    if (typeof object !== 'object') {
        return object;
    }
    if (object instanceof Array) {
        const newObject = [];
        object.forEach((it) => {
            const _object = exports.deepCopy(it);
            newObject.push(_object);
        });
        return newObject;
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
