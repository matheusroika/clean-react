import React, { useEffect, useState } from 'react'
import styles from './surveysStyles.scss'
import Header from '@/presentation/components/header/header'
import Footer from '@/presentation/components/footer/footer'
import SurveyList from './components/surveyList/surveyList'
import Error from '../../components/error/error'
import { type LoadSurveys } from '@/domain/useCases/LoadSurveys'
import { type Survey } from '@/domain/models/Survey'
import { useErrorHandler } from '@/presentation/hooks/useErrorHandler'

type Props = {
  loadSurveys: LoadSurveys
}

const Surveys: React.FC<Props> = ({ loadSurveys }) => {
  const handleError = useErrorHandler((error: Error) => { setError(error.message) })
  const [surveys, setSurveys] = useState<Survey[]>(null)
  const [error, setError] = useState('')

  const loadAndSetSurveys = async (): Promise<void> => {
    try {
      const loadedSurveys = await loadSurveys.loadAll()
      setSurveys(loadedSurveys)
      setError('')
    } catch (error) {
      const typedError = error as Error
      handleError(typedError)
    }
  }

  useEffect(() => {
    void loadAndSetSurveys()
  }, [])

  return (
    <div className={styles.surveys}>
      <Header />
      <main>
        <h1>Enquetes</h1>
        {error
          ? <Error error={error} tryAgainMethod={loadAndSetSurveys} />
          : <SurveyList surveys={surveys} />
        }
      </main>
      <Footer />
    </div>
  )
}

export default Surveys
