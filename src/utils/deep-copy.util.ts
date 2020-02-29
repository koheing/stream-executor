/**
 * @param object any
 */
export function deepCopy<T>(object: T): T {
  if (typeof object !== 'object') {
    return object
  }

  if (object instanceof Array) {
    const newObject: Array<any> = []
    object.forEach((it) => {
      const _object = deepCopy(it)
      newObject.push(_object)
    })
    return (newObject as unknown) as T
  }

  const newObject: { [key: string]: any } = { ...object }
  Object.keys(object)
    .filter((key) => typeof (object as any)[key] === 'object')
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
  return (newObject as unknown) as T
}
