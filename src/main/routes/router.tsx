import { createBrowserRouter } from 'react-router-dom'
import { makePrivateRoute } from '@/main/factories/routes/privateRouteFactory'
import { makeLogin } from '@/main/factories/pages/login/loginFactory'
import { makeSignUp } from '@/main/factories/pages/signUp/signUpFactory'
import Surveys from '@/presentation/pages/surveys/surveys'

const router = createBrowserRouter([
  { path: '/', Component: () => makePrivateRoute(Surveys) },
  { path: '/login', Component: makeLogin },
  { path: '/signup', Component: makeSignUp }
])

export default router
