import React from 'react'
import styles from './surveyListStyles.scss'
import { type Survey } from '@/domain/models/Survey'
import SurveyItem from '../surveyItem/surveyItem'
import EmptySurveyList from '../emptySurveyList/emptySurveyList'
import SurveysMessage from '../surveysMessage/surveysMessage'

type Props = {
  surveys: Survey[]
}

const SurveyList: React.FC<Props> = ({ surveys }) => {
  return (
    <ul data-testid="surveyList" className={styles.surveyList}>
    {surveys
      ? surveys.length
        ? surveys.map(survey => <SurveyItem survey={survey} key={survey.id} />)
        : <SurveysMessage message='Não existem enquetes no momento' />
      : <EmptySurveyList />
    }
    </ul>
  )
}

export default SurveyList
