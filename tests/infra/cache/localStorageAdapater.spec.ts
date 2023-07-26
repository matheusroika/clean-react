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

  test('Should call localStorage.setItem with correct values', async () => {
    const { sut } = makeSut()
    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem')
    const [key, value] = ['any_key', 'any_value']
    await sut.set(key, value)
    expect(setItemSpy).toHaveBeenCalledWith(key, value)
  })

  test('Should throw if localStorage.setItem throws', async () => {
    const { sut } = makeSut()
    jest.spyOn(Storage.prototype, 'setItem').mockImplementationOnce(() => { throw new Error() })
    const promise = sut.set('any_key', 'any_value')
    await expect(promise).rejects.toThrow(new Error())
  })
})
