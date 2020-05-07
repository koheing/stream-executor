import { BatchExecutor } from '../../src/executors/batch.executor'

describe('BatchExecutor', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('batch execute: succeeded', () => {
    const parallel = new BatchExecutor('apple')
    let favoriteFruit = ''
    const fruitNames: string[] = []
    parallel
      .stream(
        (it) => {
          favoriteFruit = it
        },
        (it) => {
          fruitNames.push(it)
        }
      )
      .execute()

    expect(favoriteFruit).toEqual('apple')
    expect(fruitNames.length).toEqual(1)
    expect(fruitNames[0]).toEqual('apple')
  })

  it('batch execute: failured, default errorHandling', () => {
    const spyConsole = jest.spyOn(console, 'error')
    const parallel = new BatchExecutor('apple')
    let favoriteFruit = ''
    const fruitNames: string[] = []
    parallel
      .stream(
        (it) => {
          favoriteFruit = it
        },
        (_) => {
          throw new Error('multi execute: failured')
        },
        (it) => {
          fruitNames.push(it)
        }
      )
      .execute()

    expect(favoriteFruit).toEqual('apple')
    expect(spyConsole).toHaveBeenCalled()
  })

  it('batch execute: failured, custom errorHandling', () => {
    const parallel = new BatchExecutor('apple')
    let favoriteFruit = ''
    const fruitNames: string[] = []
    const mockOnError = jest.fn()
    parallel
      .stream(
        (it) => {
          favoriteFruit = it
        },
        (_) => {
          throw new Error('multi execute: failured')
        },
        (it) => {
          fruitNames.push(it)
        }
      )
      .execute(mockOnError)

    expect(favoriteFruit).toEqual('apple')
    expect(mockOnError).toHaveBeenCalled()
  })

  it('batch execute: initialValue is correct', () => {
    const batch = new BatchExecutor('apple')
    expect(batch.initialValue).toEqual('apple')
  })
})
