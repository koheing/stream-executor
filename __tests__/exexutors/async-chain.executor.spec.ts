import { AsyncChainExecutor } from '../../src/executors/async-chain.executor'

describe('AsyncChainExecutor', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('async chain execute: promise execute', async () => {
    const chain = new AsyncChainExecutor({ value: 1 })
    const result = await chain
      .stream(
        async (it) => {

          const result = await it
          result.value += 10
          return Promise.resolve(result.value.toString())
        },
        async (it) => {
          const value = await it
          const isString = typeof value === 'string' ? true : false
          return Promise.resolve(isString)
        },
        async (it) => {
          const value = await it
          return !value ? 'end' : undefined
        },
        async (it) => {
          const value = await it
          const isString = typeof value === 'string' ? true : false
          return Promise.resolve(isString)
        }
      )
      .execute()
    expect(result).toBeUndefined()
  })

  it('async chain execute: initialValue is correct', () => {
    const chain = new AsyncChainExecutor(1)

    expect(chain.initialValue).toEqual(1)
  })

  it('chain execute: failured, default errorHandling', async () => {
    const spyConsole = jest.spyOn(console, 'error')
    const chain = new AsyncChainExecutor({ value: 1 })
    const result = await chain
      .stream(
        async (it) => {
          const result = await it
          result.value += 10
          return result
        },
        (_) => {
          throw new Error('chain execute: failured, default errorHandling')
        }
      )
      .execute()
    expect(spyConsole).toHaveBeenCalled()
  })

  it('async chain execute: failured, custom errorHandling', async () => {
    const chain = new AsyncChainExecutor({ value: 1 })
    const mockOnError = jest.fn()
    const result = await chain
      .stream(
        async (it) => {
          const result = await it
          result.value += 10
          return result
        },
        (_) => {
          throw new Error('chain execute: failured, default errorHandling')
        }
      )
      .execute(mockOnError)
    expect(mockOnError).toHaveBeenCalled()
  })

})