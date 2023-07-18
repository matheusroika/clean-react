import { RemoteAuthentication } from '@/data/useCases/authentication/RemoteAuthentication'
import { mockHttpPostClient } from '../../mocks'
import { mockAuthParams } from '@/../tests/domain/mocks/mockAuthentication'
import { InvalidCredentialsError } from '@/domain/errors/InvalidCredentialsError'
import { HttpStatusCode } from '@/data/protocols/HttpResponse'
import type { HttpPostClient } from '@/data/protocols/HttpPostClient'

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
  test('Should call HttpPostClient with correct values', async () => {
    const { sut, httpPostClient } = makeSut()
    const postSpy = jest.spyOn(httpPostClient, 'post')
    const authParams = mockAuthParams()
    await sut.auth(authParams)
    expect(postSpy).toBeCalledWith({
      url,
      body: authParams
    })
  })

  test('Should throw InvalidCredentialsError if HttpPostClient returns 401', async () => {
    const { sut, httpPostClient } = makeSut()
    jest.spyOn(httpPostClient, 'post').mockResolvedValueOnce({ statusCode: HttpStatusCode.unauthorized })
    const promise = sut.auth(mockAuthParams())
    await expect(promise).rejects.toThrow(new InvalidCredentialsError())
  })
})
