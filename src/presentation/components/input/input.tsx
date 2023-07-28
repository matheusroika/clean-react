import React from 'react'
import styles from './inputStyles.scss'

interface Props extends React.ComponentPropsWithoutRef<'input'> {
  setValue: React.Dispatch<React.SetStateAction<string>>
}

const Input: React.FC<Props> = (props) => {
  const { setValue } = props

  return (
    <div className={styles.inputWrapper}>
      <input
        {...props}
        data-testid={props.name}
        id={props.name}
        onChange={(e) => { setValue(e.target.value) }}
        placeholder=""
      />
      <label htmlFor={props.name}>{props.placeholder}</label>
      <span data-testid={`${props.name}Status`} title={props.title || 'Tudo certo!'}>{props.title ? '🔴' : '🟢'}</span>
    </div>
  )
}

export default Input
