import { HttpStatusCode } from '@/data/protocols/HttpResponse'
import type { HttpPostClient, HttpPostParams } from '@/data/protocols/HttpPostClient'
import type { HttpResponse } from '@/data/protocols/HttpResponse'

export const mockHttpPostClient = (): HttpPostClient => {
  class HttpPostClientStub implements HttpPostClient {
    async post (params: HttpPostParams): Promise<HttpResponse> {
      return {
        statusCode: HttpStatusCode.ok
      }
    }
  }

  return new HttpPostClientStub()
}
