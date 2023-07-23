import { createBrowserRouter } from 'react-router-dom'
import { makeLogin } from '@/main/factories/pages/loginFactory'

const router = createBrowserRouter([
  { path: '/login', Component: makeLogin }
])

export default router
