import { useMarketActiveGet } from "@/hooks/data/use-market-active-get.ts";
import { formatTimestamp } from "@/lib/utils.ts";
import { Card } from "@/components/ui/card.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import { AnimatePresence, motion } from "motion/react";

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

const MarketError = () => {
  return (
    <Card className="bg-red-600 border-red-900 text-white">
      <div className="px-4 py-2 flex items-center gap-x-2">
        <Badge variant="secondary">Closed</Badge>
        <p className="text-sm font-bold mb-0.5">Market closed</p>
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
  const {
    data: market,
    isLoading: isMarketGetLoading,
    isError: isMarketGetError,
  } = useMarketActiveGet();

  // Derive a stable key for each visual state
  let statusKey: string;
  let statusNode: React.ReactNode;

  if (isMarketGetLoading) {
    statusKey = "loading";
    statusNode = <MarketLoading />;
  } else if (isMarketGetError) {
    statusKey = "error";
    statusNode = <MarketError />;
  } else if (market?.active) {
    if (market?.closed_at) {
      statusKey = "closing";
      statusNode = <MarketClosing closingAt={market.closed_at} />;
    } else {
      statusKey = "open";
      statusNode = <MarketOpen openedAt={market?.opened_at ?? ""} />;
    }
  } else {
    statusKey = "closed";
    statusNode = <MarketClosed closedAt={market?.closed_at ?? ""} />;
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={statusKey}
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 8 }}
        transition={{ duration: 0.2, ease: [0.2, 0, 0, 1] }}
      >
        {statusNode}
      </motion.div>
    </AnimatePresence>
  );
};

export default MarketStatus;
