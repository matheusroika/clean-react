import axios from 'axios'
import type { HttpPostClient, HttpPostParams, HttpResponse } from '@/data/protocols/http'
import type { Account } from '@/domain/models/Account'
import type { AuthParams } from '@/domain/useCases/Authentication'

export class AxiosHttpClient implements HttpPostClient<AuthParams, Account> {
  async post (params: HttpPostParams<AuthParams>): Promise<HttpResponse<Account>> {
    const { url, body } = params
    await axios.post(url, body)

    return {
      statusCode: 200
    }
  }
}
