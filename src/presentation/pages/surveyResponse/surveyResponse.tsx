import React from 'react'
import FlipMove from 'react-flip-move'
import styles from './surveyResponseStyles.scss'
import Header from '@/presentation/components/header/header'
import Footer from '@/presentation/components/footer/footer'
import Loading from '@/presentation/components/loading/loading'
import Calendar from '@/presentation/components/calendar/calendar'

const SurveyResponse: React.FC = () => {
  return (
    <div className={styles.surveyResponse}>
      <Header />
      <main>
        <hgroup>
          <Calendar date={new Date()} className={styles.calendar}/>
          <h1>Qual sua plataforma de cursos preferida?</h1>
        </hgroup>
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
        {false && <Loading />}
      </main>
      <Footer />
    </div>
  )
}

export default SurveyResponse
