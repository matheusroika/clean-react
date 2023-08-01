import React from 'react'
import styles from './surveysMessageStyles.scss'

type Props = {
  message: string
}

const SurveysMessage: React.FC<Props> = ({ message }) => {
  return (
    <div className={styles.surveysMessage}>
      <span data-testid='message'>{message}</span>
    </div>
  )
}

export default SurveysMessage
