import { AdminLayout } from '@/components/admin-layout.tsx'
import { useEventsGet } from '@/hooks/data/use-events-get.ts'
import { useEventDelete } from '@/hooks/data/use-event-delete.ts'
import { ColumnDef } from '@tanstack/react-table'
import { components } from '@/hooks/types/schema'
import { CircleCheck, CircleX } from 'lucide-react'
import { Badge } from '@/components/ui/badge.tsx'
import { CreateEventForm } from '@/components/forms/create-event-form.tsx'
import { DataTable } from '@/components/data-table.tsx'
import { DeleteResource } from '@/components/delete-resource.tsx'

const Events = () => {
  const { isLoading, isFetching, data, refetch } = useEventsGet()
  const { mutate: deleteEvent } = useEventDelete()

  const columns: ColumnDef<components['schemas']['EventOut']>[] = [
    {
      accessorKey: 'title',
      header: 'Title',
    },
    {
      accessorKey: 'body',
      header: 'Body',
    },
    {
      accessorKey: 'breaking',
      header: 'Breaking?',
      cell: ({ row }) =>
        row.original.breaking ? (
          <CircleCheck className="text-green-700 w-5 h-5" />
        ) : (
          <CircleX className="text-red-700 w-5 h-5" />
        ),
    },
    {
      accessorKey: 'change_min',
      header: 'Min %',
    },
    {
      accessorKey: 'change_max',
      header: 'Max %',
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
          onConfirm={() => deleteEvent({ params: { path: { event_id: row.original.uuid! } } })}
        >
          Confirm you wish to delete event <strong>{row.original.title}</strong>.
        </DeleteResource>
      ),
    },
  ]

  return (
    <AdminLayout
      pageName="Events"
      actions={(
        <CreateEventForm />
      )}
      onRefreshClicked={() => refetch()}
      isLoading={isLoading}
      isFetching={isFetching}
    >
      <DataTable columns={columns} data={data || []} />
    </AdminLayout>
  )
}

export default Events
