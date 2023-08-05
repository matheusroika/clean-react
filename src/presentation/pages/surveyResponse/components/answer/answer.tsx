import React from 'react'
import styles from './answerStyles.scss'
import type { Answer as AnswerModel } from '@/domain/models/Survey'
import type { SaveSurveyResponseParams } from '@/domain/useCases/SaveSurveyResponse'

type Props = {
  answer: AnswerModel
  saveAndSetSurveyResponse: (params: SaveSurveyResponseParams) => Promise<void>
}

const Answer: React.FC<Props> = ({ answer, saveAndSetSurveyResponse }) => {
  const className = answer.isCurrentAccountAnswer
    ? [styles.answerWrapper, styles.userAnswer].join(' ')
    : styles.answerWrapper

  const handleClick = async (event: React.MouseEvent): Promise<void> => {
    if (event.currentTarget.classList.contains(styles.userAnswer)) return
    await saveAndSetSurveyResponse({ answer: answer.answer })
  }

  return (
    <li
      data-testid="answerWrapper"
      key={answer.answer}
      className={className}
      onClick={handleClick}
    >
      {answer.image && <img data-testid="image" src={answer.image} alt={answer.answer} />}
      <span data-testid="answer" className={styles.answer}>{answer.answer}</span>
      <span data-testid="percent" className={styles.percent}>{`${answer.percent.toString()}%`}</span>
    </li>
  )
}

export default Answer
