import { useApi } from "@/hooks/use-api";

const METHOD = "get" as const;
const PATH = "/market/{market_uuid}/history/{stock_code}" as const;

const FIFTEEN_SECONDS = 15 * 1000;

export function useMarketHistoryGet(stock_code: string, market_uuid?: string) {
  const { useQuery } = useApi();

  return useQuery(
    METHOD,
    PATH,
    { params: { path: { market_uuid: market_uuid!, stock_code } } },
    {
      refetchInterval: FIFTEEN_SECONDS,
      enabled: Boolean(market_uuid),
    },
  );
}
