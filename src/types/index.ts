export type PickKeyValue<T, V> = {
  [K in keyof T]: T[K] extends V ? K : never
}[keyof T]

type OmitGetterAndFunction<T> = Omit<T, PickKeyValue<T, Function>>

export type WithoutGetterAndFunction<T> = T extends Array<any>
  ? T
  : T extends { [key: string]: any }
  ? OmitGetterAndFunction<T>
  : T

export type Action<T, U> = (value: T) => U
