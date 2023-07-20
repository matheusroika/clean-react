import React from 'react'
import styles from './loginStyles.scss'
import Spinner from '@/presentation/components/loader/loader'
import Logo from '@/presentation/components/logo/logo'

const Login: React.FC = () => {
  return (
    <div className={styles.login}>
      <header className={styles.header}>
        <Logo />
        <h1>Clean React Enquetes</h1>
      </header>
      <main>
        <form className={styles.form}>
          <h2>Login</h2>
          <div className={styles.inputWrapper}>
            <input type="email" name="email" placeholder="Digite seu e-mail" />
            <span>🔴</span>
          </div>

          <div className={styles.inputWrapper}>
            <input type="password" name="password" placeholder="Digite sua senha" />
            <span>🔴</span>
          </div>
          <button type="submit">Entrar</button>
          <span className={styles.link}><a href="">Criar conta</a></span>
          <div className={styles.modalWrapper}>
            <Spinner className={styles.loader} />
            <span className={styles.message}>Erro</span>
          </div>
        </form>
      </main>
      <footer className={styles.footer} />
    </div>
  )
}

export default Login
