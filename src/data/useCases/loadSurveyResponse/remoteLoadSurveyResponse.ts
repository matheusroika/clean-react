import { AccessDeniedError, UnexpectedError } from '@/domain/errors'
import { type HttpClient, HttpStatusCode } from '@/data/protocols/http'
import type { LoadSurveyResponse } from '@/domain/useCases/LoadSurveyResponse'
import type { SurveyResponse } from '@/domain/models/SurveyResponse'

export class RemoteLoadSurveyResponse implements LoadSurveyResponse {
  constructor (
    private readonly url: string,
    private readonly httpClient: HttpClient<undefined, any, SurveyResponse>
  ) {}

  async load (): Promise<SurveyResponse> {
    const httpResponse = await this.httpClient.request({ url: this.url, method: 'get' })
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: return httpResponse.body
      case HttpStatusCode.forbidden: throw new AccessDeniedError()
      default: throw new UnexpectedError()
    }
  }
}
