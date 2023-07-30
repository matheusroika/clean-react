import { LocalStorageAdapter } from '@/infra/cache/localStorageAdapter'
import type { SetStorage } from '@/data/protocols/local/setStorage'

export const makeLocalStorageAdapter = (): SetStorage => {
  return new LocalStorageAdapter()
}
