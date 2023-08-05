import { AccessDeniedError, UnexpectedError } from '@/domain/errors'
import type { LoadSurveyResponse } from '@/domain/useCases/LoadSurveyResponse'
import { type HttpGetClient, HttpStatusCode } from '@/data/protocols/http'
import { getHttpGetClientParams, type Headers } from '@/data/helpers/getHttpGetClientParams'
import type { SurveyResponse } from '@/domain/models/SurveyResponse'
import type { GetStorage } from '@/data/protocols/cache'
import type { Account } from '@/domain/models/Account'

export class RemoteLoadSurveyResponse implements LoadSurveyResponse {
  constructor (
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient<Headers, SurveyResponse>,
    private readonly getStorage: GetStorage
  ) {}

  async load (): Promise<SurveyResponse> {
    const account: Account = this.getStorage.get('account')
    const httpGetClientParams = getHttpGetClientParams(this.url, account)
    const httpResponse = await this.httpGetClient.get(httpGetClientParams)

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: return httpResponse.body
      case HttpStatusCode.forbidden: throw new AccessDeniedError()
      default: throw new UnexpectedError()
    }
  }
}
