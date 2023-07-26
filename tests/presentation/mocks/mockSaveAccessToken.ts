import type { SaveAccessToken } from '@/domain/useCases/SaveAccessToken'

export const mockSaveAccessToken = (): SaveAccessToken => {
  class SaveAccessTokenStub implements SaveAccessToken {
    async save (accessToken: string): Promise<void> {}
  }
  return new SaveAccessTokenStub()
}
