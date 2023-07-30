import type { Account } from '../models/Account'

export interface SaveCurrentAccount {
  save: (account: Account) => Promise<void>
}
