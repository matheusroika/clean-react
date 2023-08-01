import { AccessDeniedError } from '@/domain/errors'
import { useLogout } from './useLogout'

type Callback = (error: Error) => void
type ErrorHandler = (error: Error) => void
export const useErrorHandler = (callback: Callback): ErrorHandler => {
  const logout = useLogout()

  const errorHandler = (error: Error): void => {
    if (error instanceof AccessDeniedError) {
      logout()
    } else {
      callback(error)
    }
  }

  return errorHandler
}
