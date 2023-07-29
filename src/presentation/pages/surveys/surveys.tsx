import React from 'react'
import styles from './surveysStyles.scss'
import Logo from '@/presentation/components/logo/logo'
import Footer from '@/presentation/components/footer/footer'

const Surveys: React.FC = () => {
  return (
    <div className={styles.surveys}>
      <header>
        <div>
          <Logo />
          <div className={styles.profile}>
            <span>Nome do usuário</span>
            <button>Sair</button>
          </div>
        </div>
      </header>
      <main>
        <h1>Enquetes</h1>
        <ul>
          <li>
            <div>
              <time>
                <span className={styles.day}>22</span>
                <span className={styles.month}>07</span>
                <span className={styles.year}>2023</span>
              </time>
              <p>Qual é seu framework web favorito?</p>
            </div>
            <footer>Ver resultado</footer>
          </li>
        </ul>
      </main>
      <Footer />
    </div>
  )
}

export default Surveys
