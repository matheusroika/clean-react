import { RemoteAddAccount } from '@/data/useCases/addAccount/remoteAddAccount'
import { HttpStatusCode } from '@/data/protocols/http'
import { EmailInUseError, UnexpectedError } from '@/domain/errors'
import { mockHttpClient } from '@/../tests/data/mocks'
import { mockAccount, mockAddAccountParams } from '@/../tests/domain/mocks'
import type { HttpClient } from '@/data/protocols/http'
import type { Account } from '@/domain/models/Account'
import type { AddAccountParams } from '@/domain/useCases/AddAccount'

type Sut = {
  sut: RemoteAddAccount
  httpClientStub: HttpClient<AddAccountParams, any, Account>
}

const url = 'any_url'
const makeSut = (): Sut => {
  const httpClientStub = mockHttpClient<AddAccountParams, any, Account>()
  const sut = new RemoteAddAccount(url, httpClientStub)
  return {
    sut,
    httpClientStub
  }
}

describe('Remote Add Account', () => {
  test('Should call HttpClient with correct data', async () => {
    const { sut, httpClientStub } = makeSut()
    const postSpy = jest.spyOn(httpClientStub, 'request')
    const addAccountParams = mockAddAccountParams()
    await sut.add(addAccountParams)
    expect(postSpy).toBeCalledWith({
      url,
      method: 'post',
      body: addAccountParams
    })
  })

  test('Should throw EmailInUseError if HttpClient returns 403', async () => {
    const { sut, httpClientStub } = makeSut()
    jest.spyOn(httpClientStub, 'request').mockResolvedValueOnce({ statusCode: HttpStatusCode.forbidden })
    const promise = sut.add(mockAddAccountParams())
    await expect(promise).rejects.toThrow(new EmailInUseError())
  })

  test('Should throw UnexpectedError if HttpClient returns 400', async () => {
    const { sut, httpClientStub } = makeSut()
    jest.spyOn(httpClientStub, 'request').mockResolvedValueOnce({ statusCode: HttpStatusCode.badRequest })
    const promise = sut.add(mockAddAccountParams())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should throw UnexpectedError if HttpClient returns 404', async () => {
    const { sut, httpClientStub } = makeSut()
    jest.spyOn(httpClientStub, 'request').mockResolvedValueOnce({ statusCode: HttpStatusCode.notFound })
    const promise = sut.add(mockAddAccountParams())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should throw UnexpectedError if HttpClient returns 500', async () => {
    const { sut, httpClientStub } = makeSut()
    jest.spyOn(httpClientStub, 'request').mockResolvedValueOnce({ statusCode: HttpStatusCode.serverError })
    const promise = sut.add(mockAddAccountParams())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should return an Account if HttpClient returns 200', async () => {
    const { sut, httpClientStub } = makeSut()
    const body = mockAccount()
    jest.spyOn(httpClientStub, 'request').mockResolvedValueOnce({
      statusCode: HttpStatusCode.ok,
      body
    })
    const account = await sut.add(mockAddAccountParams())
    expect(account).toEqual(body)
  })
})
