import { useAuth } from '@/context/AuthProvider/useAuth'

import { AuthLayout } from '../layouts/auth'

export function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const auth = useAuth()

  if (!auth.token) {
    return <AuthLayout></AuthLayout>
  }

  return <>{children}</>
}
