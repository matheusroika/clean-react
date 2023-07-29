import { RemoteLoadSurveys } from '@/data/useCases/loadSurveys/remoteLoadSurveys'
import { HttpStatusCode } from '@/data/protocols/http'
import { UnexpectedError } from '@/domain/errors'
import { mockHttpGetClient } from '../../mocks'
import { mockSurvey } from '@/../tests/domain/mocks'
import type { HttpGetClient } from '@/data/protocols/http'
import type { Survey } from '@/domain/models/Survey'

type Sut = {
  sut: RemoteLoadSurveys
  httpGetClient: HttpGetClient<any, Survey[]>
}

const url = 'any_url'
const makeSut = (): Sut => {
  const httpGetClient = mockHttpGetClient<any, Survey[]>()
  const sut = new RemoteLoadSurveys(url, httpGetClient)
  return {
    sut,
    httpGetClient
  }
}

describe('Remote Load Surveys', () => {
  test('Should call HttpGetClient with correct url', async () => {
    const { sut, httpGetClient } = makeSut()
    const getSpy = jest.spyOn(httpGetClient, 'get')
    await sut.loadAll()
    expect(getSpy).toBeCalledWith({ url })
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
    const account = await sut.loadAll()
    expect(account).toEqual(body)
  })

  test('Should return an empty Survey list if HttpGetClient returns 204', async () => {
    const { sut, httpGetClient } = makeSut()
    jest.spyOn(httpGetClient, 'get').mockResolvedValueOnce({
      statusCode: HttpStatusCode.noContent
    })
    const account = await sut.loadAll()
    expect(account).toEqual([])
  })
})
