import { map, createStream, tap } from '../../src'

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
