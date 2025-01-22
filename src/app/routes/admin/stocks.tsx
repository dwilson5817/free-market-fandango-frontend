import { AdminLayout } from '@/components/admin-layout.tsx'
import { useStocksGet } from '@/hooks/data/use-stocks-get.ts'
import { useStockDelete } from '@/hooks/data/use-stock-delete.ts'
import { ColumnDef } from '@tanstack/react-table'
import { components } from '@/hooks/types/schema'
import { Badge } from '@/components/ui/badge.tsx'
import { CreateStockForm } from '@/components/forms/create-stock-form.tsx'
import { DataTable } from '@/components/data-table.tsx'
import { DeleteResource } from '@/components/delete-resource.tsx'

const Stocks = () => {
  const { isLoading, isFetching, data, refetch } = useStocksGet()
  const { mutate: deleteStock } = useStockDelete({
    onSuccess: async () => {
      console.log("RUNNING!")
    }
  })

  const columns: ColumnDef<components['schemas']['Stock-Output']>[] = [
    {
      accessorKey: 'code',
      header: 'Stock code',
      cell: ({ row }) => (
        <Badge variant="secondary" className="font-mono">
          {row.original.code}
        </Badge>
      ),
    },
    {
      accessorKey: 'name',
      header: 'Full name',
    },
    {
      accessorKey: 'initial_price',
      header: 'Initial price',
    },
    {
      accessorKey: 'tags',
      header: 'Tags',
      cell: ({ row }) => {
        return (
          <>
            {row.original.tags.map((tag) => (
              <Badge variant="outline" className="mr-1">
                {tag}
              </Badge>
            ))}
          </>
        )
      },
    },
    {
      id: 'actions',
      enableHiding: false,
      cell: ({ row }) => (
        <DeleteResource
          onConfirm={() => deleteStock({ params: { path: { stock_code: row.original.code } } } )}
        >
          Confirm you wish to delete the stock <strong>{row.original.name}</strong>.
        </DeleteResource>
      ),
    },
  ]

  return (
    <AdminLayout
      pageName="Stocks"
      actions={(
        <CreateStockForm />
      )}
      onRefreshClicked={() => refetch()}
      isFetching={isFetching}
      isLoading={isLoading}
    >
      <DataTable columns={columns} data={data || []} />
    </AdminLayout>
  )
}

export default Stocks
