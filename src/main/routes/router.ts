import { createBrowserRouter } from 'react-router-dom'
import { makePrivateRoute } from '@/main/factories/routes/privateRouteFactory'
import { makeSurveys } from '../factories/pages/surveys/surveysFactory'
import { makeLogin } from '@/main/factories/pages/login/loginFactory'
import { makeSignUp } from '@/main/factories/pages/signUp/signUpFactory'

const router = createBrowserRouter([
  { path: '/', Component: () => makePrivateRoute(makeSurveys) },
  { path: '/login', Component: makeLogin },
  { path: '/signup', Component: makeSignUp }
])

export default router
