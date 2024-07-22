import { createBrowserRouter } from 'react-router-dom'

import { NotFound } from './pages/404'
import { Dashboard } from './pages/app/dashboard/dashboard'
import { Expenses } from './pages/app/expanses/expanses'
import { Users } from './pages/app/users/users'
import { ProtectedLayout } from './pages/auth/protected-layout'
import { SignIn } from './pages/auth/sign-in'
import { SignUp } from './pages/auth/sign-up'
import { Error } from './pages/error'
import { AppLayout } from './pages/layouts/app'
import { AuthLayout } from './pages/layouts/auth'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: '/',
        element: <Dashboard />,
      },
      {
        path: '/despesas',
        element: <Expenses />,
      },
      {
        path: '/usuarios',
        element: <Users />,
      },
    ],
  },
  {
    path: '/',
    element: (
      <ProtectedLayout>
        <AuthLayout />
      </ProtectedLayout>
    ),
    children: [
      {
        path: '/sign-in',
        element: <SignIn />,
      },
      {
        path: '/sign-up',
        element: <SignUp />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
])
