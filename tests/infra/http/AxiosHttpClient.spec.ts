import axios from 'axios'
import { AxiosHttpClient } from '@/infra/http/AxiosHttpClient'
import { mockHttpGetParams, mockHttpPostParams } from '../../data/mocks'
import { mockGetAxiosResponse, mockPostAxiosResponse } from '../mocks/mockAxios'
import type { GetAxiosResponse, PostAxiosResponse } from '../mocks/mockAxios'

jest.mock('axios', () => ({
  async post (): Promise<PostAxiosResponse> {
    return mockPostAxiosResponse()
  },
  async get (): Promise<GetAxiosResponse> {
    return mockGetAxiosResponse()
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
  describe('POST', () => {
    test('Should call axios.post with correct values', async () => {
      const { sut } = makeSut()
      const postSpy = jest.spyOn(axios, 'post')
      const httpPostParams = mockHttpPostParams()
      await sut.post(httpPostParams)
      expect(postSpy).toHaveBeenCalledWith(httpPostParams.url, httpPostParams.body)
    })

    test('Should return correct response on axios.post success', async () => {
      const { sut } = makeSut()
      const httpResponse = await sut.post(mockHttpPostParams())
      expect(httpResponse).toEqual({
        statusCode: mockPostAxiosResponse().status,
        body: mockPostAxiosResponse().data
      })
    })

    test('Should return correct response on axios.post failure', async () => {
      const { sut } = makeSut()
      jest.spyOn(axios, 'post').mockRejectedValueOnce({
        response: mockPostAxiosResponse()
      })
      const httpResponse = await sut.post(mockHttpPostParams())
      expect(httpResponse).toEqual({
        statusCode: mockPostAxiosResponse().status,
        body: mockPostAxiosResponse().data
      })
    })
  })

  describe('GET', () => {
    test('Should call axios.get with correct values', async () => {
      const { sut } = makeSut()
      const getSpy = jest.spyOn(axios, 'get')
      const httpGetParams = mockHttpGetParams()
      await sut.get(httpGetParams)
      expect(getSpy).toHaveBeenCalledWith(httpGetParams.url)
    })

    test('Should return correct response on axios.get success', async () => {
      const { sut } = makeSut()
      const httpResponse = await sut.get(mockHttpGetParams())
      expect(httpResponse).toEqual({
        statusCode: mockGetAxiosResponse().status,
        body: mockGetAxiosResponse().data
      })
    })
  })
})
