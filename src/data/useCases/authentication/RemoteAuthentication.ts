import type { HttpPostClient } from '@/data/protocols/HttpPostClient'
import { HttpStatusCode } from '@/data/protocols/HttpResponse'
import { InvalidCredentialsError } from '@/domain/errors/InvalidCredentialsError'
import type { Account } from '@/domain/models/Account'
import type { AuthParams, Authentication } from '@/domain/useCases/Authentication'

export class RemoteAuthentication implements Authentication {
  constructor (
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient
  ) {}

  async auth (params: AuthParams): Promise<Account> {
    const httpResponse = await this.httpPostClient.post({
      url: this.url,
      body: params
    })

    const statusCodes = {
      [HttpStatusCode.ok]: () => {},
      [HttpStatusCode.unauthorized]: () => {
        throw new InvalidCredentialsError()
      }
    }

    statusCodes[httpResponse.statusCode]()

    return {
      email: '',
      name: '',
      accessToken: ''
    }
  }
}
