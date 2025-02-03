import { Button } from "@/components/ui/button.tsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx";
import {
  Calendar,
  ChevronDown,
  CircleDollarSign,
  CreditCard,
  LineChart,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { useCardsGet } from "@/hooks/data/use-cards-get.ts";
import { useEventsGet } from "@/hooks/data/use-events-get.ts";
import { useStocksGet } from "@/hooks/data/use-stocks-get.ts";
import { useMarketActiveGet } from "@/hooks/data/use-market-active-get.ts";
import { useMarketOpen } from "@/hooks/data/use-market-open.ts";
import { useMarketClose } from "@/hooks/data/use-market-close.ts";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import { formatTimestamp } from "@/lib/utils.ts";
import { AdminLayout } from "@/components/admin-layout.tsx";

const Dashboard = () => {
  const { data: cards, isLoading: isCardsLoading } = useCardsGet();
  const { data: events, isLoading: isEventsLoading } = useEventsGet();
  const { data: stocks, isLoading: isStocksLoading } = useStocksGet();

  const {
    data: market,
    isLoading: isMarketGetLoading,
    isError: isMarketGetError,
  } = useMarketActiveGet();
  const { mutate: openMarket, isPending: isMarketOpening } = useMarketOpen();
  const { mutate: closeMarket, isPending: isMarketClosing } = useMarketClose();

  const stats = [
    {
      name: "Cards",
      icon: <CreditCard className="h-4 w-4 text-muted-foreground" />,
      data: cards,
      isLoading: isCardsLoading,
    },
    {
      name: "Events",
      icon: <Calendar className="h-4 w-4 text-muted-foreground" />,
      data: events,
      isLoading: isEventsLoading,
    },
    {
      name: "Stocks",
      icon: <CircleDollarSign className="h-4 w-4 text-muted-foreground" />,
      data: stocks,
      isLoading: isStocksLoading,
    },
  ];

  const onCloseMarket = (mins: number) => {
    closeMarket({
      params: {
        path: {
          market_uuid: market?.uuid ?? "",
        },
        query: {
          ends_in: mins,
        },
      },
    });
  };

  return (
    <AdminLayout pageName="Dashboard">
      <div className="grid gap-4 md:grid-cols-2">
        <Button
          onClick={() => openMarket({})}
          disabled={isMarketOpening || market?.active}
        >
          Open
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              disabled={isMarketClosing || !market?.active}
              variant="destructive"
            >
              Close
              <ChevronDown className="ml-1 mt-1 w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => onCloseMarket(0)}>
              Immediately
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onCloseMarket(5)}>
              5 minutes
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onCloseMarket(15)}>
              15 minutes
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onCloseMarket(10)}>
              30 minutes
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            {isMarketGetLoading ? (
              <Skeleton className="h-5 w-[75px]" />
            ) : (
              "Market"
            )}
          </CardTitle>
          <LineChart className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <>
            <p className="mb-2 text-l font-bold">
              {isMarketGetLoading ? (
                <Skeleton className="w-3 h-3 rounded-full inline-block mr-2" />
              ) : (
                <span
                  className={
                    market?.active
                      ? "animate-pulse inline-block w-3 h-3 mr-2 bg-green-600 rounded-full"
                      : "inline-block w-3 h-3 mr-2 bg-red-600 rounded-full"
                  }
                ></span>
              )}

              <span className="font-mono">
                {isMarketGetLoading ? (
                  <Skeleton className="h-3 w-[320px] inline-block" />
                ) : (
                  (market?.uuid ?? "None")
                )}
              </span>
            </p>
            <div className="mb-2 text-l">
              {isMarketGetError ? (
                "The market has never been opened"
              ) : isMarketGetLoading ? (
                <Skeleton className="h-4 w-[320px] inline-block" />
              ) : market?.closed_at ? (
                <p>Closed {formatTimestamp(market?.closed_at || "")}</p>
              ) : (
                <p>Opened {formatTimestamp(market?.opened_at || "")}</p>
              )}
            </div>
          </>
        </CardContent>
      </Card>
      <div className="grid gap-4 lg:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.name}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.isLoading ? (
                  <Skeleton className="h-4 w-[60px]" />
                ) : (
                  stat.name
                )}
              </CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stat.data?.length ?? <Skeleton className="h-8 w-[40px]" />}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
