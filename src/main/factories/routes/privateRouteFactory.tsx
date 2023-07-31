import React from 'react'
import PrivateRoute from '@/main/routes/privateRoute'

export const makePrivateRoute: React.FC<React.FC> = (page: React.FC) => {
  return (
    <PrivateRoute Page={page}/>
  )
}
