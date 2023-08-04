import { RemoteLoadSurveyResponse } from '@/data/useCases/loadSurveyResponse/remoteLoadSurveyResponse'
import { mockHttpGetClient } from '../../mocks'
import { type HttpGetClient, HttpStatusCode } from '@/data/protocols/http'
import { AccessDeniedError, UnexpectedError } from '@/domain/errors'

type Sut = {
  sut: RemoteLoadSurveyResponse
  httpGetClientStub: HttpGetClient<any, any>
}

const url = 'any_url'
const makeSut = (): Sut => {
  const httpGetClientStub = mockHttpGetClient()
  const sut = new RemoteLoadSurveyResponse(url, httpGetClientStub)
  return {
    sut,
    httpGetClientStub
  }
}

describe('Remote Load Survey Response', () => {
  test('Should call HttpGetClient with correct URL', async () => {
    const { sut, httpGetClientStub } = makeSut()
    const getSpy = jest.spyOn(httpGetClientStub, 'get')
    await sut.load()
    expect(getSpy).toHaveBeenCalledWith({ url })
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
})
