import { AccessDeniedError, UnexpectedError } from '@/domain/errors'
import { HttpStatusCode, type HttpClient } from '@/data/protocols/http'
import type { LoadSurveys } from '@/domain/useCases/LoadSurveys'
import type { Survey } from '@/domain/models/Survey'

export class RemoteLoadSurveys implements LoadSurveys {
  constructor (
    private readonly url: string,
    private readonly httpClient: HttpClient<undefined, any, Survey[]>
  ) {}

  async loadAll (): Promise<Survey[]> {
    const httpResponse = await this.httpClient.request({ url: this.url, method: 'get' })
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: return httpResponse.body
      case HttpStatusCode.noContent: return []
      case HttpStatusCode.forbidden: throw new AccessDeniedError()
      default: throw new UnexpectedError()
    }
  }
}
