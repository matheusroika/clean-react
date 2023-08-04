import React from 'react'
import styles from './loadingStyles.scss'
import Loader from '../loader/loader'

const Loading: React.FC = () => {
  return (
    <div data-testid="loading" className={styles.loadingWrapper}>
      <div className={styles.loading}>
        <span>Aguarde...</span>
        <Loader isWhite />
      </div>
    </div>
  )
}

export default Loading
