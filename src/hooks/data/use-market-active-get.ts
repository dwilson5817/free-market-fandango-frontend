import { useApi } from "@/hooks/use-api";
import { useQueryClient } from "@tanstack/react-query";

const METHOD = "get" as const;
const PATH = "/market" as const;

const FIFTEEN_SECONDS = 15 * 1000;

export function useMarketActiveGet() {
  const { useQuery } = useApi();

  return useQuery(METHOD, PATH, undefined, {
    refetchInterval: FIFTEEN_SECONDS,
    retry: false, // Don't retry as query will fail if no market has ever been opened
  });
}

export function useInvalidateMarketActiveGet() {
  const queryClient = useQueryClient();

  const invalidateCache = async () => {
    await queryClient.invalidateQueries({
      queryKey: [METHOD, PATH, undefined],
    });
  };

  return { invalidateCache };
}
