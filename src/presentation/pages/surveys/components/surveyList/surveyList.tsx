import React from 'react'
import './surveyListStyles.scss'
import { type Survey } from '@/domain/models/Survey'
import SurveyItem from '../surveyItem/surveyItem'
import EmptySurveyItem from '../emptySurveyItem/emptySurveyItem'

type Props = {
  surveys: Survey[]
}

const SurveyList: React.FC<Props> = ({ surveys }) => {
  return (
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
  )
}

export default SurveyList
