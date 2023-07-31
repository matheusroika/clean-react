import React from 'react'
import { RouterProvider } from 'react-router-dom'
import router from '@/main/router'
import ApiContext from '@/presentation/contexts/apiContext'
import { setCurrentAccountAdapter } from './adapters/currentAccountAdapter'
import '@/presentation/styles/global.scss'

const App = (): React.ReactElement => {
  return (
    <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountAdapter }}>
      <RouterProvider router={router} />
    </ApiContext.Provider>
  )
}

export default App
