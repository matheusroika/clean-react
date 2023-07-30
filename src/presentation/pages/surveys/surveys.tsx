import React from 'react'
import styles from './surveysStyles.scss'
import Header from '@/presentation/components/header/header'
import Footer from '@/presentation/components/footer/footer'
import AnsweredIcon from '@/presentation/components/answeredIcon/answeredIcon'

const Surveys: React.FC = () => {
  return (
    <div className={styles.surveys}>
      <Header />
      <main>
        <h1>Enquetes</h1>
        <ul>
          <li>
            <div>
              <AnsweredIcon iconName='thumbsDown' className={styles.icon} />
              <time>
                <span className={styles.day}>22</span>
                <span className={styles.month}>JUL</span>
                <span className={styles.year}>2023</span>
              </time>
              <p>Qual é seu framework web favorito?</p>
            </div>
            <footer>Ver resultado</footer>
          </li>
          <li></li>
        </ul>
      </main>
      <Footer />
    </div>
  )
}

export default Surveys
