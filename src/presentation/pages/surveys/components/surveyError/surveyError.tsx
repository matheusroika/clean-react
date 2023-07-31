import React from 'react'
import './surveyErrorStyles.scss'

type Props = {
  error: string
}

const SurveyError: React.FC<Props> = ({ error }) => {
  return (
    <div>
      <span data-testid='error'>{error}</span>
      <button>Tentar novamente</button>
    </div>
  )
}

export default SurveyError
