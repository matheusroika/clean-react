import type { HttpPostClient } from 'data/protocols/HttpPostClient'

export const mockHttpPostClient = (): HttpPostClient => {
  class HttpPostClientStub implements HttpPostClient {
    async post (url: string): Promise<void> {
    }
  }

  return new HttpPostClientStub()
}
