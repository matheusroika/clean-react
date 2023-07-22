import type { Account } from '@/domain/models/Account'
import type { AuthParams, Authentication } from '@/domain/useCases/Authentication'

export const mockAuthentication = (): Authentication => {
  class AuthenticationStub implements Authentication {
    async auth (params: AuthParams): Promise<Account> {
      return {
        accessToken: 'any_token',
        email: 'any@email.com',
        name: 'Any Name'
      }
    }
  }
  return new AuthenticationStub()
}
