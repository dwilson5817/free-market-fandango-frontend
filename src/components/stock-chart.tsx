import { ChartContainer } from "@/components/ui/chart.tsx";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { useEffect, useState } from "react";
import { useMarketHistoryGet } from "@/hooks/data/use-market-history-get.ts";
import { useMarketActiveGet } from "@/hooks/data/use-market-active-get.ts";

const iso2601ToMillis = (iso2601?: string) => {
  const date = new Date((iso2601 || "") + "Z");

  return date.getTime();
};

interface StockChartProps {
  stockCode: string;
  initialStockPrice: string;
  currentStockPrice: string;
}

export const StockChart = ({
  stockCode,
  initialStockPrice,
  currentStockPrice,
}: StockChartProps) => {
  const [currentTime, setCurrentTime] = useState(Date.now());

  const { data: activeMarket } = useMarketActiveGet();
  const { data: priceHistory } = useMarketHistoryGet(
    stockCode,
    activeMarket?.uuid,
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const chartData = [
    {
      timestamp: iso2601ToMillis(activeMarket?.opened_at),
      price: initialStockPrice,
    },
    ...(priceHistory?.map((price, index) => ({
      timestamp: iso2601ToMillis(price.timestamp),
      price: priceHistory[index + 1]?.previous_price || currentStockPrice,
    })) || []),
    { timestamp: currentTime, price: currentStockPrice },
  ];

  return (
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
  );
};
