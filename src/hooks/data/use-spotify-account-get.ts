import { useApi } from "@/hooks/use-api";
import { useQueryClient } from "@tanstack/react-query";

const METHOD = "get" as const;
const PATH = "/spotify/account" as const;

export function useSpotifyAccountGet() {
  const { useQuery } = useApi();

  return useQuery(METHOD, PATH, undefined, {
    retry: false, // Don't retry as query will fail if no account connected
  });
}

export function useInvalidateSpotifyAccountGet() {
  const queryClient = useQueryClient();

  const invalidateCache = async () => {
    await queryClient.invalidateQueries({
      queryKey: [METHOD, PATH, undefined],
    });
  };

  return { invalidateCache };
}
