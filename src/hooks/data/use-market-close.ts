import { useApi } from '@/hooks/use-api'
import { useInvalidateMarketActiveGet } from '@/hooks/data/use-market-active-get'
import { paths } from '@/hooks/types/schema'
import { useApiResult } from '@/hooks/use-api-result'
import type { FetchResponse, MaybeOptionalInit } from 'openapi-fetch'
import { UseMutationOptions } from '@tanstack/react-query'

const METHOD = 'delete' as const;
const PATH = '/market/{market_uuid}' as const;

type Init = MaybeOptionalInit<paths["/market/{market_uuid}"], "delete">
type Response = Required<FetchResponse<paths["/market/{market_uuid}"]["delete"], Init, "application/json">>
type Options = Omit<UseMutationOptions<Response["data"], Response["error"], Init>, "mutationKey" | "mutationFn">;

export function useMarketClose(options?: Options) {
  const { useMutation } = useApi()
  const { invalidateCache: invalidateActiveMarketCache } = useInvalidateMarketActiveGet()
  const { success: successMessage, error: errorMessage } = useApiResult()

  return useMutation(
    METHOD,
    PATH,
    {
      ...options,
      onSuccess: async (data, variables, context) => {
        await options?.onSuccess?.(data, variables, context)

        successMessage({
          description: 'Market closed'
        })

        await invalidateActiveMarketCache()
      },
      onError: async (error, variables, context) => {
        await options?.onError?.(error, variables, context)

        errorMessage({
          // @ts-expect-error OpenAPI types currently are wrong, this should be valid, will need to modify OpenAPI spec
          description: error.message
        })
      }
    }
  )
}
