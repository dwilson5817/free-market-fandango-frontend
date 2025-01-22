import type { paths } from '@/hooks/types/schema'
import { useAuthentication } from '@/hooks/use-authentication.ts'
import createFetchClient, { ClientOptions } from 'openapi-fetch'
import createClient from 'openapi-react-query'

const UNPROTECTED_ROUTES = [
  '/auth',
];

const clientOptions: ClientOptions = {
  baseUrl: import.meta.env.VITE_API_URL,
};

const fetchClient = createFetchClient<paths>(clientOptions);

export const useApi = () => {
  const { token } = useAuthentication()

  fetchClient.use({
    onRequest: ({ request }) => {
      if (
        UNPROTECTED_ROUTES.some((pathname) => request.url.startsWith(pathname))
      ) {
        return undefined
      }

      request.headers.set('Authorization', `Bearer ${token}`)
      return request
    },
  });

  return createClient(fetchClient)
}
