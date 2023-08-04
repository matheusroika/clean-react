import React from 'react'
import styles from './surveyItemStyles.scss'
import AnsweredIcon from '@/presentation/pages/surveys/components/answeredIcon/answeredIcon'
import { type Survey } from '@/domain/models/Survey'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

type Props = {
  survey: Survey
}

const SurveyItem: React.FC<Props> = ({ survey }) => {
  const [formattedDay, formattedMonth, formattedYear] = format(new Date(survey.date), 'dd-LLL-y', { locale: ptBR }).split('-')
  return (
    <li className={styles.surveyItem}>
      <div>
        <AnsweredIcon iconName={survey.answered ? 'thumbsUp' : 'thumbsDown'} className={styles.icon} />
        <time>
          <span data-testid='day' className={styles.day}>{formattedDay}</span>
          <span data-testid='month' className={styles.month}>{formattedMonth}</span>
          <span data-testid='year' className={styles.year}>{formattedYear}</span>
        </time>
        <p data-testid='question'>{survey.question}</p>
      </div>
      <footer data-testid='result'>Ver resultado</footer>
    </li>
  )
}

export default SurveyItem
