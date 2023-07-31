import React from 'react'

type Props = {
  Page: React.FC
}

const PrivateRoute: React.FC<Props> = ({ Page }) => {
  return <Page />
}

export default PrivateRoute
