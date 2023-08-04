import { RemoteLoadSurveyResponse } from '@/data/useCases/loadSurveyResponse/remoteLoadSurveyResponse'
import { mockHttpGetClient } from '../../mocks'
import type { HttpGetClient } from '@/data/protocols/http'

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
})
