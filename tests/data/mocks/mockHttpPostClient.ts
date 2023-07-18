import type { HttpPostClient, HttpPostParams } from '@/data/protocols/HttpPostClient'

export const mockHttpPostClient = (): HttpPostClient => {
  class HttpPostClientStub implements HttpPostClient {
    async post (params: HttpPostParams): Promise<void> {
    }
  }

  return new HttpPostClientStub()
}
