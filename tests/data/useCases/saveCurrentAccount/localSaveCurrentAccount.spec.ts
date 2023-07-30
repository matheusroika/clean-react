import { LocalSaveCurrentAccount } from '@/data/useCases/saveCurrentAccount/localSaveCurrentAccount'
import { UnexpectedError } from '@/domain/errors'
import { mockSetStorage } from '../../mocks'
import { mockAccount } from '@/../tests/domain/mocks'
import type { SetStorage } from '@/data/protocols/local/setStorage'

type Sut = {
  sut: LocalSaveCurrentAccount
  setStorageStub: SetStorage
}

const makeSut = (): Sut => {
  const setStorageStub = mockSetStorage()
  const sut = new LocalSaveCurrentAccount(setStorageStub)
  return {
    sut,
    setStorageStub
  }
}

describe('Local Save Access Token', () => {
  test('Should call SetStorage with correct value', async () => {
    const { sut, setStorageStub } = makeSut()
    const setSpy = jest.spyOn(setStorageStub, 'set')
    await sut.save(mockAccount())
    expect(setSpy).toHaveBeenCalledWith('account', JSON.stringify(mockAccount()))
  })

  test('Should throw if accessToken is falsy', async () => {
    const { sut } = makeSut()
    const promise = sut.save(undefined)
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should throw if SetStorage throws', async () => {
    const { sut, setStorageStub } = makeSut()
    jest.spyOn(setStorageStub, 'set').mockImplementationOnce(() => { throw new Error() })
    const promise = sut.save(mockAccount())
    await expect(promise).rejects.toThrow(new Error())
  })
})
