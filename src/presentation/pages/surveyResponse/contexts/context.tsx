import { createContext } from 'react'

type Props = {
  answer: string
}

export default createContext<Props>({ answer: '' })
