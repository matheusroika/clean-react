import axios from 'axios'
import type { AxiosError, AxiosResponse } from 'axios'
import type { HttpGetClient, HttpGetParams, HttpPostClient, HttpPostParams, HttpResponse } from '@/data/protocols/http'

export class AxiosHttpClient implements HttpPostClient<any, any, any>, HttpGetClient<any, any> {
  async post (params: HttpPostParams<any, any>): Promise<HttpResponse<any>> {
    const { url, body } = params
    let axiosResponse: AxiosResponse<any>
    try {
      axiosResponse = await axios.post(url, body)
    } catch (error) {
      const typedError = error as AxiosError
      axiosResponse = typedError.response
    }
    return {
      statusCode: axiosResponse.status,
      body: axiosResponse.data
    }
  }

  async get (params: HttpGetParams<any>): Promise<HttpResponse<any>> {
    const { url, headers } = params
    let axiosResponse: AxiosResponse<any>
    try {
      axiosResponse = await axios.get(url, { headers })
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
