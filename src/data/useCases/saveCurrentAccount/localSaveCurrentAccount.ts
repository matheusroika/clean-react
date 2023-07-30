import { UnexpectedError } from '@/domain/errors'
import type { SaveCurrentAccount } from '@/domain/useCases/SaveCurrentAccount'
import type { SetStorage } from '@/data/protocols/local/setStorage'
import type { Account } from '@/domain/models/Account'

export class LocalSaveCurrentAccount implements SaveCurrentAccount {
  constructor (
    private readonly setStorage: SetStorage
  ) {}

  async save (account: Account): Promise<void> {
    if (!account?.accessToken || !account?.name || !account?.email) throw new UnexpectedError()
    this.setStorage.set('account', JSON.stringify(account))
  }
}
