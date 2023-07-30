import { UnexpectedError } from '@/domain/errors'
import type { Account } from '@/domain/models/Account'
import type { SaveCurrentAccount } from '@/domain/useCases/SaveCurrentAccount'

interface SetStorage {
  set: (key: string, value: any) => Promise<void>
}

export class LocalSaveCurrentAccount implements SaveCurrentAccount {
  constructor (
    private readonly setStorage: SetStorage
  ) {}

  async save (account: Account): Promise<void> {
    if (!account?.accessToken || !account?.name || !account?.email) throw new UnexpectedError()
    await this.setStorage.set('account', JSON.stringify(account))
  }
}
