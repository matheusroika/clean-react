import React from 'react'
import Surveys from '@/presentation/pages/surveys/surveys'
import { makeRemoteLoadSurveys } from '../../useCases/loadSurveys/remoteLoadSurveysFactory'

export const makeSurveys: React.FC = () => {
  return (
    <Surveys loadSurveys={makeRemoteLoadSurveys()} />
  )
}
