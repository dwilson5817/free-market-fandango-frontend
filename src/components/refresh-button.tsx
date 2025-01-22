import { MouseEventHandler, PropsWithChildren } from 'react'
import { Button } from '@/components/ui/button.tsx'
import { RefreshCcw } from 'lucide-react'

interface RefreshButtonProps {
  onClick: MouseEventHandler<HTMLButtonElement>,
  isFetching: boolean,
}

export const RefreshButton = (props: PropsWithChildren<RefreshButtonProps>) => (
  <Button
    onClick={props.onClick}
    disabled={props.isFetching}
    variant="outline"
    size="icon"
    className="my-auto ml-2"
  >
    <RefreshCcw
      className={`h-4 w-4 ${props.isFetching && 'animate-spin'}`} />
  </Button>
)
