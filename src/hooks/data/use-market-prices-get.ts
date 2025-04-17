import { useApi } from "@/hooks/use-api";

const METHOD = "get" as const;
const PATH = "/market/{market_uuid}/price" as const;

const FIFTEEN_SECONDS = 15 * 1000;

export function useMarketPricesGet(market_uuid?: string) {
  const { useQuery } = useApi();

  return useQuery(
    METHOD,
    PATH,
    { params: { path: { market_uuid: market_uuid! } } },
    {
      enabled: Boolean(market_uuid),
      refetchInterval: FIFTEEN_SECONDS,
    },
  );
}
