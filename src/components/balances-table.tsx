import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { ColumnDef } from "@tanstack/react-table";
import { useMarketActiveGet } from "@/hooks/data/use-market-active-get.ts";
import { DataTable } from "@/components/data-table.tsx";
import { useMarketBalancesGet } from "@/hooks/data/use-market-balances-get.ts";
import { useCardsGet } from "@/hooks/data/use-cards-get.ts";
import { useMemo } from "react";
import { RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import { formatPrice } from "@/lib/utils.ts";

export interface Balances {
  current_balance?: string;
  card_number: number;
  name: string;
}

const columns: ColumnDef<Balances>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <div className="lowercase">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "current_balance",
    header: "Balance",
    cell: ({ row }) => formatPrice(row.original.current_balance ?? ""),
  },
];

export const BalancesTable = () => {
  const {
    data: market,
    refetch: refetchMarket,
    isFetching: isMarketFetching,
  } = useMarketActiveGet();
  const {
    data: cards,
    refetch: refetchCards,
    isFetching: isCardsFetching,
  } = useCardsGet();
  const {
    data: balances,
    refetch: refetchBalances,
    isFetching: isBalancesFetching,
  } = useMarketBalancesGet(market?.uuid);

  const cardsWithBalance = useMemo<Balances[]>(() => {
    return (
      cards?.map((card) => ({
        ...card,
        current_balance: balances?.find(
          (balance) => balance.card_number === card.card_number,
        )?.balance,
      })) || []
    );
  }, [cards, balances]);

  const refetch = async () => {
    await refetchMarket();
    await refetchCards();
    await refetchBalances();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <div className="flex-1">
            <CardTitle>Balances</CardTitle>
            <CardDescription>Current balances of cards</CardDescription>
          </div>
          <Button
            size="icon"
            variant="secondary"
            onClick={() => refetch()}
            disabled={isMarketFetching || isCardsFetching || isBalancesFetching}
          >
            <RefreshCcw />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={cardsWithBalance ?? []} />
      </CardContent>
    </Card>
  );
};
