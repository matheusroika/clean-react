import type { SetStorage } from '@/data/protocols/local/setStorage'

export const mockSetStorage = (): SetStorage => {
  class SetStorageStub implements SetStorage {
    async set (key: string, value: any): Promise<void> {
    }
  }
  return new SetStorageStub()
}
