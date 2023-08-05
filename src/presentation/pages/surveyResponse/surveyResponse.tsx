import React, { useEffect, useState } from 'react'
import FlipMove from 'react-flip-move'
import styles from './surveyResponseStyles.scss'
import { useErrorHandler } from '@/presentation/hooks/useErrorHandler'
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
  const handleError = useErrorHandler((error: Error) => { setError(error.message) })
  const [isLoading] = useState(false)
  const [error, setError] = useState('')
  const [surveyResponse, setSurveyResponse] = useState<SurveyResponseModel>(null)

  const loadAndSetSurveyResponse = async (): Promise<void> => {
    try {
      const surveyResponse = await loadSurveyResponse.load()
      setSurveyResponse(surveyResponse)
      setError('')
    } catch (error) {
      const typedError = error as Error
      setSurveyResponse(null)
      handleError(typedError)
    }
  }

  useEffect(() => {
    void loadAndSetSurveyResponse()
  }, [])

  return (
    <div className={styles.surveyResponse}>
      <Header />
      <main data-testid="surveyResponse">
        {surveyResponse && <>
          <hgroup data-testid="title">
            <Calendar date={surveyResponse.survey.date} className={styles.calendar}/>
            <h1 data-testid="question">{surveyResponse.survey.question}</h1>
          </hgroup>
          <FlipMove data-testid="answers" className={styles.answers}>
            {surveyResponse.survey.answers.map(answer =>
              <li data-testid="answerWrapper" key={answer.answer} className={answer.isCurrentAccountAnswer && styles.userAnswer}>
                {answer.image && <img data-testid="image" src={answer.image} alt={answer.answer} />}
                <span data-testid="answer" className={styles.answer}>{answer.answer}</span>
                <span data-testid="percent" className={styles.percent}>{`${answer.percent.toString()}%`}</span>
              </li>
            )}
          </FlipMove>
          <button data-testid="back">Voltar</button>
        </>}
        {isLoading && <Loading />}
        {error && <Error error={error} tryAgainMethod={async () => {}} />}
      </main>
      <Footer />
    </div>
  )
}

export default SurveyResponse
