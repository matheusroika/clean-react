import { createBrowserRouter } from 'react-router-dom'
import { makeLogin } from '@/main/factories/pages/login/loginFactory'
import { makeSignUp } from '@/main/factories/pages/signUp/signUpFactory'
import Surveys from './pages/surveys/surveys'

const router = createBrowserRouter([
  { path: '/', Component: Surveys },
  { path: '/login', Component: makeLogin },
  { path: '/signup', Component: makeSignUp }
])

export default router
