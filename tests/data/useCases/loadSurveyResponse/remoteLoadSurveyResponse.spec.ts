import { RemoteLoadSurveyResponse } from '@/data/useCases/loadSurveyResponse/remoteLoadSurveyResponse'
import { AccessDeniedError, UnexpectedError } from '@/domain/errors'
import { mockGetStorage, mockHttpGetClient } from '../../mocks'
import { mockSurveyResponse } from '@/../tests/domain/mocks'
import { mockHeaders } from '@/../tests/infra/mocks/mockAxios'
import { type HttpGetClient, HttpStatusCode } from '@/data/protocols/http'
import type { GetStorage } from '@/data/protocols/cache'
import type { Headers } from '@/data/helpers/getHttpGetClientParams'
import type { SurveyResponse } from '@/domain/models/SurveyResponse'

type Sut = {
  sut: RemoteLoadSurveyResponse
  httpGetClientStub: HttpGetClient<Headers, SurveyResponse>
  getStorageStub: GetStorage
}

const url = 'any_url'
const makeSut = (): Sut => {
  const httpGetClientStub = mockHttpGetClient<Headers, SurveyResponse>()
  const getStorageStub = mockGetStorage()
  const sut = new RemoteLoadSurveyResponse(url, httpGetClientStub, getStorageStub)
  return {
    sut,
    httpGetClientStub,
    getStorageStub
  }
}

const testGetStorageReturn = async (sut: RemoteLoadSurveyResponse, getStorage: GetStorage, returnValue: any): Promise<void> => {
  jest.spyOn(getStorage, 'get').mockReturnValueOnce(returnValue)
  const promise = sut.load()
  await expect(promise).rejects.toThrow(new AccessDeniedError())
}

describe('Remote Load Survey Response', () => {
  test('Should call HttpGetClient with correct URL', async () => {
    const { sut, httpGetClientStub } = makeSut()
    const getSpy = jest.spyOn(httpGetClientStub, 'get')
    await sut.load()
    expect(getSpy).toHaveBeenCalledWith({ url, headers: mockHeaders() })
  })

  test('Should throw AccessDeniedError if HttpGetClient returns 403', async () => {
    const { sut, httpGetClientStub } = makeSut()
    jest.spyOn(httpGetClientStub, 'get').mockResolvedValueOnce({ statusCode: HttpStatusCode.forbidden })
    const promise = sut.load()
    await expect(promise).rejects.toThrow(new AccessDeniedError())
  })

  test('Should throw UnexpectedError if HttpGetClient returns 404', async () => {
    const { sut, httpGetClientStub } = makeSut()
    jest.spyOn(httpGetClientStub, 'get').mockResolvedValueOnce({ statusCode: HttpStatusCode.notFound })
    const promise = sut.load()
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should throw UnexpectedError if HttpGetClient returns 500', async () => {
    const { sut, httpGetClientStub } = makeSut()
    jest.spyOn(httpGetClientStub, 'get').mockResolvedValueOnce({ statusCode: HttpStatusCode.serverError })
    const promise = sut.load()
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should return a SurveyResponse if HttpGetClient returns 200', async () => {
    const { sut, httpGetClientStub } = makeSut()
    const body = mockSurveyResponse()
    jest.spyOn(httpGetClientStub, 'get').mockResolvedValueOnce({
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
    const { sut, httpGetClientStub, getStorageStub } = makeSut()
    jest.spyOn(httpGetClientStub, 'get').mockImplementation(async (params) => {
      if (!params.headers) return { statusCode: HttpStatusCode.forbidden }
      return { statusCode: HttpStatusCode.ok }
    })
    await testGetStorageReturn(sut, getStorageStub, { accessToken: 'A', email: 'A' })
    await testGetStorageReturn(sut, getStorageStub, { accessToken: 'A', name: 'A' })
    await testGetStorageReturn(sut, getStorageStub, { name: 'A', email: 'A' })
    await testGetStorageReturn(sut, getStorageStub, undefined)
  })
})
