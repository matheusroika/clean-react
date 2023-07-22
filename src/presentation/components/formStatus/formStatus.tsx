import React from 'react'
import styles from './formStatusStyles.scss'
import Spinner from '../loader/loader'

type Props = {
  isLoading: boolean
  message: string
}

const FormStatus: React.FC<Props> = ({ isLoading, message }: Props) => {
  return (isLoading || message) && (
    <div data-testid="modalWrapper" className={styles.modalWrapper}>
      { isLoading && <Spinner data-testid="loader" className={styles.loader} /> }
      { message && <span data-testid="message" className={styles.message}>{message}</span> }
    </div>
  )
}

export default FormStatus
