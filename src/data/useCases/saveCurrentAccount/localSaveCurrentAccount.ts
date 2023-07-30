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
    if (!account?.accessToken) throw new UnexpectedError()
    const { accessToken } = account
    await this.setStorage.set('accessToken', accessToken)
  }
}
