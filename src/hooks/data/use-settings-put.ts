import { useApi } from "@/hooks/use-api";
import { useInvalidateSettingsGet } from "@/hooks/data/use-settings-get";
import { paths } from "@/hooks/types/schema";
import { useApiResult } from "@/hooks/use-api-result";
import type { FetchResponse, MaybeOptionalInit } from "openapi-fetch";
import { UseMutationOptions } from "@tanstack/react-query";

const METHOD = "put" as const;
const PATH = "/settings" as const;

type Init = MaybeOptionalInit<paths["/settings"], "put">;
type Response = Required<
  FetchResponse<paths["/settings"]["put"], Init, "application/json">
>;
type Options = Omit<
  UseMutationOptions<Response["data"], Response["error"], Init>,
  "mutationKey" | "mutationFn"
>;

export function useSettingsPut(options?: Options) {
  const { useMutation } = useApi();
  const { invalidateCache } = useInvalidateSettingsGet();
  const { success: successMessage, error: errorMessage } = useApiResult();

  return useMutation(METHOD, PATH, {
    ...options,
    onSuccess: async (data, variables, context) => {
      await options?.onSuccess?.(data, variables, context);

      successMessage({
        description: `Setting(s) ${variables.body.map((setting) => setting.key).join(", ")} updated`,
      });

      await invalidateCache();
    },
    onError: async (error, variables, context) => {
      await options?.onError?.(error, variables, context);

      errorMessage({
        description: error.message,
      });
    },
  });
}
