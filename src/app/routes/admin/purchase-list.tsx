import { AdminLayout } from "@/components/admin-layout.tsx";
import { ColumnDef } from "@tanstack/react-table";
import { components } from "@/hooks/types/schema";
import { formatPrice, formatTimestamp } from "@/lib/utils.ts";
import { Button } from "@/components/ui/button.tsx";
import { ArrowUpDown } from "lucide-react";
import { Badge } from "@/components/ui/badge.tsx";
import { useMarketActiveGet } from "@/hooks/data/use-market-active-get.ts";
import { useMarketPurchasesGet } from "@/hooks/data/use-market-purchases-get.ts";
import { DataTable } from "@/components/data-table.tsx";

const columns: ColumnDef<components["schemas"]["PurchaseOut"]>[] = [
  {
    accessorKey: "timestamp",
    cell: ({ row }) => formatTimestamp(row.original.timestamp || ""),
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Timestamp
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "card_number",
    header: "Card number",
    cell: ({ row }) => (
      <Badge variant="secondary" className="font-mono">
        {row.original.card_number}
      </Badge>
    ),
  },
  {
    accessorKey: "stock_code",
    header: "Stock code",
    cell: ({ row }) => (
      <Badge variant="secondary" className="font-mono">
        {row.original.stock_code}
      </Badge>
    ),
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => formatPrice(row.original.price),
  },
];

const Purchase = () => {
  const {
    data: market,
    refetch: refetchActiveMarket,
    isFetching: isActiveMarketFetching,
    isLoading: isActiveMarketLoading,
  } = useMarketActiveGet();

  const {
    data: purchases,
    refetch: refetchPurchases,
    isFetching: isPurchasesFetching,
    isLoading: isPurchasesLoading,
  } = useMarketPurchasesGet(market?.uuid);

  const refetch = async () => {
    await refetchActiveMarket();
    await refetchPurchases();
  };

  return (
    <AdminLayout
      pageName="View all purchases"
      onRefreshClicked={() => refetch()}
      isFetching={isActiveMarketFetching || isPurchasesFetching}
      isLoading={isActiveMarketLoading || isPurchasesLoading}
    >
      <DataTable columns={columns} data={purchases || []} />
    </AdminLayout>
  );
};

export default Purchase;
