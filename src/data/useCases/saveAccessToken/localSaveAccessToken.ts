import { UnexpectedError } from '@/domain/errors'
import type { SaveAccessToken } from '@/domain/useCases/SaveAccessToken'

interface SetStorage {
  set: (key: string, value: any) => Promise<void>
}

export class LocalSaveAccessToken implements SaveAccessToken {
  constructor (
    private readonly setStorage: SetStorage
  ) {}

  async save (accessToken: string): Promise<void> {
    if (!accessToken) throw new UnexpectedError()
    await this.setStorage.set('accessToken', accessToken)
  }
}
