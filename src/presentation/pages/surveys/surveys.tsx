import React, { useEffect, useState } from 'react'
import styles from './surveysStyles.scss'
import Header from '@/presentation/components/header/header'
import Footer from '@/presentation/components/footer/footer'
import EmptySurveyItem from './components/emptySurveyItem/emptySurveyItem'
import { type LoadSurveys } from '@/domain/useCases/LoadSurveys'
import { type Survey } from '@/domain/models/Survey'
import SurveyItem from './components/surveyItem/surveyItem'

type Props = {
  loadSurveys: LoadSurveys
}

const Surveys: React.FC<Props> = ({ loadSurveys }) => {
  const [surveys, setSurveys] = useState<Survey[]>([])
  const [error, setError] = useState('')

  useEffect(() => {
    const loadAndSetSurveys = async (): Promise<void> => {
      try {
        const loadedSurveys = await loadSurveys.loadAll()
        setSurveys(loadedSurveys)
      } catch (error) {
        const typedError = error as Error
        setError(typedError.message)
      }
    }
    void loadAndSetSurveys()
  }, [])
  return (
    <div className={styles.surveys}>
      <Header />
      <main>
        <h1>Enquetes</h1>
        {error
          ? (
          <div>
            <span data-testid='error'>{error}</span>
            <button>Tentar novamente</button>
          </div>
            )
          : (
          <ul data-testid="surveyList">
          {surveys.length
            ? surveys.map(survey => (
              <SurveyItem survey={survey} key={survey.id} />
            ))
            : (
              <>
              <EmptySurveyItem />
              <EmptySurveyItem />
              <EmptySurveyItem />
              <EmptySurveyItem />
              </>
              )}
          </ul>
            )}
      </main>
      <Footer />
    </div>
  )
}

export default Surveys
