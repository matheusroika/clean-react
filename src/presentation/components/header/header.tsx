import React from 'react'
import styles from './headerStyles.scss'
import Logo from '../logo/logo'

const Header: React.FC = () => {
  return (
    <header>
      <div>
        <Logo />
        <div className={styles.profile}>
          <span>Nome do usuário</span>
          <button>Sair</button>
        </div>
      </div>
    </header>
  )
}

export default Header
