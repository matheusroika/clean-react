import React from 'react'
import styles from './loginStyles.scss'
import Header from '@/presentation/components/authHeader/authHeader'
import Footer from '@/presentation/components/footer/footer'
import Input from '@/presentation/components/input/input'
import FormStatus from '@/presentation/components/formStatus/formStatus'

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
          <span className={styles.link}>
            <a href="">Criar conta</a>
          </span>
          <FormStatus />
        </form>
      </main>
      <Footer />
    </div>
  )
}

export default Login
