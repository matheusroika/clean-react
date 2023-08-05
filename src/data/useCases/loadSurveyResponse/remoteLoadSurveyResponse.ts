import { AccessDeniedError, UnexpectedError } from '@/domain/errors'
import type { LoadSurveyResponse } from '@/domain/useCases/LoadSurveyResponse'
import { type HttpClient, HttpStatusCode } from '@/data/protocols/http'
import { getHttpClientData, type Headers } from '@/data/helpers/getHttpClientData'
import type { SurveyResponse } from '@/domain/models/SurveyResponse'
import type { GetStorage } from '@/data/protocols/cache'
import type { Account } from '@/domain/models/Account'

export class RemoteLoadSurveyResponse implements LoadSurveyResponse {
  constructor (
    private readonly url: string,
    private readonly httpClient: HttpClient<undefined, Headers, SurveyResponse>,
    private readonly getStorage: GetStorage
  ) {}

  async load (): Promise<SurveyResponse> {
    const account: Account = this.getStorage.get('account')
    const httpGetClientParams = getHttpClientData(this.url, 'get', account)
    const httpResponse = await this.httpClient.request(httpGetClientParams)

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: return httpResponse.body
      case HttpStatusCode.forbidden: throw new AccessDeniedError()
      default: throw new UnexpectedError()
    }
  }
}
