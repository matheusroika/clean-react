import { RemoteLoadSurveys } from '@/data/useCases/loadSurveys/remoteLoadSurveys'
import { mockHttpGetClient } from '../../mocks/mockHttpGetClient'
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
})
