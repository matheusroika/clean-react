import { HttpStatusCode } from '@/data/protocols/http'
import type { AxiosResponse } from 'axios'

export type PostAxiosResponse = Omit<AxiosResponse, 'config' | 'headers' | 'statusText'>
export type GetAxiosResponse = Omit<AxiosResponse, 'config' | 'headers' | 'statusText'>

export const mockPostAxiosResponse = (): PostAxiosResponse => ({
  status: HttpStatusCode.ok,
  data: {}
})

export const mockGetAxiosResponse = (): PostAxiosResponse => ({
  status: HttpStatusCode.ok,
  data: {}
})

type Headers = {
  'x-access-token': string
}

export const mockHeaders = (): Headers => ({
  'x-access-token': 'any_token'
})
