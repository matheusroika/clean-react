import { RemoteSaveSurveyResponse } from '@/data/useCases/saveSurveyResponse/remoteSaveSurveyResponse'
import { AccessDeniedError, UnexpectedError } from '@/domain/errors'
import { mockHttpClient } from '../../mocks'
import { mockSurveyResponse } from '@/../tests/domain/mocks'
import { type HttpClient, HttpStatusCode } from '@/data/protocols/http'
import type { SurveyResponse } from '@/domain/models/SurveyResponse'

type Sut = {
  sut: RemoteSaveSurveyResponse
  httpClientStub: HttpClient<undefined, any, SurveyResponse>
}

const url = 'any_url'
const makeSut = (): Sut => {
  const httpClientStub = mockHttpClient<undefined, any, SurveyResponse>()
  const sut = new RemoteSaveSurveyResponse(url, httpClientStub)
  return {
    sut,
    httpClientStub
  }
}

describe('Remote Save Survey Response', () => {
  test('Should call HttpClient with correct data', async () => {
    const { sut, httpClientStub } = makeSut()
    const requestSpy = jest.spyOn(httpClientStub, 'request')
    const saveSurveyResponseParams = { answer: 'any_answer' }
    await sut.save(saveSurveyResponseParams)
    expect(requestSpy).toHaveBeenCalledWith({ url, method: 'put', body: saveSurveyResponseParams })
  })

  test('Should throw AccessDeniedError if HttpClient returns 403', async () => {
    const { sut, httpClientStub } = makeSut()
    jest.spyOn(httpClientStub, 'request').mockResolvedValueOnce({ statusCode: HttpStatusCode.forbidden })
    const promise = sut.save({ answer: 'any_answer' })
    await expect(promise).rejects.toThrow(new AccessDeniedError())
  })

  test('Should throw UnexpectedError if HttpClient returns 404', async () => {
    const { sut, httpClientStub } = makeSut()
    jest.spyOn(httpClientStub, 'request').mockResolvedValueOnce({ statusCode: HttpStatusCode.notFound })
    const promise = sut.save({ answer: 'any_answer' })
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should throw UnexpectedError if HttpClient returns 500', async () => {
    const { sut, httpClientStub } = makeSut()
    jest.spyOn(httpClientStub, 'request').mockResolvedValueOnce({ statusCode: HttpStatusCode.serverError })
    const promise = sut.save({ answer: 'any_answer' })
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should return a SurveyResponse if HttpClient returns 200', async () => {
    const { sut, httpClientStub } = makeSut()
    const body = mockSurveyResponse()
    jest.spyOn(httpClientStub, 'request').mockResolvedValueOnce({
      statusCode: HttpStatusCode.ok,
      body
    })
    const surveyResponse = await sut.save({ answer: 'any_answer' })
    expect(surveyResponse).toEqual(body)
  })
})
