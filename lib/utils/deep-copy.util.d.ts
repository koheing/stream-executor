import { OmitFunction } from '../types';
/**
 * This method do deep copy property, excluded `Function` and `getter`
 * @param object any
 */
export declare const deepCopy: <T>(object: T) => OmitFunction<T>;
