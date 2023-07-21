import { createBrowserRouter } from 'react-router-dom'
import Login from './pages/login/login'

const router = createBrowserRouter([
  { path: '/login', Component: Login }
])

export default router
