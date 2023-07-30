import { LocalSaveCurrentAccount } from '@/data/useCases/saveCurrentAccount/localSaveCurrentAccount'
import { makeSetStorage } from '../../cache/setStorageFactory'

export const makeLocalSaveCurrentAccount = (): LocalSaveCurrentAccount => {
  return new LocalSaveCurrentAccount(makeSetStorage())
}
