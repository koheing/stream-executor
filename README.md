# stream-executor
- functional stream programming library
- This library is inspired by [RxJS](https://github.com/ReactiveX/rxjs)

# Usage

## 1. chain stream (like RxJS)

### Not using stream-executor 
```ts
let isSucceeded = false

const initialValue = 1
let value = 0

if (value >= 0) {
  value = initialValue * 10
}

if (value > 1) {
  isSucceeded = true
} else {
  console.log('not succeeded')
}

if (value < 10) {
  return
}
const result = value

console.log(isSucceeded) // true
console.log(result)      // 10
```

###  using stream-executor
```ts
import { createStream, map, which, filter, tap } from 'stream-executor'
let isSucceeded = false

const chainResult = createStream(1)
  .chain(
    map((it) => it * 10),
    which(
      (it) => it > 1,
      tap((it) => (isSucceeded = true)),
      tap((it) => console.log('not succeeded'))
    ),
    filter((it) => it >= 10)
  )
  .execute()

console.log(isSucceeded) // true
console.log(chainResult) // 10
```

## 2. batch stream (like `when` in Kotlin)

### not using stream-executor 
```ts
let isLoading: boolean
const mammal = { no: 999, name: 'UNKNOWN', type: 'bird' }

isLoading = true

if (mammal.type === 'bird') {
  calculateSize(mammal)
} else {
  console.log('Not Bird')
}

if (mammal.type == 'bird' && mammal.name !== 'UNKNOWN') {
  console.log('maybe new species')
  registerDB(mammal)
}

isLoading = false

console.log('end')
console.log(isLoading)    // false
```

###  using stream-executor 
```ts
import { createStream, ifRight, which } from 'stream-executor'

const mammal = { no: 999, name: 'UNKNOWN', type: 'bird' }
let isLoading = true

createStream(mammal)
  .batch(
    (_) => (isLoading = true),
    which(
      ({ type }) => type === 'bird',
      (it) => calculateSize(it),
      (_) => console.log('Not Bird')
    ),
    ifRight(
      ({ type, name }) => type === 'bird' && name === 'UNKNOWN',
      (_) => registerDB(mammal)
    ),
    (_) => (isLoading = false),
    (_) => console.log('end')
  )
  .execute()

console.log(isLoading)    // false
```

# Important
## 1. about `createStream`
  - The argument of createStream is not deep copied. use `deepCopy` method if you'd like to do deep copy, please.
  ```ts
  import { createStream, tap, deepCopy } from 'stream-executor'
  const input = { value: 1 }
  const result = createStream(input)
    .chain(tap((it) => (it.value += 9)))

  console.log(input) // { value: 10 }
  console.log(result) // { value: 10 }

  const input2 = { value: 1 }
  const result2 = createStream(deepCopy(input2))
    .chain(tap((it) => (it.value += 9)))

  console.log(input2) // { value: 1 }
  console.log(result2) // { value: 10 }
  ```
## 2. about `deepCopy`
  - getter and function in object are removed.
  ```ts
  import { createStream, tap, deepCopy } from 'stream-executor'
  class Wrapper<T> {
    value: T
    constructor(value: T) {
      this.value = value
    }
    get doubledValue() {
      return this.value * 2
    }
    hello() {
      console.log('world')
    }
  }
  const input = new Wrapper(1)
  const result = createStream(deepCopy(input))
    .chain(tap((it) => (it.value += 9)))

  console.log(input)  // Wrapper{ value: 1, doubledValue: 2, __proto__: { hello: () => console.log('world') } }
  console.log(result) // { value: 10, __proto__: {} }
  ``` 
## 3. about `createStream().chain()`:
  - further process is not called if `undefined` returned
  ```ts
  import { createStream, tap, filter, map } from 'stream-executor'
  const result = createStream(1)
    .chain(
      tap((it) => console.log(it)), // 1
      filter((it) => it > 2),       // return undefined
      map((it) => it + 9)           // not called
    )
    .execute()
  console.log(result) // undefined
  ``` 

## 4. abount the arguments of execute()
  - set the arguments of execute method if you'd like to customize error handling, please
  ```ts
  let error: any
  createStream(1)
    .batch(
      (it) => console.log(it),
      ..
    )
    .execute((err: any) => {
      console.error(error)
      error = err
    })
  ```

# Utils
## helper methods and those descriptions in createStream are
  ### 1. [map](./src/executors/helpers/index.ts#L1)
  ### 2. [tap](./src/executors/helpers/index.ts#L16)
  ### 3. [filter](./src/executors/helpers/index.ts#L31)
  ### 4. [which](./src/executors/helpers/index.ts#L46)
  ### 5. [ifRight](./src/executors/helpers/index.ts#L72)
  ### 6. [asTypeOf](./src/executors/helpers/index.ts#L97)
  ### 7. [asInstanceOf](./src/executors/helpers/index.ts#L120)
  ### 8. [stop](./src/executors/helpers/index.ts#L142)
