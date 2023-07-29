import { HttpStatusCode } from '@/data/protocols/http'
import { mockAuthParams } from '../../domain/mocks'
import type { HttpPostClient, HttpPostParams, HttpResponse } from '@/data/protocols/http'

export const mockHttpPostParams = (): HttpPostParams<any, any> => ({
  url: 'any_url',
  body: mockAuthParams()
})

export const mockHttpPostClient = <ReqBody, ReqHeaders, ResBody>(): HttpPostClient<ReqBody, ReqHeaders, ResBody> => {
  class HttpPostClientStub implements HttpPostClient<ReqBody, ReqHeaders, ResBody> {
    async post (params: HttpPostParams<ReqBody, ReqHeaders>): Promise<HttpResponse<ResBody>> {
      return {
        statusCode: HttpStatusCode.ok
      }
    }
  }

  return new HttpPostClientStub()
}
