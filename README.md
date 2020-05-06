# stream-executor
[![MIT License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](LICENSE)
![Main](https://github.com/nor-ko-hi-jp/stream-executor/workflows/Main/badge.svg)
[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/nor-ko-hi-jp/stream-executor/issues)

- functional stream programming library
- This library is inspired by [RxJS](https://github.com/ReactiveX/rxjs)
- This library is effective for
  - managing and reusing processes in actions in fine-grained
  - the processing in the action becomes complicated
  - asynchronous execution sequentially 

```
npm i stream-executor
```

# Usage

## 1. chain stream (like RxJS)
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


## 2. batch stream (like switch without break)

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
      (mammal) => registerDB(mammal)
    ),
    (_) => (isLoading = false),
    (_) => console.log('end')
  )
  .execute()

console.log(isLoading)    // false
```

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


# Important
## 1. About `createStream`
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
## 2. About `deepCopy`
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
## 3. About `createStream().chain()`:
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

## 4. Use asynchronous execution in `createStream().chain()`:
  - call `asAsync` method before `execute` method
  ```ts
  import { createStream, tap, map } from 'stream-executor'
  const result = await createStream(1)
    .chain(
      tap((it) => console.log(it)),             // 1
      map(async (it) => await callAPI(it)),    
      map(async (it) => parseToModel(await it)) // Record<string, any>
    )
    .asAsync()
    .execute()
  console.log(result) // Record<string, any>
  ``` 

## 5. Abount the arguments of execute()
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

## 6. Replace `chain` or `batch` executor

# Utils
## helper methods and those descriptions in createStream are
1. [map](./src/executors/helpers/index.ts#L1)
2. [tap](./src/executors/helpers/index.ts#L16)
3. [filter](./src/executors/helpers/index.ts#L31)
4. [which](./src/executors/helpers/index.ts#L46)
5. [ifRight](./src/executors/helpers/index.ts#L72)
6. [asTypeOf](./src/executors/helpers/index.ts#L97)
7. [asInstanceOf](./src/executors/helpers/index.ts#L120)
8. [stop](./src/executors/helpers/index.ts#L142)
