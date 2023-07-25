import type { SetStorage } from '@/data/protocols/local/setStorage'

export class LocalStorageAdapter implements SetStorage {
  async set (key: string, value: any): Promise<void> {
    localStorage.setItem(key, value)
  }
}
