import { useMarketActiveGet } from "@/hooks/data/use-market-active-get.ts";
import { formatTimestamp } from "@/lib/utils.ts";
import { Card } from "@/components/ui/card.tsx";
import { Badge } from "@/components/ui/badge.tsx";

const MarketLoading = () => {
  return (
    <Card>
      <div className="px-4 py-2 flex items-center gap-x-2">
        <Badge variant="secondary">Loading</Badge>
        <p className="text-sm font-bold mb-0.5">Checking market status...</p>
      </div>
    </Card>
  );
};

interface MarketOpenProps {
  openedAt: string;
}

const MarketOpen = ({ openedAt }: MarketOpenProps) => {
  return (
    <Card className="bg-green-600 border-green-900 text-white">
      <div className="px-4 py-2 flex items-center gap-x-2">
        <Badge variant="secondary">Open</Badge>
        <p className="text-sm font-bold mb-0.5">
          Market open since {formatTimestamp(openedAt)}
        </p>
      </div>
    </Card>
  );
};

interface MarketClosingProps {
  closingAt: string;
}

const MarketClosing = ({ closingAt }: MarketClosingProps) => {
  return (
    <Card className="bg-orange-600 border-orange-900 text-white">
      <div className="px-4 py-2 flex items-center gap-x-2">
        <Badge variant="secondary">Closing</Badge>
        <p className="text-sm font-bold mb-0.5">
          Market will close at {formatTimestamp(closingAt)}
        </p>
      </div>
    </Card>
  );
};

interface MarketClosedProps {
  closedAt: string;
}

const MarketClosed = ({ closedAt }: MarketClosedProps) => {
  return (
    <Card className="bg-red-600 border-red-900 text-white">
      <div className="px-4 py-2 flex items-center gap-x-2">
        <Badge variant="secondary">Closed</Badge>
        <p className="text-sm font-bold mb-0.5">
          Market closed on {formatTimestamp(closedAt)}
        </p>
      </div>
    </Card>
  );
};

const MarketStatus = () => {
  const { data: market, isLoading: isMarketGetLoading } = useMarketActiveGet();

  if (isMarketGetLoading) {
    return <MarketLoading />;
  }

  if (market?.active) {
    if (market?.closed_at) {
      return <MarketClosing closingAt={market?.closed_at} />;
    }

    return <MarketOpen openedAt={market?.opened_at ?? ""} />;
  }

  return <MarketClosed closedAt={market?.closed_at ?? ""} />;
};

export default MarketStatus;
