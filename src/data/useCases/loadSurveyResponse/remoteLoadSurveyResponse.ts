import type { LoadSurveyResponse } from '@/domain/useCases/LoadSurveyResponse'
import type { SurveyResponse } from '@/domain/models/SurveyResponse'
import type { HttpGetClient } from '@/data/protocols/http'

export class RemoteLoadSurveyResponse implements LoadSurveyResponse {
  constructor (
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient<any, any>
  ) {}

  async load (): Promise<SurveyResponse> {
    await this.httpGetClient.get({ url: this.url })

    return {
      accountId: '',
      answer: '',
      id: '',
      surveyId: '',
      date: new Date('2023-07-03T05:52:28.514Z')
    }
  }
}
