import React from 'react'
import { useParams } from 'react-router-dom'
import SurveyResponse from '@/presentation/pages/surveyResponse/surveyResponse'
import { makeRemoteLoadSurveyResponse } from '../../useCases/loadSurveyResponse/remoteLoadSurveyResponseFactory'
import { makeRemoteSaveSurveyResponse } from '../../useCases/saveSurveyResponse/remoteSaveSurveyResponseFactory'

export const makeSurveyResponse: React.FC = () => {
  const { id } = useParams()
  return (
    <SurveyResponse loadSurveyResponse={makeRemoteLoadSurveyResponse(id)} saveSurveyResponse={makeRemoteSaveSurveyResponse(id)} />
  )
}
