import { createContext } from 'react'
import type { Account } from '@/domain/models/Account'

type Props = {
  setCurrentAccount: (account: Account) => void
}

export default createContext<Props>(null)
