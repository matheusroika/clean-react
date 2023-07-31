import React from 'react'
import './surveysErrorStyles.scss'

type Props = {
  error: string
  tryAgainMethod: () => Promise<void>
}

const SurveysError: React.FC<Props> = ({ error, tryAgainMethod }) => {
  return (
    <div>
      <span data-testid='error'>{error}</span>
      <button data-testid='retry' onClick={tryAgainMethod}>Tentar novamente</button>
    </div>
  )
}

export default SurveysError
