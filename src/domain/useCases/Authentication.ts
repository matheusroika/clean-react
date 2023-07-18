import type { Account } from '@/domain/models/Account'

export type AuthParams = {
  email: string
  password: string
}

export interface Authentication {
  auth: (params: AuthParams) => Promise<Account>
}
