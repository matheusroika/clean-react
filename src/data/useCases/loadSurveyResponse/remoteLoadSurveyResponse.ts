import type { LoadSurveyResponse } from '@/domain/useCases/LoadSurveyResponse'
import type { SurveyResponse } from '@/domain/models/SurveyResponse'
import { type HttpGetClient, HttpStatusCode } from '@/data/protocols/http'
import { AccessDeniedError, UnexpectedError } from '@/domain/errors'

export class RemoteLoadSurveyResponse implements LoadSurveyResponse {
  constructor (
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient<any, any>
  ) {}

  async load (): Promise<SurveyResponse> {
    const httpResponse = await this.httpGetClient.get({ url: this.url })

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: return httpResponse.body
      case HttpStatusCode.forbidden: throw new AccessDeniedError()
      default: throw new UnexpectedError()
    }
  }
}
