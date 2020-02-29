# stream-executor
- This library is inspired by [RxJS](https://github.com/ReactiveX/rxjs)

# Sample
```ts
import { createStream } from 'stream-executor'

let isSucceeded = true

const chainResult = createStream(1)
  .chain( // like RxJS. `it` is calculated value before current procecss
    map((it) => it + 10),
    map((it) => it < 10 ? it.toString() : it),
    asType<number>('number'),
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
