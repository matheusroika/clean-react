import type { Account } from '@/domain/models/Account'

export const mockAccount = (): Account => ({
  email: 'any@email.com',
  name: 'Any Name',
  accessToken: 'any_token'
})
