type PickKeysByType<T, V> = {
  [K in keyof T]: T[K] extends V ? K : never
}[keyof T]

type ArrayOr<T, U> = T extends Array<any> ? T : U
type OrMapObject<T, U> = T extends Record<string, unknown> ? U : T
type PickFunctionKeys<T> = PickKeysByType<T, Function>

export type OmitFunction<T> = ArrayOr<
  T,
  OrMapObject<T, Omit<T, PickFunctionKeys<T>>>
>

export type Action<T, U> = (value: T) => U
