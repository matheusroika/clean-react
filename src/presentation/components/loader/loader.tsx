import React from 'react'
import styles from './loaderStyles.scss'

interface Props extends React.ComponentPropsWithoutRef<'div'> {}

const Spinner: React.FC<Props> = (props) => {
  return (
    <div {...props} className={[styles.loader, props.className].join(' ')}>
      <div />
      <div />
      <div />
      <div />
    </div>
  )
}

export default Spinner
