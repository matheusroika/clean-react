import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import apiContext from '@/presentation/contexts/apiContext'
import styles from './surveysStyles.scss'
import Header from '@/presentation/components/header/header'
import Footer from '@/presentation/components/footer/footer'
import SurveyList from './components/surveyList/surveyList'
import SurveysError from './components/surveysError/surveysError'
import { AccessDeniedError } from '@/domain/errors'
import { type LoadSurveys } from '@/domain/useCases/LoadSurveys'
import { type Survey } from '@/domain/models/Survey'

type Props = {
  loadSurveys: LoadSurveys
}

const Surveys: React.FC<Props> = ({ loadSurveys }) => {
  const { setCurrentAccount } = useContext(apiContext)
  const navigate = useNavigate()
  const [surveys, setSurveys] = useState<Survey[]>(null)
  const [error, setError] = useState('')

  const loadAndSetSurveys = async (): Promise<void> => {
    try {
      const loadedSurveys = await loadSurveys.loadAll()
      setSurveys(loadedSurveys)
      setError('')
    } catch (error) {
      if (error instanceof AccessDeniedError) {
        setCurrentAccount(null)
        navigate('/login')
      } else {
        const typedError = error as Error
        setError(typedError.message)
      }
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
          ? <SurveysError error={error} tryAgainMethod={loadAndSetSurveys} />
          : <SurveyList surveys={surveys} />
        }
      </main>
      <Footer />
    </div>
  )
}

export default Surveys
