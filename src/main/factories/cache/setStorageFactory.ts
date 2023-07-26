import type { SetStorage } from '@/data/protocols/local/setStorage'
import { LocalStorageAdapter } from '@/infra/cache/localStorageAdapter'

export const makeSetStorage = (): SetStorage => {
  return new LocalStorageAdapter()
}
