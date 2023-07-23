import axios from 'axios'
import { AxiosHttpClient } from '@/infra/http/AxiosHttpClient'
import { mockHttpPostParams } from '../../data/mocks'
import { mockPostAxiosResponse } from '../mocks/mockAxios'
import type { PostAxiosResponse } from '../mocks/mockAxios'

jest.mock('axios', () => ({
  async post (): Promise<PostAxiosResponse> {
    return mockPostAxiosResponse()
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
  test('Should call axios.post with correct values', async () => {
    const { sut } = makeSut()
    const postSpy = jest.spyOn(axios, 'post')
    const httpPostParams = mockHttpPostParams()
    await sut.post(httpPostParams)
    expect(postSpy).toHaveBeenCalledWith(httpPostParams.url, httpPostParams.body)
  })

  test('Should return correct values on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.post(mockHttpPostParams())
    expect(httpResponse).toEqual({
      statusCode: mockPostAxiosResponse().status,
      body: mockPostAxiosResponse().data
    })
  })

  test('Should return correct values on failure', async () => {
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
