import { useApi } from '@/hooks/use-api'
import { useQueryClient } from '@tanstack/react-query'

const METHOD = 'get' as const;
const PATH = '/card' as const;

export function useCardsGet() {
  const { useQuery } = useApi()

  return useQuery(
    METHOD,
    PATH,
  )
}

export function useInvalidateCardsGet() {
  const queryClient = useQueryClient();

  const invalidateCache = async () => {
    await queryClient.invalidateQueries({
      queryKey: [METHOD, PATH, undefined],
    })
  }

  return { invalidateCache }
}
