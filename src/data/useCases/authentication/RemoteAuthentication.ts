import { HttpStatusCode } from '@/data/protocols/http'
import { InvalidCredentialsError, UnexpectedError } from '@/domain/errors'
import type { HttpPostClient } from '@/data/protocols/http'
import type { Account } from '@/domain/models/Account'
import type { AuthParams, Authentication } from '@/domain/useCases/Authentication'

export class RemoteAuthentication implements Authentication {
  constructor (
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<AuthParams, any, Account>
  ) {}

  async auth (params: AuthParams): Promise<Account> {
    const httpResponse = await this.httpPostClient.post({
      url: this.url,
      body: params
    })

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: break
      case HttpStatusCode.unauthorized: throw new InvalidCredentialsError()
      default: throw new UnexpectedError()
    }

    return httpResponse.body
  }
}
