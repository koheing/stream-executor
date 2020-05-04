declare type PickKeysByType<T, V> = {
    [K in keyof T]: T[K] extends V ? K : never;
}[keyof T];
declare type ArrayOr<T, U> = T extends Array<any> ? T : U;
declare type OrMapObject<T, U> = T extends Record<string, unknown> ? U : T;
declare type PickFunctionKeys<T> = PickKeysByType<T, Function>;
export declare type PromiseOr<T> = T extends Promise<T> ? Promise<T> : T;
export declare type OmitFunction<T> = ArrayOr<T, OrMapObject<T, Omit<T, PickFunctionKeys<T>>>>;
export declare type Action<T, U> = (value: T) => U;
export {};
