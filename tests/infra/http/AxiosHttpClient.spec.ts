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
  test('Should call axios with correct URL', async () => {
    const { sut } = makeSut()
    await sut.post({ url: 'any_url' })
    expect(axios).toHaveBeenCalledWith('any_url')
  })
})
