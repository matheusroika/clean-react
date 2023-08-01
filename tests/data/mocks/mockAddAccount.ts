import type { Account } from '@/domain/models/Account'
import type { AddAccount, AddAccountParams } from '@/domain/useCases/AddAccount'

export const mockAddAccount = (): AddAccount => {
  class AddAccountStub implements AddAccount {
    async add (params: AddAccountParams): Promise<Account> {
      return {
        accessToken: 'any_token',
        email: 'any@email.com',
        name: 'Any Name'
      }
    }
  }
  return new AddAccountStub()
}
