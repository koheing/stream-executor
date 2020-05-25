import { deepCopy } from '../../src/utils'

describe('deepCopy', () => {
  it('return not object if input isnot object', () => {
    const result = deepCopy(1)
    expect(result).toEqual(1)
  })

  it('return array if input is array', () => {
    const input = [1, 2, 3, 4]
    const result = deepCopy(input)
    result.push(5)
    expect(input.length).toEqual(4)
    expect(result.length).toEqual(5)
  })

  it('return object if input object (not array)', () => {
    const input = {
      no: 1,
      fruitNames: ['pine', 'apple'],
      fruitPrices: [220, 150],
      description: {
        important: 'important',
        warning: 'warning',
      },
    }

    const result = deepCopy(input)
    result.no = 2
    result.fruitPrices.push(300)
    result.fruitNames.push('orange')
    result.description.important = 'warning'

    expect(input.no).toEqual(1)
    expect(result.no).toEqual(2)
    expect(input.fruitPrices.length).toEqual(2)
    expect(result.fruitPrices.length).toEqual(3)
    expect(input.fruitNames.length).toEqual(2)
    expect(result.fruitNames.length).toEqual(3)
    expect(input.description.important).toEqual('important')
    expect(result.description.important).toEqual('warning')
  })

  it('return date', () => {
    const now = new Date()
    const value = deepCopy({ value: now })
    expect(value.value.toLocaleTimeString()).toEqual(now.toLocaleTimeString())
  })
})
