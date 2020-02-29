import { ChainExecutor } from '../../src/executors/chain.executor'

describe('ChainExecutor', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('chain execute: succeeded', () => {
    const chain = new ChainExecutor({ value: 1 })
    const result = chain
      .stream(
        (it) => {
          it.value += 10
          return it
        },
        (it) => it.value.toString()
      )
      .execute()

    expect(result).toEqual('11')
  })

  it('chain execute: stop process in the middle because of return `undefined`', () => {
    const chain = new ChainExecutor({ value: 1 })
    const result = chain
      .stream(
        (it) => {
          it.value += 10
          return it
        },
        (it) => (it.value > 20 ? it : undefined),
        (it) => {
          if (it) {
            it.value.toString()
          }
        }
      )
      .execute()

    expect(result).toEqual({ value: 11 })
  })

  it('chain execute: failured, default errorHandling', () => {
    const spyConsole = jest.spyOn(console, 'error')
    const chain = new ChainExecutor({ value: 1 })
    const result = chain
      .stream(
        (it) => {
          it.value += 10
          return it
        },
        (_) => {
          throw new Error('chain execute: failured, default errorHandling')
        }
      )
      .execute()
    expect(spyConsole).toHaveBeenCalled()
  })

  it('chain execute: failured, custom errorHandling', () => {
    const chain = new ChainExecutor({ value: 1 })
    const mockOnError = jest.fn()
    const result = chain
      .stream(
        (it) => {
          it.value += 10
          return it
        },
        (_) => {
          throw new Error('chain execute: failured, default errorHandling')
        }
      )
      .execute(mockOnError)
    expect(mockOnError).toHaveBeenCalled()
  })
})
