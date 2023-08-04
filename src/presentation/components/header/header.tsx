import React, { useContext } from 'react'
import apiContext from '@/presentation/contexts/apiContext'
import styles from './headerStyles.scss'
import Logo from '../logo/logo'
import { useLogout } from '@/presentation/hooks/useLogout'

const Header: React.FC = () => {
  const logout = useLogout()
  const { getCurrentAccount } = useContext(apiContext)

  return (
    <header className={styles.header}>
      <div>
        <Logo />
        <div className={styles.profile}>
          <span data-testid='userName'>{getCurrentAccount().name}</span>
          <button data-testid='logout' onClick={logout}>Sair</button>
        </div>
      </div>
    </header>
  )
}

export default Header
