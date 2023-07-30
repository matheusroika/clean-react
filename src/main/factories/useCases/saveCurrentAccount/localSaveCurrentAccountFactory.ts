import { LocalSaveCurrentAccount } from '@/data/useCases/saveCurrentAccount/localSaveCurrentAccount'
import { makeLocalStorageAdapter } from '../../cache/localStorageAdapterFactory'

export const makeLocalSaveCurrentAccount = (): LocalSaveCurrentAccount => {
  return new LocalSaveCurrentAccount(makeLocalStorageAdapter())
}
