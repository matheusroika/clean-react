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
    if (!account) throw new UnexpectedError()
    const { accessToken } = account
    if (!accessToken) throw new UnexpectedError()
    await this.setStorage.set('accessToken', accessToken)
  }
}
