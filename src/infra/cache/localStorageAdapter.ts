import type { SetStorage } from '@/data/protocols/cache/setStorage'

export class LocalStorageAdapter implements SetStorage {
  set (key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value))
  }
}
