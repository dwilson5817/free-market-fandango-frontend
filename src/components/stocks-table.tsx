import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { Minus, RefreshCcw, TrendingDown, TrendingUp } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { useMarketActiveGet } from "@/hooks/data/use-market-active-get.ts";
import { useStocksGet } from "@/hooks/data/use-stocks-get.ts";
import { useMarketPricesGet } from "@/hooks/data/use-market-prices-get.ts";
import { useMemo } from "react";
import { DataTable } from "@/components/data-table.tsx";
import { Button } from "@/components/ui/button.tsx";
import { formatPrice } from "@/lib/utils.ts";

export interface Stocks {
  code: string;
  name: string;
  current_price: string;
  initial_price: string;
  percent_change: number;
}

const columns: ColumnDef<Stocks>[] = [
  {
    accessorKey: "code",
    header: "Identifier",
    cell: ({ row }) => <div className="capitalize">{row.getValue("code")}</div>,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <div className="lowercase">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => formatPrice(row.original.current_price),
  },
  {
    accessorKey: "percent_change",
    header: "Change",
    cell: ({ row }) => {
      let colourStyle = "";
      let Icon = Minus;

      if (row.original.percent_change < 0) {
        colourStyle = "text-red-700";
        Icon = TrendingDown;
      }

      if (row.original.percent_change > 0) {
        colourStyle = "text-green-800";
        Icon = TrendingUp;
      }

      const percentFormatted = Number(
        row.original.percent_change,
      ).toLocaleString("en-UK", {
        style: "percent",
        signDisplay: "always",
        minimumFractionDigits: 2,
      });

      return (
        <div className={`flex items-center gap-x-1.5 ${colourStyle}`}>
          <Icon className="w-4 h-4 " />
          <div>{percentFormatted}</div>
        </div>
      );
    },
  },
];

export const StocksTable = () => {
  const {
    data: market,
    refetch: refetchMarket,
    isFetching: isMarketFetching,
  } = useMarketActiveGet();
  const {
    data: stocks,
    refetch: refetchStocks,
    isFetching: isStocksFetching,
  } = useStocksGet();
  const {
    data: prices,
    refetch: refetchPrices,
    isFetching: isPricesFetching,
  } = useMarketPricesGet(market?.uuid);

  const stocksWithPrice = useMemo<Stocks[]>(() => {
    return (
      stocks?.map((stock) => ({
        ...stock,
        current_price:
          prices?.find((balance) => balance.stock_code === stock.code)?.price ??
          "",
        percent_change:
          (Number(
            prices?.find((balance) => balance.stock_code === stock.code)?.price,
          ) -
            Number(stock.initial_price)) /
          Number(stock.initial_price),
      })) ?? []
    );
  }, [stocks, prices]);

  const refetch = async () => {
    await refetchMarket();
    await refetchStocks();
    await refetchPrices();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <div className="flex-1">
            <CardTitle>Stocks</CardTitle>
            <CardDescription>Drinks for sale on the market</CardDescription>
          </div>
          <Button
            size="icon"
            variant="secondary"
            onClick={() => refetch()}
            disabled={isMarketFetching || isStocksFetching || isPricesFetching}
          >
            <RefreshCcw />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={stocksWithPrice} />
      </CardContent>
    </Card>
  );
};
