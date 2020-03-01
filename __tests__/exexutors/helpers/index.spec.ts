import {
  map,
  createStream,
  tap,
  filter,
  which,
  ifRight,
  asTypeOf,
  asInstanceOf,
  stop
} from '../../../src'

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
    expect(result).toEqual(undefined)
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

describe('which', () => {
  it('right', () => {
    let value = 0
    createStream(1)
      .chain(
        which(
          (it) => it > 0,
          tap((it) => (value = it)),
          tap((_) => (value = 2))
        )
      )
      .execute()

    expect(value).toEqual(1)
  })

  it('left', () => {
    let value = 0
    createStream(1)
      .chain(
        which(
          (it) => it > 1,
          tap((it) => (value = it)),
          tap((_) => (value = 2))
        )
      )
      .execute()

    expect(value).toEqual(2)
  })
})

describe('ifRight', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('right', () => {
    const spyConsole = jest.spyOn(console, 'log')
    createStream(1)
      .chain(
        ifRight(
          (it) => it > 0,
          tap((it) => console.log(it))
        )
      )
      .execute()

    expect(spyConsole).toHaveBeenCalledTimes(1)
    expect(spyConsole.mock.calls[0][0]).toEqual(1)
  })

  it('not right', () => {
    const spyConsole = jest.spyOn(console, 'log')
    const result = createStream(1)
      .chain(
        ifRight(
          (it) => it > 1,
          tap((it) => console.log(it))
        )
      )
      .execute()

    expect(result).toEqual(1)
    expect(spyConsole).not.toHaveBeenCalledTimes(1)
  })
})

describe('asTypeOf', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })
  it('stop further process', () => {
    const spyConsole = jest.spyOn(console, 'log')
    const result = createStream(1)
      .chain(
        map((it) => it as number | string),
        asTypeOf<string>('string'),
        tap((it) => console.log(it))
      )
      .execute()

    expect(spyConsole).not.toHaveBeenCalledTimes(1)
  })

  it('through further process', () => {
    const spyConsole = jest.spyOn(console, 'log')
    const result = createStream(1)
      .chain(
        map((it) => it as number | string),
        asTypeOf<number>('number'),
        tap((it) => console.log(it))
      )
      .execute()

    expect(spyConsole).toHaveBeenCalledTimes(1)
  })
})

describe('asInstanceOf', () => {
  class Wrapper {
    value: number
    constructor(value: number) {
      this.value = value
    }
  }
  afterEach(() => {
    jest.clearAllMocks()
  })
  it('stop further process', () => {
    const spyConsole = jest.spyOn(console, 'log')

    createStream({ value: 1 })
      .chain(
        asInstanceOf(Wrapper),
        tap((it) => console.log(it.value))
      )
      .execute()

    expect(spyConsole).not.toHaveBeenCalledTimes(1)
  })

  it('through further process', () => {
    const spyConsole = jest.spyOn(console, 'log')
    createStream(1)
      .chain(
        map((it) => new Wrapper(it)),
        asInstanceOf(Wrapper),
        tap((it) => console.log(it.value))
      )
      .execute()

    expect(spyConsole).toHaveBeenCalledTimes(1)
  })
})

describe('stop', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('can stop', () => {
    const spyConsole = jest.spyOn(console, 'log')
    createStream(1)
      .chain(
        which(
          (it) => it > 0,
          stop(),
          map((it) => it + 10)
        ),
        tap((it) => console.log(it))
      )
      .execute()

    expect(spyConsole).not.toHaveBeenCalledTimes(1)
  })
})
