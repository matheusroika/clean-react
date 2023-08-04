import React, { useEffect, useState } from 'react'
import FlipMove from 'react-flip-move'
import styles from './surveyResponseStyles.scss'
import Header from '@/presentation/components/header/header'
import Footer from '@/presentation/components/footer/footer'
import Loading from '@/presentation/components/loading/loading'
import Calendar from '@/presentation/components/calendar/calendar'
import Error from '@/presentation/components/error/error'
import type { SurveyResponse as SurveyResponseModel } from '@/domain/models/SurveyResponse'
import type { LoadSurveyResponse } from '@/domain/useCases/LoadSurveyResponse'

type Props = {
  loadSurveyResponse: LoadSurveyResponse
}

const SurveyResponse: React.FC<Props> = ({ loadSurveyResponse }) => {
  const [isLoading] = useState(false)
  const [error] = useState('')
  const [surveyResponse] = useState<SurveyResponseModel>(null)

  const loadAndSetSurveyResponse = async (): Promise<void> => {
    await loadSurveyResponse.load()
  }

  useEffect(() => {
    void loadAndSetSurveyResponse()
  }, [])

  return (
    <div className={styles.surveyResponse}>
      <Header />
      <main data-testid="surveyResponse">
        {surveyResponse && <>
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
        </>}
        {isLoading && <Loading />}
        {error && <Error error={error} tryAgainMethod={async () => {}} />}
      </main>
      <Footer />
    </div>
  )
}

export default SurveyResponse
