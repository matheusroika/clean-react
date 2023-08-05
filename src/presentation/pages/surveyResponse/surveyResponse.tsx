import React, { useContext, useEffect, useState } from 'react'
import styles from './surveyResponseStyles.scss'
import SurveyResponseContext from './contexts/context'
import { useErrorHandler } from '@/presentation/hooks/useErrorHandler'
import Header from '@/presentation/components/header/header'
import Footer from '@/presentation/components/footer/footer'
import Response from './components/response/response'
import Loading from '@/presentation/components/loading/loading'
import Error from '@/presentation/components/error/error'
import type { SurveyResponse as SurveyResponseModel } from '@/domain/models/SurveyResponse'
import type { LoadSurveyResponse } from '@/domain/useCases/LoadSurveyResponse'
import type { SaveSurveyResponse, SaveSurveyResponseParams } from '@/domain/useCases/SaveSurveyResponse'

type Props = {
  loadSurveyResponse: LoadSurveyResponse
  saveSurveyResponse: SaveSurveyResponse
}

const SurveyResponse: React.FC<Props> = ({ loadSurveyResponse, saveSurveyResponse }) => {
  const { answer } = useContext(SurveyResponseContext)
  const handleError = useErrorHandler((error: Error) => { setError(error.message) })
  const [isLoadLoading, setIsLoadLoading] = useState(false)
  const [isSaveLoading, setIsSaveLoading] = useState(false)
  const [error, setError] = useState('')
  const [useCaseError, setUseCaseError] = useState<'save' | 'load'>(null)
  const [surveyResponse, setSurveyResponse] = useState<SurveyResponseModel>(null)

  const saveAndSetSurveyResponse = async (params: SaveSurveyResponseParams): Promise<void> => {
    if (isSaveLoading) return
    setIsSaveLoading(true)
    try {
      const surveyResponse = await saveSurveyResponse.save(params)
      setSurveyResponse(surveyResponse)
      setUseCaseError(null)
      setError('')
      setIsSaveLoading(false)
    } catch (error) {
      const typedError = error as Error
      setSurveyResponse(null)
      setIsSaveLoading(false)
      setUseCaseError('save')
      handleError(typedError)
    }
  }

  const loadAndSetSurveyResponse = async (): Promise<void> => {
    if (isLoadLoading) return
    setIsLoadLoading(true)
    try {
      const surveyResponse = await loadSurveyResponse.load()
      setSurveyResponse(surveyResponse)
      setUseCaseError(null)
      setError('')
      setIsLoadLoading(false)
    } catch (error) {
      const typedError = error as Error
      setSurveyResponse(null)
      setIsLoadLoading(false)
      setUseCaseError('load')
      handleError(typedError)
    }
  }

  const tryAgainHandler = async (): Promise<void> => {
    if (useCaseError === 'load') await loadAndSetSurveyResponse()
    if (useCaseError === 'save') await saveAndSetSurveyResponse({ answer })
  }

  useEffect(() => {
    void loadAndSetSurveyResponse()
  }, [])

  return (
    <div className={styles.surveyResponse}>
      <Header />
      <SurveyResponseContext.Provider value={{ answer: '' }}>
        <main data-testid="surveyResponse">
          {surveyResponse && <Response surveyResponse={surveyResponse} saveAndSetSurveyResponse={saveAndSetSurveyResponse} />}
          {isSaveLoading && <Loading />}
          {error && <Error error={error} tryAgainMethod={tryAgainHandler} />}
        </main>
      </SurveyResponseContext.Provider>
      <Footer />
    </div>
  )
}

export default SurveyResponse
