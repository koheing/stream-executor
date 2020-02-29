# stream-executor
- functional stream programming library
- This library is inspired by [RxJS](https://github.com/ReactiveX/rxjs)

# Important
## 1. about `createStream`
  - Input value, 1st argument, is deep copyed. Set the second argument to false if you do not want to do deep copy.
  ```ts
  import { createStream, tap } from 'stream-executor'
  const input = { value: 1 }
  const result = createStream(input)
    .chain(tap((it) => (it.value += 9)))

  console.log(input) // { value: 1 }
  console.log(result) // { value: 10 }

  const result2 = createStream(input, false)
    .chain(tap((it) => (it.value += 9)))

  console.log(input) // { value: 10 }
  console.log(result2) // { value: 10 }
  ```
## 2. about `createStream().chain()`:
  - further process is not called if `undefined` returned
  - return value is last value before `undefined` returned
  ```ts
  import { createStream, tap, filter, map } from 'stream-executor'
  const result = createStream(1)
    .chain(
      tap((it) => console.log(it)), // 1
      filter((it) => it > 2),
      map((it) => it + 9)
    )
    .execute()
  console.log(result) // 1, not 10
  ``` 

# Usage

## 1. chain stream

### Not using stream-executor 
```ts
let isSucceeded = false

const value = 1
const value2 = 1 + 10
let value3: string | number
if (value2 < 10) {
  value3 = value3.toString()
} else {
  value3 = value2
}

if (typeof value3 !== 'number') {
  return
}

if (value3 > 0) {
  isSucceeded = true
} else {
  return
}

if (value3 <= 10) {
  return
}
const result = value3

console.log('end')
console.log(isSucceeded) // true
console.log(result) // 11
```

###  using stream-executor 
```ts
import { createStream, map, asTypeOf, which, filter, tap } from 'stream-executor'
let isSucceeded = false

const chainResult = createStream(1)
  .chain(
    map((it) => it + 10),
    map((it) => it < 10 ? it.toString() : it),
    asTypeOf<number>('number'),
    which(
      (it) => it > 0,
      tap((it) => {
        isSucceeded = true
      }),
      stop()
    ),
    filter((it) => it > 10),
    tap((it) => console.log('end'))
  )
  .execute()

console.log(isSucceeded) // true
console.log(chainResult) // 11
```

## 2. parallel stream

### not using stream-executor 
```ts
let currentCount = 0
let isLoading = false

const setCount = (value: number) => {
  isLoading = true
  currentCount = value
  isLoading = false
}

setCount(1)
console.log(currentCount) // 1
console.log(isLoading)    // false
```

###  using stream-executor 
```ts
import { createStream } from 'stream-executor'
let currentCount = 0
let isLoading = false

const setCount = (value: number) => createStream(value)
  .parallel(
    (it) => (isLoading = true),
    (it) => (currentCount = it),
    (it) => (isLoading = false)
  )
  .execute()

setCount(1)
console.log(currentCount) // 1
console.log(isLoading)    // false
```
