import { HttpStatusCode } from '@/data/protocols/http'
import type { AxiosResponse } from 'axios'

export type PostAxiosResponse = Omit<AxiosResponse, 'config' | 'headers' | 'statusText'>

export const mockPostAxiosResponse = (): PostAxiosResponse => ({
  status: HttpStatusCode.ok,
  data: {}
})
