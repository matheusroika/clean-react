import React from 'react'
import SurveyResponse from '@/presentation/pages/surveyResponse/surveyResponse'
import { makeRemoteLoadSurveyResponse } from '../../useCases/loadSurveyResponse/remoteLoadSurveyResponseFactory'
import { useParams } from 'react-router-dom'

export const makeSurveyResponse: React.FC = () => {
  const { id } = useParams()
  return (
    <SurveyResponse loadSurveyResponse={makeRemoteLoadSurveyResponse(id)} />
  )
}
