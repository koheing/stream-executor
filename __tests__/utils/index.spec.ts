import { map, createStream, tap, filter } from '../../src'

describe('map', () => {
  it('can map', () => {
    const result = createStream(1)
      .chain(map((num) => num + 10))
      .execute()
    expect(result).toEqual(11)
  })
})

describe('tap', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('can tap', () => {
    const spyConsole = jest.spyOn(console, 'log')
    const result = createStream(1)
      .chain(tap((num) => console.log(num)))
      .execute()
    expect(result).toEqual(1)
    expect(spyConsole.mock.calls[0][0]).toEqual(1)
  })
})

describe('filter', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('return undefined', () => {
    const result = createStream(1)
      .chain(
        map((it) => it + 9),
        filter((it) => it > 10),
        map((_) => 100)
      )
      .execute()
    expect(result).toEqual(10)
    expect(result).not.toEqual(100)
  })

  it('return data', () => {
    const result = createStream(1)
      .chain(
        map((it) => it + 9),
        filter((it) => it <= 10),
        map((_) => 100)
      )
      .execute()
    expect(result).toEqual(100)
  })
})
