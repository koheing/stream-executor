/**
 * This method do deep copy property, excluded `Function` and `getter`
 * @param object any
 */
export declare const deepCopy: <T>(object: T) => T extends any[] ? T : T extends Record<string, unknown> ? Pick<T, Exclude<keyof T, { [K in keyof T]: T[K] extends Function ? K : never; }[keyof T]>> : T;
