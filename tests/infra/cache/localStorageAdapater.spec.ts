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
  test('Should call localStorage with correct values', async () => {
    const { sut } = makeSut()
    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem')
    await sut.set('any_key', 'any_value')
    expect(setItemSpy).toHaveBeenCalledWith('any_key', 'any_value')
  })
})
