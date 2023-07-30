import type { SetStorage } from '@/data/protocols/local/setStorage'

export class LocalStorageAdapter implements SetStorage {
  set (key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value))
  }
}
