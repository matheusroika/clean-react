import { RemoteLoadSurveys } from '@/data/useCases/loadSurveys/remoteLoadSurveys'
import { HttpStatusCode } from '@/data/protocols/http'
import { AccessDeniedError, UnexpectedError } from '@/domain/errors'
import { mockGetStorage, mockHttpClient } from '../../mocks'
import { mockSurvey } from '@/../tests/domain/mocks'
import { mockHeaders } from '@/../tests/infra/mocks/mockAxios'
import type { Survey } from '@/domain/models/Survey'
import type { HttpClient } from '@/data/protocols/http'
import type { GetStorage } from '@/data/protocols/cache'

type Sut = {
  sut: RemoteLoadSurveys
  httpClientStub: HttpClient<undefined, any, Survey[]>
  getStorageStub: GetStorage
}

const url = 'any_url'
const makeSut = (): Sut => {
  const httpClientStub = mockHttpClient<undefined, any, Survey[]>()
  const getStorageStub = mockGetStorage()
  const sut = new RemoteLoadSurveys(url, httpClientStub, getStorageStub)
  return {
    sut,
    httpClientStub,
    getStorageStub
  }
}

const testGetStorageReturn = async (sut: RemoteLoadSurveys, getStorage: GetStorage, returnValue: any): Promise<void> => {
  jest.spyOn(getStorage, 'get').mockReturnValueOnce(returnValue)
  const promise = sut.loadAll()
  await expect(promise).rejects.toThrow(new AccessDeniedError())
}

describe('Remote Load Surveys', () => {
  test('Should call HttpClient with correct values', async () => {
    const { sut, httpClientStub } = makeSut()
    const getSpy = jest.spyOn(httpClientStub, 'request')
    await sut.loadAll()
    expect(getSpy).toBeCalledWith({ url, method: 'get', headers: mockHeaders() })
  })

  test('Should throw AccessDeniedError if HttpClient returns 403', async () => {
    const { sut, httpClientStub } = makeSut()
    jest.spyOn(httpClientStub, 'request').mockResolvedValueOnce({ statusCode: HttpStatusCode.forbidden })
    const promise = sut.loadAll()
    await expect(promise).rejects.toThrow(new AccessDeniedError())
  })

  test('Should throw UnexpectedError if HttpClient returns 404', async () => {
    const { sut, httpClientStub } = makeSut()
    jest.spyOn(httpClientStub, 'request').mockResolvedValueOnce({ statusCode: HttpStatusCode.notFound })
    const promise = sut.loadAll()
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should throw UnexpectedError if HttpClient returns 500', async () => {
    const { sut, httpClientStub } = makeSut()
    jest.spyOn(httpClientStub, 'request').mockResolvedValueOnce({ statusCode: HttpStatusCode.serverError })
    const promise = sut.loadAll()
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should return a Survey list if HttpClient returns 200', async () => {
    const { sut, httpClientStub } = makeSut()
    const body = [mockSurvey()]
    jest.spyOn(httpClientStub, 'request').mockResolvedValueOnce({
      statusCode: HttpStatusCode.ok,
      body
    })
    const surveys = await sut.loadAll()
    expect(surveys).toEqual(body)
  })

  test('Should return an empty Survey list if HttpClient returns 204', async () => {
    const { sut, httpClientStub } = makeSut()
    jest.spyOn(httpClientStub, 'request').mockResolvedValueOnce({
      statusCode: HttpStatusCode.noContent
    })
    const surveys = await sut.loadAll()
    expect(surveys).toEqual([])
  })

  test('Should call GetStorage with correct key', async () => {
    const { sut, getStorageStub } = makeSut()
    const getSpy = jest.spyOn(getStorageStub, 'get')
    await sut.loadAll()
    expect(getSpy).toHaveBeenCalledWith('account')
  })

  test('Should throw AccessDeniedError if GetStorage returns invalid account', async () => {
    const { sut, httpClientStub, getStorageStub } = makeSut()
    jest.spyOn(httpClientStub, 'request').mockImplementation(async (params) => {
      if (!params.headers) return { statusCode: HttpStatusCode.forbidden }
      return { statusCode: HttpStatusCode.ok }
    })
    await testGetStorageReturn(sut, getStorageStub, { accessToken: 'A', email: 'A' })
    await testGetStorageReturn(sut, getStorageStub, { accessToken: 'A', name: 'A' })
    await testGetStorageReturn(sut, getStorageStub, { name: 'A', email: 'A' })
    await testGetStorageReturn(sut, getStorageStub, undefined)
  })
})
