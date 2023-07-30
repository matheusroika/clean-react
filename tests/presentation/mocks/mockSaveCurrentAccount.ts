import type { SaveCurrentAccount } from '@/domain/useCases/SaveCurrentAccount'
import type { Account } from '@/domain/models/Account'

export const mockSaveCurrentAccount = (): SaveCurrentAccount => {
  class SaveCurrentAccountStub implements SaveCurrentAccount {
    async save (account: Account): Promise<void> {}
  }
  return new SaveCurrentAccountStub()
}
