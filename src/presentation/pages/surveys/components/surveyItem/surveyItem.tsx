import React from 'react'
import styles from './surveyItemStyles.scss'
import AnsweredIcon from '@/presentation/components/answeredIcon/answeredIcon'

const SurveyItem: React.FC = () => {
  return (
    <li>
      <div>
        <AnsweredIcon iconName='thumbsDown' className={styles.icon} />
        <time>
          <span className={styles.day}>22</span>
          <span className={styles.month}>JUL</span>
          <span className={styles.year}>2023</span>
        </time>
        <p>Qual é seu framework web favorito?</p>
      </div>
      <footer>Ver resultado</footer>
    </li>
  )
}

export default SurveyItem
