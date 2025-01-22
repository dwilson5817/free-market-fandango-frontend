import { useApi } from '@/hooks/use-api'
import { paths } from '@/hooks/types/schema'
import { useInvalidateStocksGet } from '@/hooks/data/use-stocks-get'
import { useApiResult } from '@/hooks/use-api-result'
import type { FetchResponse, MaybeOptionalInit } from 'openapi-fetch'
import { UseMutationOptions } from '@tanstack/react-query'

const METHOD = 'put' as const;
const PATH = '/stock' as const;

type Init = MaybeOptionalInit<paths["/stock"], "put">
type Response = Required<FetchResponse<paths["/stock"]["put"], Init, "application/json">>
type Options = Omit<UseMutationOptions<Response["data"], Response["error"], Init>, "mutationKey" | "mutationFn">;

export function useStockCreate(options?: Options) {
  const { useMutation } = useApi()
  const { invalidateCache } = useInvalidateStocksGet()
  const { success: successMessage, error: errorMessage } = useApiResult()

  return useMutation(
    METHOD,
    PATH,
    {
      ...options,
      onSuccess: async (data, variables, context) => {
        await options?.onSuccess?.(data, variables, context)

        successMessage({
          description: `Stock ${data.code} was created`
        })

        await invalidateCache()
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
