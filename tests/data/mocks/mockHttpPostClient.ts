import { HttpStatusCode } from '@/data/protocols/HttpResponse'
import type { HttpPostClient, HttpPostParams } from '@/data/protocols/HttpPostClient'
import type { HttpResponse } from '@/data/protocols/HttpResponse'

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
