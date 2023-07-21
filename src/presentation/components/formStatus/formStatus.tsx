import React from 'react'
import styles from './formStatusStyles.scss'
import Spinner from '../loader/loader'

const FormStatus: React.FC = () => {
  return (
    <div className={styles.modalWrapper}>
      <Spinner className={styles.loader} />
      <span className={styles.message}>Erro</span>
    </div>
  )
}

export default FormStatus
