import { mockAuthParams } from '../../domain/mocks'
import { mockHeaders } from '../../infra/mocks/mockAxios'
import { type HttpMethod, HttpStatusCode, type HttpClient, type HttpRequest, type HttpResponse } from '@/data/protocols/http'

export const mockHttpRequest = (): HttpRequest<any, any> => {
  const methods: HttpMethod[] = ['get', 'post', 'put', 'delete']
  const method = methods[Math.floor(Math.random() * methods.length)]

  return {
    url: 'any_url',
    method,
    body: mockAuthParams(),
    headers: mockHeaders()
  }
}

export const mockHttpClient = <ReqBody, ReqHeaders, ResBody>(): HttpClient<ReqBody, ReqHeaders, ResBody> => {
  class HttpClientStub implements HttpClient<ReqBody, ReqHeaders, ResBody> {
    async request (data: HttpRequest<ReqBody, ReqHeaders>): Promise<HttpResponse<ResBody>> {
      return {
        statusCode: HttpStatusCode.ok
      }
    }
  }

  return new HttpClientStub()
}
