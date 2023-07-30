import { LocalStorageAdapter } from '@/infra/cache/localStorageAdapter'

type Sut = {
  sut: LocalStorageAdapter
}

const makeSut = (): Sut => {
  const sut = new LocalStorageAdapter()
  return {
    sut
  }
}

describe('Local Storage Adapter', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  test('Should call localStorage.setItem with correct values', () => {
    const { sut } = makeSut()
    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem')
    const [key, value] = ['any_key', 'any_value']
    sut.set(key, value)
    expect(setItemSpy).toHaveBeenCalledWith(key, JSON.stringify(value))
  })

  test('Should throw if localStorage.setItem throws', () => {
    const { sut } = makeSut()
    jest.spyOn(Storage.prototype, 'setItem').mockImplementationOnce(() => { throw new Error() })
    expect(() => { sut.set('any_key', 'any_value') }).toThrow(new Error())
  })
})
