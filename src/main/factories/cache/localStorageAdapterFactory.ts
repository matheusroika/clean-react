import { LocalStorageAdapter } from '@/infra/cache/localStorageAdapter'

export const makeLocalStorageAdapter = (): LocalStorageAdapter => {
  return new LocalStorageAdapter()
}
