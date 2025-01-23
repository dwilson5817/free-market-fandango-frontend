import { useSettingsGet } from "@/hooks/data/use-settings-get.ts";
import { components } from "@/hooks/types/schema";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button.tsx";
import { RefreshCcw } from "lucide-react";
import { DataTable } from "@/components/data-table.tsx";
import { AdminLayout } from "@/components/admin-layout.tsx";
import { UpdateParameterForm } from "@/components/forms/update-parameter-form.tsx";

const Parameters = () => {
  const { isLoading, isFetching, data, refetch } = useSettingsGet();

  const columns: ColumnDef<components["schemas"]["Setting"]>[] = [
    {
      accessorKey: "key",
      header: "Setting",
    },
    {
      accessorKey: "value",
      header: "Value",
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => <UpdateParameterForm setting={row.original} />,
    },
  ];

  return (
    <AdminLayout
      pageName="Parameters"
      actions={
        <Button
          onClick={() => refetch()}
          disabled={isFetching}
          variant="outline"
          size="icon"
          className="my-auto ml-1"
        >
          <RefreshCcw
            className={`h-4 w-4${isFetching ? " animate-spin" : ""}`}
          />
        </Button>
      }
      isLoading={isLoading}
    >
      <DataTable columns={columns} data={data ?? []} />
    </AdminLayout>
  );
};

export default Parameters;
