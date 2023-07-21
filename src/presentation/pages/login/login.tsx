import React from 'react'
import styles from './loginStyles.scss'
import Spinner from '@/presentation/components/loader/loader'
import Header from '@/presentation/components/authHeader/authHeader'
import Footer from '@/presentation/components/footer/footer'
import Input from '@/presentation/components/input/input'

const Login: React.FC = () => {
  return (
    <div className={styles.login}>
      <Header />
      <main>
        <form className={styles.form}>
          <h2>Login</h2>
          <Input type="email" name="email" placeholder="Digite seu e-mail" />
          <Input type="password" name="password" placeholder="Digite sua senha" />
          <button type="submit">Entrar</button>
          <span className={styles.link}><a href="">Criar conta</a></span>
          <div className={styles.modalWrapper}>
            <Spinner className={styles.loader} />
            <span className={styles.message}>Erro</span>
          </div>
        </form>
      </main>
      <Footer />
    </div>
  )
}

export default Login
