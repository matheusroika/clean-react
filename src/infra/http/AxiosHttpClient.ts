import axios from 'axios'
import type { AxiosError, AxiosResponse } from 'axios'
import type { HttpPostClient, HttpPostParams, HttpResponse } from '@/data/protocols/http'

export class AxiosHttpClient implements HttpPostClient<any, any> {
  async post (params: HttpPostParams<any>): Promise<HttpResponse<any>> {
    const { url, body } = params
    let httpResponse: AxiosResponse<any>
    try {
      httpResponse = await axios.post(url, body)
    } catch (error) {
      const typedError = error as AxiosError
      httpResponse = typedError.response
    }
    return {
      statusCode: httpResponse.status,
      body: httpResponse.data
    }
  }
}
