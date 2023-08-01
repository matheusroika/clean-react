import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import apiContext from '../contexts/apiContext'
import { AccessDeniedError } from '@/domain/errors'

type Callback = (error: Error) => void
type ErrorHandler = (error: Error) => void
export const useErrorHandler = (callback: Callback): ErrorHandler => {
  const { setCurrentAccount } = useContext(apiContext)
  const navigate = useNavigate()

  const errorHandler = (error: Error): void => {
    if (error instanceof AccessDeniedError) {
      setCurrentAccount(null)
      navigate('/login')
    } else {
      callback(error)
    }
  }

  return errorHandler
}
