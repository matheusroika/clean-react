import { RemoteLoadSurveys } from '@/data/useCases/loadSurveys/remoteLoadSurveys'
import { HttpStatusCode } from '@/data/protocols/http'
import { InvalidCredentialsError, UnexpectedError } from '@/domain/errors'
import { mockGetStorage, mockHttpGetClient } from '../../mocks'
import { mockSurvey } from '@/../tests/domain/mocks'
import { mockHeaders } from '@/../tests/infra/mocks/mockAxios'
import type { Survey } from '@/domain/models/Survey'
import type { HttpGetClient } from '@/data/protocols/http'
import type { GetStorage } from '@/data/protocols/cache'

type Sut = {
  sut: RemoteLoadSurveys
  httpGetClient: HttpGetClient<any, Survey[]>
  getStorage: GetStorage
  redirectAdapter: (path: string) => Promise<void>
}

const url = 'any_url'
const makeSut = (): Sut => {
  const httpGetClient = mockHttpGetClient<any, Survey[]>()
  const getStorage = mockGetStorage()
  const redirectAdapter = jest.fn()
  const sut = new RemoteLoadSurveys(url, httpGetClient, getStorage, redirectAdapter)
  return {
    sut,
    httpGetClient,
    getStorage,
    redirectAdapter
  }
}

describe('Remote Load Surveys', () => {
  test('Should call HttpGetClient with correct values', async () => {
    const { sut, httpGetClient } = makeSut()
    const getSpy = jest.spyOn(httpGetClient, 'get')
    await sut.loadAll()
    expect(getSpy).toBeCalledWith({ url, headers: mockHeaders() })
  })

  test('Should throw UnexpectedError if HttpGetClient returns 403', async () => {
    const { sut, httpGetClient } = makeSut()
    jest.spyOn(httpGetClient, 'get').mockResolvedValueOnce({ statusCode: HttpStatusCode.forbidden })
    const promise = sut.loadAll()
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should throw UnexpectedError if HttpGetClient returns 404', async () => {
    const { sut, httpGetClient } = makeSut()
    jest.spyOn(httpGetClient, 'get').mockResolvedValueOnce({ statusCode: HttpStatusCode.notFound })
    const promise = sut.loadAll()
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should throw UnexpectedError if HttpGetClient returns 500', async () => {
    const { sut, httpGetClient } = makeSut()
    jest.spyOn(httpGetClient, 'get').mockResolvedValueOnce({ statusCode: HttpStatusCode.serverError })
    const promise = sut.loadAll()
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should return a Survey list if HttpGetClient returns 200', async () => {
    const { sut, httpGetClient } = makeSut()
    const body = [mockSurvey()]
    jest.spyOn(httpGetClient, 'get').mockResolvedValueOnce({
      statusCode: HttpStatusCode.ok,
      body
    })
    const surveys = await sut.loadAll()
    expect(surveys).toEqual(body)
  })

  test('Should return an empty Survey list if HttpGetClient returns 204', async () => {
    const { sut, httpGetClient } = makeSut()
    jest.spyOn(httpGetClient, 'get').mockResolvedValueOnce({
      statusCode: HttpStatusCode.noContent
    })
    const surveys = await sut.loadAll()
    expect(surveys).toEqual([])
  })

  test('Should call GetStorage with correct key', async () => {
    const { sut, getStorage } = makeSut()
    const getSpy = jest.spyOn(getStorage, 'get')
    await sut.loadAll()
    expect(getSpy).toHaveBeenCalledWith('account')
  })

  test('Should throw InvalidCredentialsError and redirect to /login if GetStorage returns invalid account', async () => {
    const { sut, getStorage, redirectAdapter } = makeSut()
    jest.spyOn(getStorage, 'get').mockReturnValueOnce(null)
    const promise = sut.loadAll()
    await expect(promise).rejects.toThrow(new InvalidCredentialsError())
    expect(redirectAdapter).toHaveBeenCalledWith('/login')
  })
})
