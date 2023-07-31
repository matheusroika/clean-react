import React from 'react'
import styles from './surveyItemStyles.scss'
import AnsweredIcon from '@/presentation/components/answeredIcon/answeredIcon'
import { type Survey } from '@/domain/models/Survey'

type Props = {
  survey: Survey
}

const SurveyItem: React.FC<Props> = ({ survey }) => {
  return (
    <li>
      <div>
        <AnsweredIcon iconName='thumbsDown' className={styles.icon} />
        <time>
          <span data-testid='day' className={styles.day}>03</span>
          <span data-testid='month' className={styles.month}>jul</span>
          <span data-testid='year' className={styles.year}>2023</span>
        </time>
        <p data-testid='question'>{survey.question}</p>
      </div>
      <footer data-testid='result'>Ver resultado</footer>
    </li>
  )
}

export default SurveyItem
