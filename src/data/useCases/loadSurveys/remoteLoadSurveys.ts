import { HttpStatusCode } from '@/data/protocols/http'
import { UnexpectedError } from '@/domain/errors'
import type { LoadSurveys } from '@/domain/useCases/LoadSurveys'
import type { Survey } from '@/domain/models/Survey'
import type { HttpGetClient } from '@/data/protocols/http'
import type { GetStorage } from '@/data/protocols/cache'
import type { Account } from '@/domain/models/Account'

export class RemoteLoadSurveys implements LoadSurveys {
  constructor (
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient<any, Survey[]>,
    private readonly getStorage: GetStorage
  ) {}

  async loadAll (): Promise<Survey[]> {
    const account: Account = this.getStorage.get('account')
    if (!account?.accessToken || !account?.name || !account?.email) throw new UnexpectedError()
    const httpResponse = await this.httpGetClient.get({
      url: this.url,
      headers: {
        'x-access-token': account.accessToken
      }
    })

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: return httpResponse.body
      case HttpStatusCode.noContent: return []
      default: throw new UnexpectedError()
    }
  }
}
