import { RemoteLoadSurveyResponse } from '@/data/useCases/loadSurveyResponse/remoteLoadSurveyResponse'
import { AccessDeniedError, UnexpectedError } from '@/domain/errors'
import { mockGetStorage, mockHttpClient } from '../../mocks'
import { mockSurveyResponse } from '@/../tests/domain/mocks'
import { mockHeaders } from '@/../tests/infra/mocks/mockAxios'
import { type HttpClient, HttpStatusCode } from '@/data/protocols/http'
import type { GetStorage } from '@/data/protocols/cache'
import type { Headers } from '@/data/helpers/getHttpClientData'
import type { SurveyResponse } from '@/domain/models/SurveyResponse'

type Sut = {
  sut: RemoteLoadSurveyResponse
  httpClientStub: HttpClient<undefined, Headers, SurveyResponse>
  getStorageStub: GetStorage
}

const url = 'any_url'
const makeSut = (): Sut => {
  const httpClientStub = mockHttpClient<undefined, Headers, SurveyResponse>()
  const getStorageStub = mockGetStorage()
  const sut = new RemoteLoadSurveyResponse(url, httpClientStub, getStorageStub)
  return {
    sut,
    httpClientStub,
    getStorageStub
  }
}

const testGetStorageReturn = async (sut: RemoteLoadSurveyResponse, getStorage: GetStorage, returnValue: any): Promise<void> => {
  jest.spyOn(getStorage, 'get').mockReturnValueOnce(returnValue)
  const promise = sut.load()
  await expect(promise).rejects.toThrow(new AccessDeniedError())
}

describe('Remote Load Survey Response', () => {
  test('Should call HttpClient with correct data', async () => {
    const { sut, httpClientStub } = makeSut()
    const requestSpy = jest.spyOn(httpClientStub, 'request')
    await sut.load()
    expect(requestSpy).toHaveBeenCalledWith({ url, method: 'get', headers: mockHeaders() })
  })

  test('Should throw AccessDeniedError if HttpClient returns 403', async () => {
    const { sut, httpClientStub } = makeSut()
    jest.spyOn(httpClientStub, 'request').mockResolvedValueOnce({ statusCode: HttpStatusCode.forbidden })
    const promise = sut.load()
    await expect(promise).rejects.toThrow(new AccessDeniedError())
  })

  test('Should throw UnexpectedError if HttpClient returns 404', async () => {
    const { sut, httpClientStub } = makeSut()
    jest.spyOn(httpClientStub, 'request').mockResolvedValueOnce({ statusCode: HttpStatusCode.notFound })
    const promise = sut.load()
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should throw UnexpectedError if HttpClient returns 500', async () => {
    const { sut, httpClientStub } = makeSut()
    jest.spyOn(httpClientStub, 'request').mockResolvedValueOnce({ statusCode: HttpStatusCode.serverError })
    const promise = sut.load()
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should return a SurveyResponse if HttpClient returns 200', async () => {
    const { sut, httpClientStub } = makeSut()
    const body = mockSurveyResponse()
    jest.spyOn(httpClientStub, 'request').mockResolvedValueOnce({
      statusCode: HttpStatusCode.ok,
      body
    })
    const surveyResponse = await sut.load()
    expect(surveyResponse).toEqual(body)
  })

  test('Should call GetStorage with correct key', async () => {
    const { sut, getStorageStub } = makeSut()
    const getSpy = jest.spyOn(getStorageStub, 'get')
    await sut.load()
    expect(getSpy).toHaveBeenCalledWith('account')
  })

  test('Should throw AccessDeniedError if GetStorage returns invalid account', async () => {
    const { sut, httpClientStub, getStorageStub } = makeSut()
    jest.spyOn(httpClientStub, 'request').mockImplementation(async (data) => {
      if (!data.headers) return { statusCode: HttpStatusCode.forbidden }
      return { statusCode: HttpStatusCode.ok }
    })
    await testGetStorageReturn(sut, getStorageStub, { accessToken: 'A', email: 'A' })
    await testGetStorageReturn(sut, getStorageStub, { accessToken: 'A', name: 'A' })
    await testGetStorageReturn(sut, getStorageStub, { name: 'A', email: 'A' })
    await testGetStorageReturn(sut, getStorageStub, undefined)
  })
})
