import { HttpStatusCode } from '@/data/protocols/http'
import type { HttpPostClient, HttpPostParams, HttpResponse } from '@/data/protocols/http'

export const mockHttpPostClient = <T, R>(): HttpPostClient<T, R> => {
  class HttpPostClientStub implements HttpPostClient<T, R> {
    async post (params: HttpPostParams<T>): Promise<HttpResponse<R>> {
      return {
        statusCode: HttpStatusCode.ok
      }
    }
  }

  return new HttpPostClientStub()
}
