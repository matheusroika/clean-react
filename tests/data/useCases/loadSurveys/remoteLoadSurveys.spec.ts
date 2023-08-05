import { RemoteLoadSurveys } from '@/data/useCases/loadSurveys/remoteLoadSurveys'
import { HttpStatusCode } from '@/data/protocols/http'
import { AccessDeniedError, UnexpectedError } from '@/domain/errors'
import { mockGetStorage, mockHttpGetClient } from '../../mocks'
import { mockSurvey } from '@/../tests/domain/mocks'
import { mockHeaders } from '@/../tests/infra/mocks/mockAxios'
import type { Survey } from '@/domain/models/Survey'
import type { HttpGetClient } from '@/data/protocols/http'
import type { GetStorage } from '@/data/protocols/cache'

type Sut = {
  sut: RemoteLoadSurveys
  httpGetClientStub: HttpGetClient<any, Survey[]>
  getStorageStub: GetStorage
}

const url = 'any_url'
const makeSut = (): Sut => {
  const httpGetClientStub = mockHttpGetClient<any, Survey[]>()
  const getStorageStub = mockGetStorage()
  const sut = new RemoteLoadSurveys(url, httpGetClientStub, getStorageStub)
  return {
    sut,
    httpGetClientStub,
    getStorageStub
  }
}

const testGetStorageReturn = async (sut: RemoteLoadSurveys, getStorage: GetStorage, returnValue: any): Promise<void> => {
  jest.spyOn(getStorage, 'get').mockReturnValueOnce(returnValue)
  const promise = sut.loadAll()
  await expect(promise).rejects.toThrow(new AccessDeniedError())
}

describe('Remote Load Surveys', () => {
  test('Should call HttpGetClient with correct values', async () => {
    const { sut, httpGetClientStub } = makeSut()
    const getSpy = jest.spyOn(httpGetClientStub, 'get')
    await sut.loadAll()
    expect(getSpy).toBeCalledWith({ url, headers: mockHeaders() })
  })

  test('Should throw AccessDeniedError if HttpGetClient returns 403', async () => {
    const { sut, httpGetClientStub } = makeSut()
    jest.spyOn(httpGetClientStub, 'get').mockResolvedValueOnce({ statusCode: HttpStatusCode.forbidden })
    const promise = sut.loadAll()
    await expect(promise).rejects.toThrow(new AccessDeniedError())
  })

  test('Should throw UnexpectedError if HttpGetClient returns 404', async () => {
    const { sut, httpGetClientStub } = makeSut()
    jest.spyOn(httpGetClientStub, 'get').mockResolvedValueOnce({ statusCode: HttpStatusCode.notFound })
    const promise = sut.loadAll()
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should throw UnexpectedError if HttpGetClient returns 500', async () => {
    const { sut, httpGetClientStub } = makeSut()
    jest.spyOn(httpGetClientStub, 'get').mockResolvedValueOnce({ statusCode: HttpStatusCode.serverError })
    const promise = sut.loadAll()
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should return a Survey list if HttpGetClient returns 200', async () => {
    const { sut, httpGetClientStub } = makeSut()
    const body = [mockSurvey()]
    jest.spyOn(httpGetClientStub, 'get').mockResolvedValueOnce({
      statusCode: HttpStatusCode.ok,
      body
    })
    const surveys = await sut.loadAll()
    expect(surveys).toEqual(body)
  })

  test('Should return an empty Survey list if HttpGetClient returns 204', async () => {
    const { sut, httpGetClientStub } = makeSut()
    jest.spyOn(httpGetClientStub, 'get').mockResolvedValueOnce({
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
