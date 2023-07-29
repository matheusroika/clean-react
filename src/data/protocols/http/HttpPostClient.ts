import type { HttpResponse } from './HttpResponse'

export type HttpPostParams<ReqBody, ReqHeaders> = {
  url: string
  body?: ReqBody
  headers?: ReqHeaders
}

export interface HttpPostClient<ReqBody, ReqHeaders, ResBody> {
  post: (params: HttpPostParams<ReqBody, ReqHeaders>) => Promise<HttpResponse<ResBody>>
}
