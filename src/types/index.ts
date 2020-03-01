export type PickKeyValue<T, V> = {
  [K in keyof T]: T[K] extends V ? K : never
}[keyof T]

export type OmitFunction<T> = T extends Array<any>
  ? T
  : T extends { [key: string]: any }
  ? Omit<T, PickKeyValue<T, Function>>
  : T

export type Action<T, U> = (value: T) => U
