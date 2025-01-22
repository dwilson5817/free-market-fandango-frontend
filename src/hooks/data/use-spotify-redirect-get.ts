import { useApi } from '@/hooks/use-api'

const METHOD = 'get' as const;
const PATH = '/spotify/redirect' as const;

export function useSpotifyRedirectGet() {
  const { useQuery } = useApi()

  return useQuery(
    METHOD,
    PATH,
  )
}
