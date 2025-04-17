import { useStocksGet } from "@/hooks/data/use-stocks-get.ts";
import { LoadingSpinner } from "@/components/loading-spinner.tsx";
import { Card } from "@/components/ui/card";
import { CardHeader } from "@/components/ui/card.tsx";
import { useMarketPricesGet } from "@/hooks/data/use-market-prices-get.ts";
import { useMarketActiveGet } from "@/hooks/data/use-market-active-get.ts";
import { formatPrice, formatTimestamp } from "@/lib/utils.ts";
import {
  ChevronsDown,
  ChevronsUp,
  ChevronsUpDown,
  TriangleAlert,
} from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { ChartContainer } from "@/components/ui/chart";
import { useMarketHistoryGet } from "@/hooks/data/use-market-history-get.ts";
import { useEffect, useState } from "react";
import Logo from "@/assets/logo-full.svg";
import { BoardFooter } from "@/components/board-footer.tsx";
import { BoardNews } from "@/components/board-news.tsx";

interface StockCardProps {
  stockCode: string;
}

const iso2601ToMillis = (iso2601?: string) => {
  const date = new Date((iso2601 || "") + "Z");

  return date.getTime();
};

const StockCard = (props: StockCardProps) => {
  const [currentTime, setCurrentTime] = useState(Date.now());
  const { data: activeMarket } = useMarketActiveGet();
  const { data: stocks } = useStocksGet();
  const { data: marketPrices } = useMarketPricesGet(activeMarket?.uuid);
  const { data: priceHistory } = useMarketHistoryGet(
    props.stockCode,
    activeMarket?.uuid,
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const stock = stocks?.find((stock) => stock.code === props.stockCode);
  const marketPrice = marketPrices?.find(
    (marketPrice) => marketPrice.stock_code === props.stockCode,
  );

  if (!stock || !marketPrice) return <LoadingSpinner />;

  const change =
    (marketPrice.price as unknown as number) -
    (stock.initial_price as unknown as number);
  const percentageChange = change / (stock.initial_price as unknown as number);

  let Icon = ChevronsUpDown;
  let colorClass = "font-extrabold animate-pulse";

  if (percentageChange > 0) {
    Icon = ChevronsUp;
    colorClass += " text-green-700";
  }

  if (percentageChange < 0) {
    Icon = ChevronsDown;
    colorClass += " text-red-700";
  }

  const pctIncrease = new Intl.NumberFormat("en-US", {
    style: "percent",
    signDisplay: "never",
    maximumFractionDigits: 2,
  }).format(percentageChange);

  const chartData = [
    {
      timestamp: iso2601ToMillis(activeMarket?.opened_at),
      price: stock.initial_price,
    },
    ...(priceHistory?.map((price, index) => ({
      timestamp: iso2601ToMillis(price.timestamp),
      price: priceHistory[index + 1]?.previous_price || marketPrice.price,
    })) || []),
    { timestamp: currentTime, price: marketPrice.price },
  ];

  if (props.stockCode === "LAST") {
    console.log(
      chartData.map((item) => ({
        ...item,
        timestamp: new Date(item.timestamp).toISOString(),
      })),
    );
  }

  return (
    <Card className="flex-0">
      <CardHeader>
        <div className="flex font-extrabold text-xl">
          <div className="flex-1">{stock?.code}</div>
          <div className="animate-pulse">{formatPrice(marketPrice.price)}</div>
        </div>
        <div className="flex">
          <div className="flex-1 opacity-70">{stock?.name}</div>
          <div className={colorClass + " flex items-center"}>
            <div>
              <Icon className="inline w-4" />
            </div>
            <div>{pctIncrease}</div>
          </div>
        </div>
      </CardHeader>
      <ChartContainer
        config={{
          price: {
            label: "Price",
            color: "hsl(var(--chart-1))",
          },
        }}
      >
        <AreaChart
          accessibilityLayer
          margin={{ top: 0, left: 0, right: 0, bottom: 0 }}
          data={chartData}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="timestamp"
            domain={["min", "max"]}
            type="number"
            interval="preserveEnd"
            hide
          />
          <defs>
            <linearGradient id="fillPrice" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor="var(--color-price)"
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor="var(--color-price)"
                stopOpacity={0.1}
              />
            </linearGradient>
          </defs>
          <Area
            dataKey="price"
            type="stepAfter"
            fill="url(#fillPrice)"
            fillOpacity={0.4}
            stroke="var(--color-price)"
            stackId="a"
          />
        </AreaChart>
      </ChartContainer>
    </Card>
  );
};

const Board = () => {
  const { data: stocks, isLoading: isStocksLoading } = useStocksGet();
  const {
    data: market,
    isLoading: isMarketLoading,
    dataUpdatedAt,
  } = useMarketActiveGet();

  if (isMarketLoading) return <LoadingSpinner />;

  const updatedAt = new Date(dataUpdatedAt);

  if (!market?.active) {
    return (
      <div className="flex justify-center p-16 h-screen w-screen bg-gradient-to-b from-[#9aca3c] to-[#d5364b]">
        <div className="flex items-center flex-col">
          <img src={Logo} alt="Free Market Fandango logo" className="h-36" />
          <h1 className="text-white text-4xl font-extrabold">
            The market is currently closed!
          </h1>
        </div>
        <div className="absolute bottom-0 right-0 p-2 font-mono">
          Market UUID is {market?.uuid ?? "NONE"} | React Query reports
          dataUpdatedAt {updatedAt.toISOString()}
        </div>
      </div>
    );
  }

  return (
    <div key="board" className="flex flex-col h-screen">
      {market.closed_at && (
        <div className="w-full p-2 text-lg font-semibold text-center bg-orange-500">
          <TriangleAlert className="inline-block mr-2 mb-1" />
          The market will close{" "}
          <span className="font-extrabold">
            {formatTimestamp(market.closed_at + "Z")}
          </span>
        </div>
      )}
      <div className="w-full p-4 bg-gradient-to-b from-[#9aca3c] to-[#d5364b] mb-4">
        <img src={Logo} alt="Free Market Fandango logo" className="h-16" />
      </div>
      <div className="flex flex-col flex-1">
        <div className="grid grid-cols-5 gap-4 px-4">
          {!isStocksLoading && stocks ? (
            stocks.map((stock) => <StockCard stockCode={stock.code} />)
          ) : (
            <LoadingSpinner />
          )}
        </div>
      </div>
      <BoardFooter />
      <BoardNews />
    </div>
  );
};

export default Board;
