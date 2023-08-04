import React from 'react'
import styles from './errorStyles.scss'

type Props = {
  error: string
  tryAgainMethod: () => Promise<void>
}

const Error: React.FC<Props> = ({ error, tryAgainMethod }) => {
  return (
    <div className={styles.surveysError}>
      <span data-testid='error'>{error}</span>
      <button data-testid='retry' onClick={tryAgainMethod}>Tentar novamente</button>
    </div>
  )
}

export default Error
