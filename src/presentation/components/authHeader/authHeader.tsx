import React from 'react'
import styles from './authHeaderStyles.scss'
import Logo from '../logo/logo'

const AuthHeader: React.FC = () => {
  return (
    <header className={styles.header}>
      <Logo />
      <h1>Clean React Enquetes</h1>
    </header>
  )
}

export default AuthHeader
