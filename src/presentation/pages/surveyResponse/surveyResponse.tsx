import React from 'react'
import FlipMove from 'react-flip-move'
import styles from './surveyResponseStyles.scss'
import Header from '@/presentation/components/header/header'
import Footer from '@/presentation/components/footer/footer'
import Loading from '@/presentation/components/loading/loading'

const SurveyResponse: React.FC = () => {
  return (
    <div className={styles.surveyResponse}>
      <Header />
      <main>
        <h1>Qual sua plataforma de cursos preferida?</h1>
        <FlipMove className={styles.answers}>
          <li>
            <img src="https://clean-node-api-rlnz.onrender.com/static/img/aws.webp" alt="Amazon Web Services (AWS)" />
            <span className={styles.answer}>Amazon Web Services (AWS)</span>
            <span className={styles.percent}>50%</span>
          </li>

          <li className={styles.userAnswer}>
            <img src="https://clean-node-api-rlnz.onrender.com/static/img/aws.webp" alt="Amazon Web Services (AWS)" />
            <span className={styles.answer}>Amazon Web Services (AWS)</span>
            <span className={styles.percent}>50%</span>
          </li>

          <li>
            <img src="https://clean-node-api-rlnz.onrender.com/static/img/aws.webp" alt="Amazon Web Services (AWS)" />
            <span className={styles.answer}>Amazon Web Services (AWS)</span>
            <span className={styles.percent}>50%</span>
          </li>
        </FlipMove>
        <button>Voltar</button>
        <Loading />
      </main>
      <Footer />
    </div>
  )
}

export default SurveyResponse
