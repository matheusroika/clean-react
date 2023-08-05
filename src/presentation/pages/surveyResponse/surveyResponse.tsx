import React, { useEffect, useState } from 'react'
import styles from './surveyResponseStyles.scss'
import { useErrorHandler } from '@/presentation/hooks/useErrorHandler'
import Header from '@/presentation/components/header/header'
import Footer from '@/presentation/components/footer/footer'
import Response from './components/response/response'
import Loading from '@/presentation/components/loading/loading'
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
        {surveyResponse && <Response surveyResponse={surveyResponse} />}
        {isLoading && <Loading />}
        {error && <Error error={error} tryAgainMethod={loadAndSetSurveyResponse} />}
      </main>
      <Footer />
    </div>
  )
}

export default SurveyResponse
