import { useApi } from "@/hooks/use-api";
import { useInvalidateMarketPurchasesGet } from "@/hooks/data/use-market-purchases-get";
import { paths } from "@/hooks/types/schema";
import { useApiResult } from "@/hooks/use-api-result";
import type { FetchResponse, MaybeOptionalInit } from "openapi-fetch";
import { UseMutationOptions } from "@tanstack/react-query";

const METHOD = "post" as const;
const PATH = "/market/{market_uuid}/purchase" as const;

type Init = MaybeOptionalInit<paths["/market/{market_uuid}/purchase"], "post">;
type Response = Required<
  FetchResponse<
    paths["/market/{market_uuid}/purchase"]["post"],
    Init,
    "application/json"
  >
>;
type Options = Omit<
  UseMutationOptions<Response["data"], Response["error"], Init>,
  "mutationKey" | "mutationFn"
>;

export function useMarketPurchaseCreate(options?: Options) {
  const { useMutation } = useApi();
  const { invalidateCache } = useInvalidateMarketPurchasesGet();
  const { success: successMessage, error: errorMessage } = useApiResult();

  return useMutation(METHOD, PATH, {
    ...options,
    onSuccess: async (data, variables, context) => {
      await options?.onSuccess?.(data, variables, context);

      successMessage({
        description: "Purchased created",
      });

      await invalidateCache(variables.params.path.market_uuid);
    },
    onError: async (error, variables, context) => {
      await options?.onError?.(error, variables, context);

      errorMessage({
        // @ts-expect-error OpenAPI types currently are wrong, this should be valid, will need to modify OpenAPI spec
        description: error.message,
      });
    },
  });
}
