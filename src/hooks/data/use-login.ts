import { useApi } from "@/hooks/use-api";
import { paths } from "@/hooks/types/schema";
import type { FetchResponse, MaybeOptionalInit } from "openapi-fetch";
import { UseMutationOptions } from "@tanstack/react-query";

const METHOD = "post" as const;
const PATH = "/auth" as const;

type Init = MaybeOptionalInit<paths["/auth"], "post">;
type Response = Required<
  FetchResponse<paths["/auth"]["post"], Init, "application/json">
>;
type Options = Omit<
  UseMutationOptions<Response["data"], Response["error"], Init>,
  "mutationKey" | "mutationFn"
>;

export function useLogin(options?: Options) {
  const { useMutation } = useApi();

  return useMutation(METHOD, PATH, { ...options });
}
