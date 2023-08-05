import React from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './responseStyles.scss'
import FlipMove from 'react-flip-move'
import Calendar from '@/presentation/components/calendar/calendar'
import Answer from '../answer/answer'
import type { SurveyResponse } from '@/domain/models/SurveyResponse'
import type { SaveSurveyResponseParams } from '@/domain/useCases/SaveSurveyResponse'

type Props = {
  surveyResponse: SurveyResponse
  saveAndSetSurveyResponse: (params: SaveSurveyResponseParams) => Promise<void>
}

const Response: React.FC<Props> = ({ surveyResponse, saveAndSetSurveyResponse }) => {
  const navigate = useNavigate()
  return (
    <>
      <hgroup data-testid="title" className={styles.title}>
        <Calendar date={new Date(surveyResponse.survey.date)} className={styles.calendar}/>
        <h1 data-testid="question">{surveyResponse.survey.question}</h1>
      </hgroup>
      <FlipMove data-testid="answers" className={styles.answers}>
        {surveyResponse.survey.answers.map(answer =>
          <Answer key={answer.answer} answer={answer} saveAndSetSurveyResponse={saveAndSetSurveyResponse} />
        )}
      </FlipMove>
      <button data-testid="back" className={styles.backButton} onClick={() => { navigate('/') }}>Voltar</button>
    </>
  )
}

export default Response
