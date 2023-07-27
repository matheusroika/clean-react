import { createBrowserRouter } from 'react-router-dom'
import { makeLogin } from '@/main/factories/pages/login/loginFactory'
import { makeSignUp } from '@/main/factories/pages/signUp/signUpFactory'

const router = createBrowserRouter([
  { path: '/login', Component: makeLogin },
  { path: '/signup', Component: makeSignUp }
])

export default router
