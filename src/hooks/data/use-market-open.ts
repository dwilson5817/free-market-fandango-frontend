import { useApi } from "@/hooks/use-api";
import { useInvalidateMarketActiveGet } from "@/hooks/data/use-market-active-get";
import { paths } from "@/hooks/types/schema";
import { useApiResult } from "@/hooks/use-api-result";
import type { FetchResponse, MaybeOptionalInit } from "openapi-fetch";
import { UseMutationOptions } from "@tanstack/react-query";

const METHOD = "post" as const;
const PATH = "/market" as const;

type Init = MaybeOptionalInit<paths["/market"], "post">;
type Response = Required<
  FetchResponse<paths["/market"]["post"], Init, "application/json">
>;
type Options = Omit<
  UseMutationOptions<Response["data"], Response["error"], Init>,
  "mutationKey" | "mutationFn"
>;

export function useMarketOpen(options?: Options) {
  const { useMutation } = useApi();
  const { invalidateCache: invalidateActiveMarketCache } =
    useInvalidateMarketActiveGet();
  const { success: successMessage, error: errorMessage } = useApiResult();

  return useMutation(METHOD, PATH, {
    ...options,
    onSuccess: async (data, variables, context) => {
      await options?.onSuccess?.(data, variables, context);

      successMessage({
        description: "Market opened",
      });

      await invalidateActiveMarketCache();
    },
    onError: async (error, variables, context) => {
      await options?.onError?.(error, variables, context);

      errorMessage({
        description: error.message,
      });
    },
  });
}
