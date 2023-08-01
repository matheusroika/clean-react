import { type HttpGetParams, HttpStatusCode, type HttpGetClient } from '@/data/protocols/http'
import { AccessDeniedError, UnexpectedError } from '@/domain/errors'
import type { LoadSurveys } from '@/domain/useCases/LoadSurveys'
import type { Survey } from '@/domain/models/Survey'
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
    let httpGetClientParams: HttpGetParams<any> = { url: this.url }
    if (account?.accessToken || account?.name || account?.email) {
      httpGetClientParams = {
        ...httpGetClientParams,
        headers: {
          'x-access-token': account.accessToken
        }
      }
    }

    const httpResponse = await this.httpGetClient.get(httpGetClientParams)

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: return httpResponse.body
      case HttpStatusCode.noContent: return []
      case HttpStatusCode.forbidden: throw new AccessDeniedError()
      default: throw new UnexpectedError()
    }
  }
}
