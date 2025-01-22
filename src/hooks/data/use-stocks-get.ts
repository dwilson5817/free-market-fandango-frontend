import { useApi } from '@/hooks/use-api'
import { useQueryClient } from '@tanstack/react-query'

const METHOD = 'get' as const;
const PATH = '/stock' as const;

export function useStocksGet() {
  const { useQuery } = useApi()

  return useQuery(
    METHOD,
    PATH,
  )
}

export function useInvalidateStocksGet() {
  const queryClient = useQueryClient();

  const invalidateCache = async () => {
    await queryClient.invalidateQueries({
      queryKey: [METHOD, PATH, undefined],
    })
  }

  return { invalidateCache }
}
