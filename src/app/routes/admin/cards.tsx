import { useCardsGet } from "@/hooks/data/use-cards-get.ts";
import { useCardDelete } from "@/hooks/data/use-card-delete.ts";
import { ColumnDef } from "@tanstack/react-table";
import { components } from "@/hooks/types/schema";
import { Badge } from "@/components/ui/badge.tsx";
import { DataTable } from "@/components/data-table.tsx";
import { CreateCardForm } from "@/components/forms/create-card-form.tsx";
import { formatPrice } from "@/lib/utils.ts";
import { AdminLayout } from "@/components/admin-layout.tsx";
import { DeleteResource } from "@/components/delete-resource.tsx";

const Cards = () => {
  const { isLoading, isFetching, data, refetch } = useCardsGet();
  const { mutate: deleteCard } = useCardDelete();

  const columns: ColumnDef<components["schemas"]["Card-Input"]>[] = [
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
      accessorKey: "name",
      header: "Full name",
    },
    {
      accessorKey: "balance",
      header: "Opening balance",
      cell: ({ row }) => formatPrice(row.original.balance as number),
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => (
        <DeleteResource
          onConfirm={() =>
            deleteCard({
              params: { path: { card_number: row.original.card_number } },
            })
          }
        >
          Confirm you wish to delete card number{" "}
          <strong>{row.original.card_number}</strong> owned by{" "}
          <strong>{row.original.name}</strong>.
        </DeleteResource>
      ),
    },
  ];

  return (
    <AdminLayout
      pageName="Cards"
      actions={<CreateCardForm />}
      onRefreshClicked={() => refetch()}
      isFetching={isFetching}
      isLoading={isLoading}
    >
      <DataTable columns={columns} data={data || []} />
    </AdminLayout>
  );
};

export default Cards;
