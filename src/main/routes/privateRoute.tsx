import apiContext from '@/presentation/contexts/apiContext'
import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'

type Props = {
  Page: React.FC
}

const PrivateRoute: React.FC<Props> = ({ Page }) => {
  const { getCurrentAccount } = useContext(apiContext)
  const account = getCurrentAccount()
  const isAccountInvalid = !account?.accessToken || !account?.name || !account?.email
  return isAccountInvalid ? <Navigate to='/login' /> : <Page />
}

export default PrivateRoute
