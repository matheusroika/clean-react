import { mockAccount } from '../../domain/mocks'
import type { GetStorage } from '@/data/protocols/cache'

export const mockGetStorage = (): GetStorage => {
  class GetStorageStub implements GetStorage {
    get (key: string): any {
      return mockAccount()
    }
  }
  return new GetStorageStub()
}
