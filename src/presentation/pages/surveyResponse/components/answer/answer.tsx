import React from 'react'
import styles from './answerStyles.scss'
import type { Answer as AnswerModel } from '@/domain/models/Survey'

type Props = {
  answer: AnswerModel
}

const Answer: React.FC<Props> = ({ answer }) => {
  const className = answer.isCurrentAccountAnswer
    ? [styles.answerWrapper, styles.userAnswer].join(' ')
    : styles.answerWrapper

  return (
    <li data-testid="answerWrapper" key={answer.answer} className={className}>
      {answer.image && <img data-testid="image" src={answer.image} alt={answer.answer} />}
      <span data-testid="answer" className={styles.answer}>{answer.answer}</span>
      <span data-testid="percent" className={styles.percent}>{`${answer.percent.toString()}%`}</span>
    </li>
  )
}

export default Answer
