import { useApi } from "@/hooks/use-api.ts";
import { useInvalidateCardsGet } from "@/hooks/data/use-cards-get";
import { paths } from "@/hooks/types/schema";
import { useApiResult } from "@/hooks/use-api-result";
import type { FetchResponse, MaybeOptionalInit } from "openapi-fetch";
import { UseMutationOptions } from "@tanstack/react-query";

const METHOD = "delete" as const;
const PATH = "/card/{card_number}" as const;

type Init = MaybeOptionalInit<paths["/card/{card_number}"], "delete">;
type Response = Required<
  FetchResponse<
    paths["/card/{card_number}"]["delete"],
    Init,
    "application/json"
  >
>;
type Options = Omit<
  UseMutationOptions<Response["data"], Response["error"], Init>,
  "mutationKey" | "mutationFn"
>;

export function useCardDelete(options?: Options) {
  const { useMutation } = useApi();
  const { invalidateCache } = useInvalidateCardsGet();
  const { success: successMessage, error: errorMessage } = useApiResult();

  return useMutation(METHOD, PATH, {
    ...options,
    onSuccess: async (data, variables, context) => {
      await options?.onSuccess?.(data, variables, context);

      successMessage({
        description: `Card ${variables.params.path.card_number} was deleted`,
      });

      await invalidateCache();
    },
    onError: async (data, variables, context) => {
      await options?.onError?.(data, variables, context);

      errorMessage({
        // @ts-expect-error OpenAPI types currently are wrong, this should be valid, will need to modify OpenAPI spec
        description: data.message,
      });
    },
  });
}
