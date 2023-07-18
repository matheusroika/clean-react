import axios from 'axios'
import { AxiosHttpClient } from '@/infra/http/AxiosHttpClient'
import { HttpStatusCode } from '@/data/protocols/http'
import { mockAuthParams } from '../../domain/mocks'
import type { AxiosResponse } from 'axios'

type MyAxiosResponse = Omit<AxiosResponse, 'config' | 'headers' | 'statusText'>

jest.mock('axios', () => ({
  async post (): Promise<MyAxiosResponse> {
    return {
      status: HttpStatusCode.ok,
      data: {}
    }
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
    const body = mockAuthParams()
    await sut.post({
      url: 'any_url',
      body
    })
    expect(postSpy).toHaveBeenCalledWith('any_url', body)
  })

  test('Should return correct values on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.post({
      url: 'any_url',
      body: mockAuthParams()
    })
    expect(httpResponse).toEqual({
      statusCode: HttpStatusCode.ok,
      body: {}
    })
  })
})
