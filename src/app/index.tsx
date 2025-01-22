import { ThemeProvider } from '@/components/theme-provider.tsx'
import { Router } from '@/app/router.tsx'
import { AuthenticationProvider } from '@/components/authentication-provider.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <AuthenticationProvider>
          <Router />
        </AuthenticationProvider>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App
