import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import apiContext from '@/presentation/contexts/apiContext'
import styles from './headerStyles.scss'
import Logo from '../logo/logo'

const Header: React.FC = () => {
  const { setCurrentAccount } = useContext(apiContext)
  const navigate = useNavigate()

  const logout = (): void => {
    setCurrentAccount(null)
    navigate('/login')
  }

  return (
    <header>
      <div>
        <Logo />
        <div className={styles.profile}>
          <span>Nome do usuário</span>
          <button data-testid='logout' onClick={logout}>Sair</button>
        </div>
      </div>
    </header>
  )
}

export default Header
