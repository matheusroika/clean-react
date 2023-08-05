import { AccessDeniedError, UnexpectedError } from '@/domain/errors'
import type { LoadSurveys } from '@/domain/useCases/LoadSurveys'
import { HttpStatusCode, type HttpClient } from '@/data/protocols/http'
import { type Headers, getHttpClientData } from '@/data/helpers/getHttpClientData'
import type { GetStorage } from '@/data/protocols/cache'
import type { Survey } from '@/domain/models/Survey'
import type { Account } from '@/domain/models/Account'

export class RemoteLoadSurveys implements LoadSurveys {
  constructor (
    private readonly url: string,
    private readonly httpClient: HttpClient<undefined, Headers, Survey[]>,
    private readonly getStorage: GetStorage
  ) {}

  async loadAll (): Promise<Survey[]> {
    const account: Account = this.getStorage.get('account')
    const httpGetClientParams = getHttpClientData(this.url, 'get', account)
    const httpResponse = await this.httpClient.request(httpGetClientParams)

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: return httpResponse.body
      case HttpStatusCode.noContent: return []
      case HttpStatusCode.forbidden: throw new AccessDeniedError()
      default: throw new UnexpectedError()
    }
  }
}
