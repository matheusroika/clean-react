import { HttpStatusCode } from '@/data/protocols/http'
import { EmailInUseError, UnexpectedError } from '@/domain/errors'
import type { HttpClient } from '@/data/protocols/http'
import type { Account } from '@/domain/models/Account'
import type { AddAccount, AddAccountParams } from '@/domain/useCases/AddAccount'

export class RemoteAddAccount implements AddAccount {
  constructor (
    private readonly url: string,
    private readonly httpClient: HttpClient<AddAccountParams, any, Account>
  ) {}

  async add (params: AddAccountParams): Promise<Account> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: 'post',
      body: params
    })

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: return httpResponse.body
      case HttpStatusCode.forbidden: throw new EmailInUseError()
      default: throw new UnexpectedError()
    }
  }
}
