import { makeLocalStorageAdapter } from '../factories/cache/localStorageAdapterFactory'
import { UnexpectedError } from '@/domain/errors'
import type { Account } from '@/domain/models/Account'

export const setCurrentAccountAdapter = (account: Account): void => {
  if (!account?.accessToken || !account?.name || !account?.email) throw new UnexpectedError()
  makeLocalStorageAdapter().set('account', account)
}
