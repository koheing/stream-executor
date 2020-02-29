# stream-executor
- This library is inspired by [RxJS](https://github.com/ReactiveX/rxjs)

# Important
1. about createStream
  - Input value, 1st argument, is deep copyed. Set the second argument to false if you do not want to do deep copy.
2. about createStream().chain():
  - further process is not called if `undefined` returned
  - return value is last value before `undefined` returned
  ```ts
  const result = createStream(1)
    .chain(
      tap((it) => console.log(it)), // 1
      filter((it) => it > 2),
      map((it) => it + 9)
    )
    .execute()
  console.log(result) // 1, not 10
  ``` 

# Sample
```ts
import { createStream } from 'stream-executor'

let isSucceeded = true

const chainResult = createStream(1)
  .chain( // like RxJS. `it` is calculated value before current procecss
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

console.log(chainResult) // 11

let currentCount = 0
let isLoading = false
const parallelResult = createStream(1)
  .parallel( // `it` is always 1
    (it) => {
      isLoading = true
    },
    (it) => {
      currentCount = it
    },
    (it) => {
      isLoading = false
    }
  )
  .execute()

console.log(currentCount) // 1
console.log(isLoading)    // false
```
