import axios from 'axios'
import { AxiosHttpClient } from '@/infra/http/AxiosHttpClient'

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
  test('Should call axios.post with correct URL', async () => {
    const { sut } = makeSut()
    const postSpy = jest.spyOn(axios, 'post')
    await sut.post({ url: 'any_url' })
    expect(postSpy).toHaveBeenCalledWith('any_url')
  })
})
