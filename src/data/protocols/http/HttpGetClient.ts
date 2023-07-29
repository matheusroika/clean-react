import type { HttpResponse } from './HttpResponse'

export type HttpGetParams<ReqHeaders> = {
  url: string
  headers?: ReqHeaders
}

export interface HttpGetClient<ReqHeaders, ResBody> {
  get: (params: HttpGetParams<ReqHeaders>) => Promise<HttpResponse<ResBody>>
}
