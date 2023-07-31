import { LocalStorageAdapter } from '@/infra/cache/localStorageAdapter'
import type { SetStorage } from '@/data/protocols/cache/setStorage'

export const makeLocalStorageAdapter = (): SetStorage => {
  return new LocalStorageAdapter()
}
