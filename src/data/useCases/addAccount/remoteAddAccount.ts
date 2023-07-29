import { HttpStatusCode } from '@/data/protocols/http'
import { EmailInUseError, UnexpectedError } from '@/domain/errors'
import type { HttpPostClient } from '@/data/protocols/http'
import type { Account } from '@/domain/models/Account'
import type { AddAccount, AddAccountParams } from '@/domain/useCases/AddAccount'

export class RemoteAddAccount implements AddAccount {
  constructor (
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<AddAccountParams, any, Account>
  ) {}

  async add (params: AddAccountParams): Promise<Account> {
    const httpResponse = await this.httpPostClient.post({
      url: this.url,
      body: params
    })

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: break
      case HttpStatusCode.forbidden: throw new EmailInUseError()
      default: throw new UnexpectedError()
    }

    return httpResponse.body
  }
}
