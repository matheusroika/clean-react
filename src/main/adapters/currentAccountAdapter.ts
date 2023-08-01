import { makeLocalStorageAdapter } from '../factories/cache/localStorageAdapterFactory'
import type { Account } from '@/domain/models/Account'

export const setCurrentAccountAdapter = (account: Account): void => {
  makeLocalStorageAdapter().set('account', account)
}

export const getCurrentAccountAdapter = (): Account => {
  return makeLocalStorageAdapter().get('account')
}
