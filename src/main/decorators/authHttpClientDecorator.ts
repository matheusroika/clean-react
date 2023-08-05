import type { HttpClient, HttpRequest, HttpResponse } from '@/data/protocols/http'
import type { GetStorage } from '@/data/protocols/cache'

export class AuthHttpClientDecorator implements HttpClient<any, any, any> {
  constructor (
    private readonly getStorage: GetStorage,
    private readonly httpClient: HttpClient<any, any, any>
  ) {}

  async request (data: HttpRequest<any, any>): Promise<HttpResponse<any>> {
    this.getStorage.get('account')
    await this.httpClient.request(data)

    return {
      statusCode: 200
    }
  }
}
