import type { HttpPostClient } from '@/data/protocols/HttpPostClient'
import { HttpStatusCode } from '@/data/protocols/HttpResponse'
import { InvalidCredentialsError, UnexpectedError } from '@/domain/errors'
import type { Account } from '@/domain/models/Account'
import type { AuthParams, Authentication } from '@/domain/useCases/Authentication'

export class RemoteAuthentication implements Authentication {
  constructor (
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<AuthParams, Account>
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
