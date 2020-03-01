type PickKeyValue<T, V> = {
  [K in keyof T]: T[K] extends V ? K : never
}[keyof T]

type ArrayOr<T, U> = T extends Array<any> ? T : U
type OrMapObject<T, U> = T extends { [key: string]: any } ? U : T
type PickFunction<T> = PickKeyValue<T, Function>

export type OmitFunction<T> = ArrayOr<
  T,
  OrMapObject<T, Omit<T, PickFunction<T>>>
>

export type Action<T, U> = (value: T) => U
