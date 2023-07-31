import React, { useEffect, useState } from 'react'
import styles from './surveysStyles.scss'
import Header from '@/presentation/components/header/header'
import Footer from '@/presentation/components/footer/footer'
import { type LoadSurveys } from '@/domain/useCases/LoadSurveys'
import { type Survey } from '@/domain/models/Survey'
import SurveyList from './components/surveyList/surveyList'
import SurveysError from './components/surveysError/surveysError'

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
          ? <SurveysError error={error} />
          : <SurveyList surveys={surveys} />
        }
      </main>
      <Footer />
    </div>
  )
}

export default Surveys
