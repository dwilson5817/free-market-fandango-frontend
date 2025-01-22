import { AdminLayout } from '@/components/admin-layout.tsx'
import { Link, useSearchParams } from 'react-router'
import { useSpotifyDisconnectPost } from '@/hooks/data/use-spotify-disconnect-post.ts'
import { useSpotifyConnectPost } from '@/hooks/data/use-spotify-connect-post.ts'
import { useSpotifyAccountGet } from '@/hooks/data/use-spotify-account-get.ts'
import { useSpotifyRedirectGet } from '@/hooks/data/use-spotify-redirect-get.ts'
import { useEffect } from 'react'
import { Button, buttonVariants } from '@/components/ui/button.tsx'
import { Check, UserRound, X } from 'lucide-react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog.tsx'
import { Card, CardHeader } from '@/components/ui/card.tsx'
import { Skeleton } from '@/components/ui/skeleton.tsx'
import { Badge } from '@/components/ui/badge.tsx'

const Spotify = () => {
  const [ searchParams, setSearchParams ] = useSearchParams();
  const authCode = searchParams.get('code')

  const { mutate: disconnect } = useSpotifyDisconnectPost()
  const { mutate: connect, isSuccess: isConnectSuccess, reset: resetConnectMutation } = useSpotifyConnectPost()
  const { data: account, isFetching, isLoading, isError, isSuccess, refetch } = useSpotifyAccountGet()
  const { data: redirect } = useSpotifyRedirectGet()

  useEffect(() => {
    if (authCode)
      connect({ body: {
          auth_code: searchParams.get('code') || ''
        } })
  }, [authCode])

  const dismissAlert = () => {
    resetConnectMutation()
    refetch()
    searchParams.delete('code')
    setSearchParams()
  }

  return (
    <AdminLayout
      pageName="Spotify"
      onRefreshClicked={() => refetch()}
      isFetching={isFetching}
    >
      <Dialog open={isConnectSuccess} onOpenChange={() => dismissAlert()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Success</DialogTitle>
            <DialogDescription>
              Spotify account connected successfully
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Card className="mb-4">
        <CardHeader>
          {isLoading &&
            <div className="flex gap-3">
              <div className="flex-none flex h-20 w-20 items-center justify-center">
                <Skeleton className="h-20 w-20 rounded-full" />
              </div>
              <div className="flex-grow self-center">
                <Skeleton className="h-6 mb-2 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
          }
          {isSuccess &&
            <div className="flex gap-3">
              <div className="flex-none flex h-20 w-20 items-center justify-center rounded-full bg-gray-700">
                <img className="rounded-full h-20 w-20" src={account?.profile_picture} alt="Profile picture" />
              </div>
              <div className="flex-grow self-center">
                <h1 className="text-lg font-semibold">{account?.display_name}</h1>
                <Badge variant="secondary" className="mt-2">
                  <Check className="mr-1 w-4 h-4" />
                  <p className="font-semibold">Connected</p>
                </Badge>
              </div>
              <div className="flex-none">
                <Button className="mr-1" onClick={() => disconnect({})}>
                  Disconnect
                </Button>
              </div>
            </div>
          }
          {isError &&
            <div className="flex gap-3">
              <div className="flex-none flex h-20 w-20 items-center justify-center rounded-full bg-gray-700">
                <UserRound />
              </div>
              <div className="flex-grow self-center">
                <h1 className="text-lg font-semibold">Connect to Spotify</h1>
                <Badge variant="secondary" className="mt-2">
                  <X className="mr-1 w-4 h-4" />
                  <p className="font-semibold">Disconnected</p>
                </Badge>
              </div>
              <div className="flex-none">
                <Link
                  to={redirect?.redirect_url || '#'}
                  className={buttonVariants()}>
                  Connect
                </Link>
              </div>
            </div>
          }
        </CardHeader>
      </Card>
    </AdminLayout>
  )
}

export default Spotify
