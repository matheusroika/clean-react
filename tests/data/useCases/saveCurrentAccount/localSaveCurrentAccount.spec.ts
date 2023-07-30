import { LocalSaveCurrentAccount } from '@/data/useCases/saveCurrentAccount/localSaveCurrentAccount'
import { UnexpectedError } from '@/domain/errors'
import { mockSetStorage } from '../../mocks'
import type { SetStorage } from '@/data/protocols/local/setStorage'
import { mockAccount } from '@/../tests/domain/mocks'

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
    expect(setSpy).toHaveBeenCalledWith('accessToken', 'any_token')
  })

  test('Should throw if accessToken is falsy', async () => {
    const { sut } = makeSut()
    const promise = sut.save(undefined)
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should throw if SetStorage throws', async () => {
    const { sut, setStorageStub } = makeSut()
    jest.spyOn(setStorageStub, 'set').mockRejectedValueOnce(new Error())
    const promise = sut.save(mockAccount())
    await expect(promise).rejects.toThrow(new Error())
  })
})
