import React from 'react'
import './surveyListStyles.scss'
import { type Survey } from '@/domain/models/Survey'
import SurveyItem from '../surveyItem/surveyItem'
import EmptySurveyList from '../emptySurveyList/emptySurveyList'

type Props = {
  surveys: Survey[]
}

const SurveyList: React.FC<Props> = ({ surveys }) => {
  return (
    <ul data-testid="surveyList">
    {surveys.length
      ? surveys.map(survey => <SurveyItem survey={survey} key={survey.id} />)
      : <EmptySurveyList />
    }
    </ul>
  )
}

export default SurveyList
