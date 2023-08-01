import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import apiContext from '../contexts/apiContext'

type LogoutHandler = () => void
export const useLogout = (): LogoutHandler => {
  const { setCurrentAccount } = useContext(apiContext)
  const navigate = useNavigate()

  const logoutHandler = (): void => {
    setCurrentAccount(null)
    navigate('/login')
  }

  return logoutHandler
}
