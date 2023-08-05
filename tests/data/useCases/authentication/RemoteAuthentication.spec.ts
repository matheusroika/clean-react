import { RemoteAuthentication } from '@/data/useCases/authentication/RemoteAuthentication'
import { HttpStatusCode } from '@/data/protocols/http'
import { InvalidCredentialsError, UnexpectedError } from '@/domain/errors'
import { mockHttpClient } from '@/../tests/data/mocks'
import { mockAuthParams, mockAccount } from '@/../tests/domain/mocks'
import type { HttpClient } from '@/data/protocols/http'
import type { AuthParams } from '@/domain/useCases/Authentication'
import type { Account } from '@/domain/models/Account'

type Sut = {
  sut: RemoteAuthentication
  httpClientStub: HttpClient<AuthParams, any, Account>
}

const url = 'any_url'
const makeSut = (): Sut => {
  const httpClientStub = mockHttpClient<AuthParams, any, Account>()
  const sut = new RemoteAuthentication(url, httpClientStub)
  return {
    sut,
    httpClientStub
  }
}

describe('Remote Authentication', () => {
  test('Should call HttpClient with correct values', async () => {
    const { sut, httpClientStub } = makeSut()
    const postSpy = jest.spyOn(httpClientStub, 'request')
    const authParams = mockAuthParams()
    await sut.auth(authParams)
    expect(postSpy).toBeCalledWith({
      url,
      method: 'post',
      body: authParams
    })
  })

  test('Should throw InvalidCredentialsError if HttpClient returns 401', async () => {
    const { sut, httpClientStub } = makeSut()
    jest.spyOn(httpClientStub, 'request').mockResolvedValueOnce({ statusCode: HttpStatusCode.unauthorized })
    const promise = sut.auth(mockAuthParams())
    await expect(promise).rejects.toThrow(new InvalidCredentialsError())
  })

  test('Should throw UnexpectedError if HttpClient returns 400', async () => {
    const { sut, httpClientStub } = makeSut()
    jest.spyOn(httpClientStub, 'request').mockResolvedValueOnce({ statusCode: HttpStatusCode.badRequest })
    const promise = sut.auth(mockAuthParams())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should throw UnexpectedError if HttpClient returns 404', async () => {
    const { sut, httpClientStub } = makeSut()
    jest.spyOn(httpClientStub, 'request').mockResolvedValueOnce({ statusCode: HttpStatusCode.notFound })
    const promise = sut.auth(mockAuthParams())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should throw UnexpectedError if HttpClient returns 500', async () => {
    const { sut, httpClientStub } = makeSut()
    jest.spyOn(httpClientStub, 'request').mockResolvedValueOnce({ statusCode: HttpStatusCode.serverError })
    const promise = sut.auth(mockAuthParams())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should return an Account if HttpClient returns 200', async () => {
    const { sut, httpClientStub } = makeSut()
    const body = mockAccount()
    jest.spyOn(httpClientStub, 'request').mockResolvedValueOnce({
      statusCode: HttpStatusCode.ok,
      body
    })
    const account = await sut.auth(mockAuthParams())
    expect(account).toEqual(body)
  })
})
