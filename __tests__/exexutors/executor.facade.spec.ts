import { createStream, tap, StreamExecutorFacade } from '../../src/executors'
import { ChainExecutor } from '../../src/executors/chain.executor'
import { ParallelExecutor } from '../../src/executors/parallel.executor'

describe('StreamExecutorFacade', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('ChainExecutor called', () => {
    const executor = createStream(1).chain((_) => 10)
    const result = executor.execute()

    expect(result).toEqual(10)
    expect(executor).toBeInstanceOf(ChainExecutor)
  })

  it('ParallelExecutor called', () => {
    let num = 0
    const executor = createStream(1).parallel((it) => {
      num = it
    })
    executor.execute()

    expect(num).toEqual(1)
    expect(executor).toBeInstanceOf(ParallelExecutor)
  })

  it('do deepCopy', () => {
    const input = { value: 1, fruitNames: ['pine', 'apple'] }
    const executor = createStream(input).chain(
      tap((it) => {
        it.value += 9
        it.fruitNames.push('orange')
      })
    )
    const result = executor.execute()

    expect(result.value).toEqual(10)
    expect(result.fruitNames.length).toEqual(3)

    expect(input.value).toEqual(1)
    expect(input.fruitNames.length).toEqual(2)
  })

  it('do not deepCopy', () => {
    const input = { value: 1, fruitNames: ['pine', 'apple'] }
    const executor = createStream(input, false).chain(
      tap((it) => {
        it.value += 9
        it.fruitNames.push('orange')
      })
    )
    const result = executor.execute()

    expect(result.value).toEqual(10)
    expect(result.fruitNames.length).toEqual(3)

    expect(input.value).toEqual(10)
    expect(input.fruitNames.length).toEqual(3)
  })
})
