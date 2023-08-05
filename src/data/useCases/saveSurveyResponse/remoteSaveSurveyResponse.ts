import { AccessDeniedError, UnexpectedError } from '@/domain/errors'
import { type HttpClient, HttpStatusCode } from '@/data/protocols/http'
import type { SurveyResponse } from '@/domain/models/SurveyResponse'
import type { SaveSurveyResponse, SaveSurveyResponseParams } from '@/domain/useCases/SaveSurveyResponse'

export class RemoteSaveSurveyResponse implements SaveSurveyResponse {
  constructor (
    private readonly url: string,
    private readonly httpClient: HttpClient<any, any, SurveyResponse>
  ) {}

  async save (params: SaveSurveyResponseParams): Promise<SurveyResponse> {
    const { answer } = params
    const httpResponse = await this.httpClient.request({ url: this.url, method: 'put', body: { answer } })
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: return httpResponse.body
      case HttpStatusCode.forbidden: throw new AccessDeniedError()
      default: throw new UnexpectedError()
    }
  }
}
