export declare type PickKeyValue<T, V> = {
    [K in keyof T]: T[K] extends V ? K : never;
}[keyof T];
declare type OmitGetterAndFunction<T> = Omit<T, PickKeyValue<T, Function>>;
export declare type WithoutGetterAndFunction<T> = T extends Array<any> ? T : T extends {
    [key: string]: any;
} ? OmitGetterAndFunction<T> : T;
export declare type Action<T, U> = (value: T) => U;
export {};
