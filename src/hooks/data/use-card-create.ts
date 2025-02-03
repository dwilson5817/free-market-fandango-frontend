import { paths } from "@/hooks/types/schema";
import { useApi } from "@/hooks/use-api";
import { useInvalidateCardsGet } from "@/hooks/data/use-cards-get.ts";
import { useApiResult } from "@/hooks/use-api-result.ts";
import type { FetchResponse, MaybeOptionalInit } from "openapi-fetch";
import { UseMutationOptions } from "@tanstack/react-query";

const METHOD = "put" as const;
const PATH = "/card" as const;

type Init = MaybeOptionalInit<paths["/card"], "put">;
type Response = Required<
  FetchResponse<paths["/card"]["put"], Init, "application/json">
>;
type Options = Omit<
  UseMutationOptions<Response["data"], Response["error"], Init>,
  "mutationKey" | "mutationFn"
>;

export function useCardCreate(options?: Options) {
  const { useMutation } = useApi();
  const { invalidateCache } = useInvalidateCardsGet();
  const { success: successMessage, error: errorMessage } = useApiResult();

  return useMutation(METHOD, PATH, {
    ...options,
    onSuccess: async (data, variables, context) => {
      await options?.onSuccess?.(data, variables, context);

      successMessage({
        description: `Created card for ${data.name} with card number ${data.card_number}`,
      });

      await invalidateCache();
    },
    onError: async (data, variables, context) => {
      await options?.onError?.(data, variables, context);

      errorMessage({
        // @ts-expect-error OpenAPI types currently are wrong, this should be valid, will need to modify OpenAPI spec
        description: data?.message,
      });
    },
  });
}
