import { RemoteAuthentication } from '../../../../src/data/useCases/authentication/RemoteAuthentication'
import { mockHttpPostClient } from '../../mocks'
import type { HttpPostClient } from '../../../../src/data/protocols/HttpPostClient'

type Sut = {
  sut: RemoteAuthentication
  httpPostClient: HttpPostClient
}

const url = 'any_url'
const makeSut = (): Sut => {
  const httpPostClient = mockHttpPostClient()
  const sut = new RemoteAuthentication(url, httpPostClient)
  return {
    sut,
    httpPostClient
  }
}

describe('Remote Authentication', () => {
  test('Should call HttpClient with correct URL', async () => {
    const { sut, httpPostClient } = makeSut()
    const postSpy = jest.spyOn(httpPostClient, 'post')
    await sut.auth({ email: '', password: '' })
    expect(postSpy).toBeCalledWith(url)
  })
})
