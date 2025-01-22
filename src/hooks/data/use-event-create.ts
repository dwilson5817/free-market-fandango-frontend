import { useApi } from '@/hooks/use-api'
import { useInvalidateEventsGet } from '@/hooks/data/use-events-get'
import { paths } from '@/hooks/types/schema'
import { useApiResult } from '@/hooks/use-api-result.ts'
import type { FetchResponse, MaybeOptionalInit } from 'openapi-fetch'
import { UseMutationOptions } from '@tanstack/react-query'

const METHOD = 'put' as const;
const PATH = '/event' as const;

type Init = MaybeOptionalInit<paths["/event"], "put">
type Response = Required<FetchResponse<paths["/event"]["put"], Init, "application/json">>
type Options = Omit<UseMutationOptions<Response["data"], Response["error"], Init>, "mutationKey" | "mutationFn">;

export function useEventCreate(options?: Options) {
  const { useMutation } = useApi()
  const { invalidateCache } = useInvalidateEventsGet()
  const { success: successMessage, error: errorMessage } = useApiResult()

  return useMutation(
    METHOD,
    PATH,
    {
      ...options,
      onSuccess: async (data, variables, context) => {
        await options?.onSuccess?.(data, variables, context)

        successMessage({
          description: `Event ${data.uuid} was created`
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
