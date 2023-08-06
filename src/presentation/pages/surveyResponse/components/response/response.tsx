import React from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './responseStyles.scss'
import { Flipper, Flipped } from 'react-flip-toolkit'
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
      <Flipper className={styles.answers} flipKey={surveyResponse.survey.answers.map(answer => answer.answer).join('')}>
        <ul data-testid="answers">
        {surveyResponse.survey.answers.map(answer =>
          <Flipped key={answer.answer} flipId={answer.answer}>
            {flippedProps => <Answer answer={answer} saveAndSetSurveyResponse={saveAndSetSurveyResponse} flippedProps={flippedProps} />}
          </Flipped>
        )}
        </ul>
      </Flipper>
      <button data-testid="back" className={styles.backButton} onClick={() => { navigate('/') }}>Voltar</button>
    </>
  )
}

export default Response
