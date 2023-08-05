import type { HttpClient, HttpRequest, HttpResponse } from '@/data/protocols/http'
import type { GetStorage } from '@/data/protocols/cache'
import type { Account } from '@/domain/models/Account'

export class AuthHttpClientDecorator implements HttpClient<any, any, any> {
  constructor (
    private readonly getStorage: GetStorage,
    private readonly httpClient: HttpClient<any, any, any>
  ) {}

  async request (data: HttpRequest<any, any>): Promise<HttpResponse<any>> {
    const { url, method, body, headers } = data
    let httpClientData: HttpRequest<any, any> = { url, method, body, headers }
    const account = this.getStorage.get('account') as Account
    if (account?.accessToken && account?.name && account?.email) {
      httpClientData = {
        ...httpClientData,
        headers: {
          'x-access-token': account.accessToken
        }
      }
    }
    await this.httpClient.request(httpClientData)

    return {
      statusCode: 200
    }
  }
}
