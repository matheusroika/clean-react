import { createBrowserRouter } from 'react-router-dom'
import { makeLogin } from '@/main/factories/pages/loginFactory'
import SignUp from './pages/signUp/signUp'

const router = createBrowserRouter([
  { path: '/login', Component: makeLogin },
  { path: '/signup', Component: SignUp }
])

export default router
