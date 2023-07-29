import { HttpStatusCode } from '@/data/protocols/http'
import type { HttpGetClient, HttpGetParams, HttpResponse } from '@/data/protocols/http'

export const mockHttpGetParams = (): HttpGetParams<any> => ({
  url: 'any_url',
  headers: {
    header: 'any_header'
  }
})

export const mockHttpGetClient = <ReqHeaders, ResBody>(): HttpGetClient<ReqHeaders, ResBody> => {
  class HttpGetClientStub implements HttpGetClient<ReqHeaders, ResBody> {
    async get (params: HttpGetParams<ReqHeaders>): Promise<HttpResponse<ResBody>> {
      return {
        statusCode: HttpStatusCode.ok
      }
    }
  }

  return new HttpGetClientStub()
}
