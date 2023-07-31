import type { SetStorage } from '@/data/protocols/cache/setStorage'

export const mockSetStorage = (): SetStorage => {
  class SetStorageStub implements SetStorage {
    set (key: string, value: any): void {}
  }
  return new SetStorageStub()
}
