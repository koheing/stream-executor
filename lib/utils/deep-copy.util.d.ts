import { OmitGetterAndFunction } from '../types';
/**
 * @param object any
 */
export declare const deepCopy: <T>(object: T) => OmitGetterAndFunction<T>;
