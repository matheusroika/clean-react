import { HttpStatusCode } from '@/data/protocols/http'
import { UnexpectedError } from '@/domain/errors'
import type { LoadSurveys } from '@/domain/useCases/LoadSurveys'
import type { Survey } from '@/domain/models/Survey'
import type { HttpGetClient } from '@/data/protocols/http'

export class RemoteLoadSurveys implements LoadSurveys {
  constructor (
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient<any, Survey[]>
  ) {}

  async loadAll (): Promise<Survey[]> {
    const httpResponse = await this.httpGetClient.get({
      url: this.url
    })

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: break
      case HttpStatusCode.noContent: return []
      default: throw new UnexpectedError()
    }

    return httpResponse.body
  }
}
