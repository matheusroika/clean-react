import React from 'react'
import { RouterProvider } from 'react-router-dom'
import router from './router'
import './styles/global.scss'

const App = (): React.ReactElement => {
  return <RouterProvider router={router} />
}

export default App
