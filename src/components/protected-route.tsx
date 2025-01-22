import { PropsWithChildren } from 'react'
import { Navigate } from 'react-router'
import { useAuthentication } from '@/hooks/use-authentication.ts'

export function ProtectedRoute({ children }: PropsWithChildren) {
  const { isLoggedIn } = useAuthentication()

  return isLoggedIn() ? children : <Navigate to="/auth" />
}
