import { createStream } from '../../src/executors'
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
})
