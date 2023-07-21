import React from 'react'
import styles from './inputStyles.scss'

interface Props extends React.ComponentPropsWithoutRef<'input'> {}

const Input: React.FC<Props> = (props) => {
  return (
    <div className={styles.inputWrapper}>
      <input {...props} />
      <span data-testid={`${props.name}Status`} title={props.title}>🔴</span>
    </div>
  )
}

export default Input
