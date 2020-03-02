declare type PickKeysByType<T, V> = {
    [K in keyof T]: T[K] extends V ? K : never;
}[keyof T];
declare type ArrayOr<T, U> = T extends Array<any> ? T : U;
declare type OrMapObject<T, U> = T extends {
    [key: string]: any;
} ? U : T;
declare type PickFunction<T> = PickKeysByType<T, Function>;
export declare type OmitFunction<T> = ArrayOr<T, OrMapObject<T, Omit<T, PickFunction<T>>>>;
export declare type Action<T, U> = (value: T) => U;
export {};
