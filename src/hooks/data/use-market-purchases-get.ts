import { useApi } from "@/hooks/use-api";
import { useQueryClient } from "@tanstack/react-query";

const METHOD = "get" as const;
const PATH = "/market/{market_uuid}/purchase" as const;

export function useMarketPurchasesGet(market_uuid?: string) {
  const { useQuery } = useApi();

  return useQuery(
    METHOD,
    PATH,
    { params: { path: { market_uuid: market_uuid || "" } } },
    { enabled: Boolean(market_uuid) },
  );
}

export function useInvalidateMarketPurchasesGet() {
  const queryClient = useQueryClient();

  const invalidateCache = async (market_uuid: string) => {
    await queryClient.invalidateQueries({
      queryKey: [METHOD, PATH, { params: { path: { market_uuid } } }],
    });
  };

  return { invalidateCache };
}
