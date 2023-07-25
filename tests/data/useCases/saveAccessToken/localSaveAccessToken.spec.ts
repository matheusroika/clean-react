import { LocalSaveAccessToken } from '@/data/useCases/saveAccessToken/localSaveAccessToken'
import { mockSetStorage } from '../../mocks/mockSetStorage'
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
})
