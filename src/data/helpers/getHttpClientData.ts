import type { Account } from '@/domain/models/Account'
import type { HttpMethod, HttpRequest } from '../protocols/http'

export type Headers = {
  'x-access-token': string
}

export const getHttpClientData = (url: string, method: HttpMethod, account: Account): HttpRequest<undefined, Headers> => {
  let httpClientData: HttpRequest<undefined, Headers> = { url, method }
  /* istanbul ignore next */
  if (account?.accessToken && account?.name && account?.email) {
    httpClientData = {
      ...httpClientData,
      headers: {
        'x-access-token': account.accessToken
      }
    }
  }
  return httpClientData
}
