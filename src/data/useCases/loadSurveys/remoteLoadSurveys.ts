import type { LoadSurveys } from '@/domain/useCases/LoadSurveys'
import type { Survey } from '@/domain/models/Survey'
import type { HttpGetClient } from '@/data/protocols/http'

export class RemoteLoadSurveys implements LoadSurveys {
  constructor (
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient<any, Survey[]>
  ) {}

  async loadAll (): Promise<Survey[]> {
    await this.httpGetClient.get({
      url: this.url
    })
    return []
  }
}
