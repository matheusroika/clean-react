import { AuthHttpClientDecorator } from '@/main/decorators/authHttpClientDecorator'
import { mockGetStorage, mockHttpRequest } from '../../data/mocks'
import type { GetStorage } from '@/data/protocols/cache'

type Sut = {
  sut: AuthHttpClientDecorator
  getStorageStub: GetStorage
}

const makeSut = (): Sut => {
  const getStorageStub = mockGetStorage()
  const sut = new AuthHttpClientDecorator(getStorageStub)
  return {
    sut,
    getStorageStub
  }
}

describe('Auth Http Client Decorator', () => {
  test('Should call GetStorage with correct value', async () => {
    const { sut, getStorageStub } = makeSut()
    const getSpy = jest.spyOn(getStorageStub, 'get')
    await sut.request(mockHttpRequest())
    expect(getSpy).toHaveBeenCalledWith('account')
  })
})
