import { AuthHttpClientDecorator } from '@/main/decorators/authHttpClientDecorator'
import { mockGetStorage, mockHttpClient, mockHttpRequest } from '../../data/mocks'
import { mockHeaders } from '../../infra/mocks/mockAxios'
import type { GetStorage } from '@/data/protocols/cache'
import type { HttpClient } from '@/data/protocols/http'

type Sut = {
  sut: AuthHttpClientDecorator
  getStorageStub: GetStorage
  httpClientStub: HttpClient<any, any, any>
}

const makeSut = (): Sut => {
  const getStorageStub = mockGetStorage()
  const httpClientStub = mockHttpClient<any, any, any>()
  const sut = new AuthHttpClientDecorator(getStorageStub, httpClientStub)
  return {
    sut,
    getStorageStub,
    httpClientStub
  }
}

describe('Auth Http Client Decorator', () => {
  test('Should call GetStorage with correct value', async () => {
    const { sut, getStorageStub } = makeSut()
    const getSpy = jest.spyOn(getStorageStub, 'get')
    await sut.request(mockHttpRequest())
    expect(getSpy).toHaveBeenCalledWith('account')
  })

  test('Should not add auth headers if GetStorage returns an invalid value', async () => {
    const { sut, getStorageStub, httpClientStub } = makeSut()
    jest.spyOn(getStorageStub, 'get').mockReturnValueOnce({})
    const requestSpy = jest.spyOn(httpClientStub, 'request')
    const httpRequest = mockHttpRequest({ header: 'any_header' })
    await sut.request(httpRequest)
    expect(requestSpy).toHaveBeenCalledWith(httpRequest)
  })

  test('Should add auth headers if GetStorage returns a valid value', async () => {
    const { sut, httpClientStub } = makeSut()
    const requestSpy = jest.spyOn(httpClientStub, 'request')
    const { headers, ...httpRequest } = mockHttpRequest()
    await sut.request(httpRequest)
    expect(requestSpy).toHaveBeenCalledWith({ ...httpRequest, headers })
  })

  test('Should merge auth headers and headers from request if GetStorage returns a valid value', async () => {
    const { sut, httpClientStub } = makeSut()
    const requestSpy = jest.spyOn(httpClientStub, 'request')
    const httpRequest = mockHttpRequest({ header: 'any_header' })
    await sut.request(httpRequest)
    expect(requestSpy).toHaveBeenCalledWith({
      ...httpRequest,
      headers: {
        header: 'any_header',
        ...mockHeaders()
      }
    })
  })

  test('Should return the same result as HttpGetClient', async () => {
    const { sut } = makeSut()
    const httpRequest = mockHttpRequest({ header: 'any_header' })
    const httpResponse = await sut.request(httpRequest)
    expect(httpResponse).toEqual({ statusCode: 200 })
  })
})
