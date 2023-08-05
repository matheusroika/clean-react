import { HttpStatusCode } from '@/data/protocols/http'
import type { AxiosResponse } from 'axios'

export type MyAxiosResponse = Omit<AxiosResponse, 'config' | 'headers' | 'statusText'>

export const mockAxiosResponse = (): MyAxiosResponse => ({
  status: HttpStatusCode.ok,
  data: {}
})

type Headers = {
  'x-access-token': string
}

export const mockHeaders = (): Headers => ({
  'x-access-token': 'any_token'
})
