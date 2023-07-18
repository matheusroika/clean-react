import axios from 'axios'
import { AxiosHttpClient } from '@/infra/http/AxiosHttpClient'
import { mockAuthParams } from '../../domain/mocks'

jest.mock('axios')

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
})
