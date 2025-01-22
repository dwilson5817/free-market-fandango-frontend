import { useApi } from '@/hooks/use-api'

const METHOD = 'get' as const;
const PATH = '/spotify/currently_playing' as const;

const FIFTEEN_SECONDS = 15 * 1000

export function useSpotifyCurrentlyPlayingGet() {
  const { useQuery } = useApi()

  return useQuery(
    METHOD,
    PATH,
    undefined,
    {
      refetchInterval: FIFTEEN_SECONDS
    }
  )
}
