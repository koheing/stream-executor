import { OmitFunction } from '../types'

/**
 * This method do deep copy property, excluded `Function` and `getter`
 * @param object any
 */
export const deepCopy = <T>(object: T): OmitFunction<T> => {
  if (typeof object !== 'object') {
    return object as OmitFunction<T>
  }

  if (object instanceof Date) {
    return new Date(object) as any
  }

  if (object instanceof Array) {
    return (object.map((it) => deepCopy(it)) as unknown) as OmitFunction<T>
  }

  const newObject: Record<string, any> = { ...object }
  Object.keys(object)
    .filter((key) => typeof (object as Record<string, any>)[key] === 'object')
    .forEach((key) => {
      const value = (object as any)[key]
      if (value instanceof Array) {
        const _object = value.map((it) => deepCopy(it))
        newObject[key] = _object
        return
      }

      const _object = deepCopy(value)
      newObject[key] = _object
    })
  return (newObject as unknown) as OmitFunction<T>
}
