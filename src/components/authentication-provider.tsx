import { createContext, PropsWithChildren, useState } from 'react'

type Token = string | null

type AuthenticationProviderProps = {
  storageKey?: string
}

type AuthenticationProviderState = {
  token: Token
  isLoggedIn: () => boolean
  login: (jwt: string) => void
  logout: () => void
}

const initialState: AuthenticationProviderState = {
  token: null,
  isLoggedIn: () => false,
  login: () => null,
  logout: () => null,
}

export const AuthenticationProviderContext =
  createContext<AuthenticationProviderState>(initialState)

export function AuthenticationProvider({
                                         children,
                                         storageKey = 'auth-token',
                                         ...props
                                       }: PropsWithChildren<AuthenticationProviderProps>) {
  const [token, setToken] = useState<Token>(() =>
    localStorage.getItem(storageKey)
  )

  const value: AuthenticationProviderState = {
    token,
    isLoggedIn: () => token !== null,
    login: (jwt: string) => {
      localStorage.setItem(storageKey, jwt)
      setToken(jwt)
    },
    logout: () => {
      localStorage.removeItem(storageKey)
      setToken(null)
    },
  }

  return (
    <AuthenticationProviderContext.Provider {...props} value={value}>
      {children}
    </AuthenticationProviderContext.Provider>
  )
}
