import React from 'react'
import styles from './inputStyles.scss'

interface Props extends React.ComponentPropsWithoutRef<'input'> {
  setValue: React.Dispatch<React.SetStateAction<string>>
}

const Input: React.FC<Props> = (props) => {
  const { setValue } = props

  return (
    <div className={styles.inputWrapper}>
      <input data-testid={props.name} {...props} onChange={(e) => { setValue(e.target.value) }}/>
      <span data-testid={`${props.name}Status`} title={props.title}>🔴</span>
    </div>
  )
}

export default Input
