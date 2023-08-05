import axios from 'axios'
import { AxiosHttpClient } from '@/infra/http/AxiosHttpClient'
import { mockHttpRequest } from '../../data/mocks'
import { mockAxiosResponse } from '../mocks/mockAxios'
import type { MyAxiosResponse } from '../mocks/mockAxios'

jest.mock('axios', () => ({
  async request (): Promise<MyAxiosResponse> {
    return mockAxiosResponse()
  }
}))

type Sut = {
  sut: AxiosHttpClient
}

const makeSut = (): Sut => {
  const sut = new AxiosHttpClient()
  return {
    sut
  }
}

describe('Axios Http Client', () => {
  test('Should call axios.request with correct values', async () => {
    const { sut } = makeSut()
    const requestSpy = jest.spyOn(axios, 'request')
    const { body, ...httpRequest } = mockHttpRequest()
    await sut.request({ ...httpRequest, body })
    expect(requestSpy).toHaveBeenCalledWith({ ...httpRequest, data: body })
  })

  test('Should return correct response on axios.request success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.request(mockHttpRequest())
    expect(httpResponse).toEqual({
      statusCode: mockAxiosResponse().status,
      body: mockAxiosResponse().data
    })
  })

  test('Should return correct response on axios.request failure', async () => {
    const { sut } = makeSut()
    jest.spyOn(axios, 'request').mockRejectedValueOnce({
      response: mockAxiosResponse()
    })
    const httpResponse = await sut.request(mockHttpRequest())
    expect(httpResponse).toEqual({
      statusCode: mockAxiosResponse().status,
      body: mockAxiosResponse().data
    })
  })
})
