import { RemoteAddAccount } from '@/data/useCases/addAccount/remoteAddAccount'
import { HttpStatusCode } from '@/data/protocols/http'
import { EmailInUseError, UnexpectedError } from '@/domain/errors'
import { mockHttpPostClient } from '@/../tests/data/mocks'
import { mockAddAccountParams } from '@/../tests/domain/mocks'
import type { HttpPostClient } from '@/data/protocols/http'
import type { Account } from '@/domain/models/Account'
import type { AddAccountParams } from '@/domain/useCases/AddAccount'

type Sut = {
  sut: RemoteAddAccount
  httpPostClient: HttpPostClient<AddAccountParams, Account>
}

const url = 'any_url'
const makeSut = (): Sut => {
  const httpPostClient = mockHttpPostClient<AddAccountParams, Account>()
  const sut = new RemoteAddAccount(url, httpPostClient)
  return {
    sut,
    httpPostClient
  }
}

describe('Remote Add Account', () => {
  test('Should call HttpPostClient with correct values', async () => {
    const { sut, httpPostClient } = makeSut()
    const postSpy = jest.spyOn(httpPostClient, 'post')
    const addAccountParams = mockAddAccountParams()
    await sut.add(addAccountParams)
    expect(postSpy).toBeCalledWith({
      url,
      body: addAccountParams
    })
  })

  test('Should throw EmailInUseError if HttpPostClient returns 403', async () => {
    const { sut, httpPostClient } = makeSut()
    jest.spyOn(httpPostClient, 'post').mockResolvedValueOnce({ statusCode: HttpStatusCode.forbidden })
    const promise = sut.add(mockAddAccountParams())
    await expect(promise).rejects.toThrow(new EmailInUseError())
  })

  test('Should throw UnexpectedError if HttpPostClient returns 400', async () => {
    const { sut, httpPostClient } = makeSut()
    jest.spyOn(httpPostClient, 'post').mockResolvedValueOnce({ statusCode: HttpStatusCode.badRequest })
    const promise = sut.add(mockAddAccountParams())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  /* test('Should throw UnexpectedError if HttpPostClient returns 404', async () => {
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

  test('Should return an Account if HttpPostClient returns 200', async () => {
    const { sut, httpPostClient } = makeSut()
    const body = mockAccount()
    jest.spyOn(httpPostClient, 'post').mockResolvedValueOnce({
      statusCode: HttpStatusCode.ok,
      body
    })
    const account = await sut.auth(mockAuthParams())
    expect(account).toEqual(body)
  }) */
})
