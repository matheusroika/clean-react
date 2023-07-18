import { RemoteAuthentication } from '@/data/useCases/authentication/RemoteAuthentication'
import { HttpStatusCode } from '@/data/protocols/HttpResponse'
import { InvalidCredentialsError, UnexpectedError } from '@/domain/errors'
import { mockHttpPostClient } from '../../mocks'
import { mockAuthParams } from '@/../tests/domain/mocks/mockAuthentication'
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

  test('Should throw UnexpectedError if HttpPostClient returns 400', async () => {
    const { sut, httpPostClient } = makeSut()
    jest.spyOn(httpPostClient, 'post').mockResolvedValueOnce({ statusCode: HttpStatusCode.badRequest })
    const promise = sut.auth(mockAuthParams())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should throw UnexpectedError if HttpPostClient returns 404', async () => {
    const { sut, httpPostClient } = makeSut()
    jest.spyOn(httpPostClient, 'post').mockResolvedValueOnce({ statusCode: HttpStatusCode.notFound })
    const promise = sut.auth(mockAuthParams())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should throw UnexpectedError if HttpPostClient returns 500', async () => {
    const { sut, httpPostClient } = makeSut()
    jest.spyOn(httpPostClient, 'post').mockResolvedValueOnce({ statusCode: HttpStatusCode.serverError })
    const promise = sut.auth(mockAuthParams())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })
})
