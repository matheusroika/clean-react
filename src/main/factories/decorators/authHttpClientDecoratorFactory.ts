import { AuthHttpClientDecorator } from '@/main/decorators/authHttpClientDecorator'
import { makeLocalStorageAdapter } from '../cache/localStorageAdapterFactory'
import { makeAxiosHttpClient } from '../http/axiosHttpClientFactory'

export const makeAuthHttpClientDecorator = (): AuthHttpClientDecorator => {
  return new AuthHttpClientDecorator(makeLocalStorageAdapter(), makeAxiosHttpClient())
}
