import { SidebarTrigger } from '@/components/ui/sidebar.tsx'
import { Separator } from '@/components/ui/separator.tsx'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList, BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb.tsx'
import { Link } from 'react-router'
import { PropsWithChildren, ReactNode } from 'react'
import { Button } from '@/components/ui/button.tsx'
import { RefreshCcw } from 'lucide-react'
import { LoadingSpinner } from '@/components/loading-spinner.tsx'

interface AdminBreadcrumbsProps {
  pageName: string,
  actions?: ReactNode
  isLoading?: boolean
  isFetching?: boolean
  onRefreshClicked?: () => void
}

export const AdminLayout = (props: PropsWithChildren<AdminBreadcrumbsProps>) => {
  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink asChild>
                  <Link to="/admin">
                    Admin
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>{props.pageName}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="grid gap-y-4 px-4">
        <div className="flex">
          <div className="grow content-center">
            <h1 className="text-2xl font-bold">{props.pageName}</h1>
          </div>
          <div className="flex">
            {props.actions}
            {props.onRefreshClicked && (
              <Button
                onClick={props.onRefreshClicked}
                disabled={props.isFetching}
                variant="outline"
                size="icon"
                className="my-auto ml-2"
              >
                <RefreshCcw
                  className={`h-4 w-4 ${props.isFetching ? 'animate-spin' : ''}`} />
              </Button>
            )}
          </div>
        </div>

        {props.isLoading ? <LoadingSpinner /> : props.children}
      </div>
    </>
  )
}
