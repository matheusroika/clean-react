import React from 'react'
import './surveysErrorStyles.scss'

type Props = {
  error: string
}

const SurveysError: React.FC<Props> = ({ error }) => {
  return (
    <div>
      <span data-testid='error'>{error}</span>
      <button>Tentar novamente</button>
    </div>
  )
}

export default SurveysError
