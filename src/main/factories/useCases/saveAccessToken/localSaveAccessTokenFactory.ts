import { LocalSaveAccessToken } from '@/data/useCases/saveAccessToken/localSaveAccessToken'
import { makeSetStorage } from '../../cache/setStorageFactory'

export const makeLocalSaveAccessToken = (): LocalSaveAccessToken => {
  return new LocalSaveAccessToken(makeSetStorage())
}
