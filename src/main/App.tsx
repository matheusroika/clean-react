import React from 'react'
import { RouterProvider } from 'react-router-dom'
import router from '@/main/router'
import '@/presentation/styles/global.scss'

const App = (): React.ReactElement => {
  return <RouterProvider router={router} />
}

export default App
