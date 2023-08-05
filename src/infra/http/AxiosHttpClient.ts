import axios from 'axios'
import type { AxiosError, AxiosResponse } from 'axios'
import type { HttpClient, HttpRequest, HttpResponse } from '@/data/protocols/http'

export class AxiosHttpClient implements HttpClient<any, any, any> {
  async request (data: HttpRequest<any, any>): Promise<HttpResponse<any>> {
    const { url, method, body, headers } = data
    let axiosResponse: AxiosResponse<any>
    try {
      axiosResponse = await axios.request({ url, method, data: body, headers })
    } catch (error) {
      const typedError = error as AxiosError
      axiosResponse = typedError.response
    }
    return {
      statusCode: axiosResponse.status,
      body: axiosResponse.data
    }
  }
}
