import type { HttpPostClient } from '@/data/protocols/HttpPostClient'
import type { Account } from '@/domain/models/Account'
import type { AuthParams, Authentication } from '@/domain/useCases/Authentication'

export class RemoteAuthentication implements Authentication {
  constructor (
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient
  ) {}

  async auth (params: AuthParams): Promise<Account> {
    await this.httpPostClient.post({
      url: this.url,
      body: params
    })

    return {
      email: '',
      name: '',
      accessToken: ''
    }
  }
}
