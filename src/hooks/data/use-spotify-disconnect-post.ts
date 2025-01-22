import { useApi } from '@/hooks/use-api'
import { useInvalidateSpotifyAccountGet } from '@/hooks/data/use-spotify-account-get'
import { paths } from '@/hooks/types/schema'
import { useApiResult } from '@/hooks/use-api-result'
import type { FetchResponse, MaybeOptionalInit } from 'openapi-fetch'
import { UseMutationOptions } from '@tanstack/react-query'

const METHOD = 'post' as const;
const PATH = '/spotify/disconnect' as const;

type Init = MaybeOptionalInit<paths["/spotify/disconnect"], "post">
type Response = Required<FetchResponse<paths["/spotify/disconnect"]["post"], Init, "application/json">>
type Options = Omit<UseMutationOptions<Response["data"], Response["error"], Init>, "mutationKey" | "mutationFn">;

export function useSpotifyDisconnectPost(options?: Options) {
  const { useMutation } = useApi()
  const { invalidateCache } = useInvalidateSpotifyAccountGet()
  const { success: successMessage, error: errorMessage } = useApiResult()

  return useMutation(
    METHOD,
    PATH,
    {
      ...options,
      onSuccess: async (data, variables, context) => {
        await options?.onSuccess?.(data, variables, context)

        successMessage({
          description: 'Spotify account disconnected'
        })

        await invalidateCache()
      },
      onError: async (error, variables, context) => {
        await options?.onError?.(error, variables, context)

        errorMessage({
          description: 'Failed to disconnect Spotify account'
        })
      }
    }
  )
}
