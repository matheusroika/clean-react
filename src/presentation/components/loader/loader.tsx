import React from 'react'
import styles from './loaderStyles.scss'

interface Props extends React.ComponentPropsWithoutRef<'div'> {
  isWhite?: boolean
}

const Loader: React.FC<Props> = (props) => {
  const { isWhite, ...rest } = props
  const whiteClass = isWhite ? styles.white : ''

  return (
    <div {...rest} className={[styles.loader, whiteClass, props.className].join(' ')}>
      <div />
      <div />
      <div />
      <div />
    </div>
  )
}

export default Loader
