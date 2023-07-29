import { LocalSaveAccessToken } from '@/data/useCases/saveAccessToken/localSaveAccessToken'
import { UnexpectedError } from '@/domain/errors'
import { mockSetStorage } from '../../mocks'
import type { SetStorage } from '@/data/protocols/local/setStorage'

type Sut = {
  sut: LocalSaveAccessToken
  setStorageStub: SetStorage
}

const makeSut = (): Sut => {
  const setStorageStub = mockSetStorage()
  const sut = new LocalSaveAccessToken(setStorageStub)
  return {
    sut,
    setStorageStub
  }
}

describe('Local Save Access Token', () => {
  test('Should call SetStorage with correct value', async () => {
    const { sut, setStorageStub } = makeSut()
    const setSpy = jest.spyOn(setStorageStub, 'set')
    await sut.save('any_token')
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
    const promise = sut.save('any_token')
    await expect(promise).rejects.toThrow(new Error())
  })
})
