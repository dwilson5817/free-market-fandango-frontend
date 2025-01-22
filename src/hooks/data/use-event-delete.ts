import { useApi } from '@/hooks/use-api'
import { useInvalidateEventsGet } from '@/hooks/data/use-events-get'
import { paths } from '@/hooks/types/schema'
import { useApiResult } from '@/hooks/use-api-result'
import type { FetchResponse, MaybeOptionalInit } from 'openapi-fetch'
import { UseMutationOptions } from '@tanstack/react-query'

const METHOD = 'delete' as const;
const PATH = '/event/{event_id}' as const;

type Init = MaybeOptionalInit<paths["/event/{event_id}"], "delete">
type Response = Required<FetchResponse<paths["/event/{event_id}"]["delete"], Init, "application/json">>
type Options = Omit<UseMutationOptions<Response["data"], Response["error"], Init>, "mutationKey" | "mutationFn">;

export function useEventDelete(options?: Options) {
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
          description: `Event ${variables.params.path.event_id} was deleted`
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
