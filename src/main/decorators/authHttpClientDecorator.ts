import type { HttpClient, HttpRequest, HttpResponse } from '@/data/protocols/http'
import type { GetStorage } from '@/data/protocols/cache'

export class AuthHttpClientDecorator implements HttpClient<any, any, any> {
  constructor (
    private readonly getStorage: GetStorage
  ) {}

  async request (data: HttpRequest<any, any>): Promise<HttpResponse<any>> {
    this.getStorage.get('account')

    return {
      statusCode: 200
    }
  }
}
