export enum HttpStatusCode {
  ok = 200,
  noContent = 204,
  badRequest = 400,
  unauthorized = 401,
  forbidden = 403,
  notFound = 404,
  serverError = 500
}

export type HttpResponse<ResBody> = {
  statusCode: HttpStatusCode
  body?: ResBody
}

export type HttpMethod = 'get' | 'post' | 'put' | 'delete'

export type HttpRequest<ReqBody, ReqHeaders> = {
  url: string
  method: HttpMethod
  body?: ReqBody
  headers?: ReqHeaders
}

export interface HttpClient<ReqBody, ReqHeaders, ResBody> {
  request: (data: HttpRequest<ReqBody, ReqHeaders>) => Promise<HttpResponse<ResBody>>
}
