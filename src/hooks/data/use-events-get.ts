import { useApi } from '@/hooks/use-api'
import { useQueryClient } from '@tanstack/react-query'

const METHOD = 'get'
const PATH = '/event'

export function useEventsGet() {
  const { useQuery } = useApi()

  return useQuery(
    METHOD,
    PATH
  )
}

export function useInvalidateEventsGet() {
  const queryClient = useQueryClient();

  const invalidateCache = async () => {
    await queryClient.invalidateQueries({
      queryKey: [METHOD, PATH, undefined],
    })
  }

  return { invalidateCache }
}
