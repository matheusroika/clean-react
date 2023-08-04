import React from 'react'
import styles from './surveyItemStyles.scss'
import AnsweredIcon from '@/presentation/pages/surveys/components/answeredIcon/answeredIcon'
import { type Survey } from '@/domain/models/Survey'
import Calendar from '@/presentation/components/calendar/calendar'

type Props = {
  survey: Survey
}

const SurveyItem: React.FC<Props> = ({ survey }) => {
  return (
    <li className={styles.surveyItem}>
      <div>
        <AnsweredIcon iconName={survey.answered ? 'thumbsUp' : 'thumbsDown'} className={styles.icon} />
        <Calendar date={new Date(survey.date)} className={styles.calendar} />
        <p data-testid='question'>{survey.question}</p>
      </div>
      <footer data-testid='result'>Ver resultado</footer>
    </li>
  )
}

export default SurveyItem
