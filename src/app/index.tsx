import { ThemeProvider } from '@/components/theme-provider.tsx'
import { Router } from '@/app/router.tsx'
import { AuthenticationProvider } from '@/components/authentication-provider.tsx'

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AuthenticationProvider>
        <Router />
      </AuthenticationProvider>
    </ThemeProvider>
  )
}

export default App
