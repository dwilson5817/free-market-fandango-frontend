import { useMarketActiveGet } from "@/hooks/data/use-market-active-get.ts";
import { useMarketPricesGet } from "@/hooks/data/use-market-prices-get.ts";
import { formatPrice } from "@/lib/utils.ts";
import { Card, CardContent, CardHeader } from "@/components/ui/card.tsx";
import { Minus, TrendingDown, TrendingUp } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import { PageLayout } from "@/components/page-layout.tsx";
import { useStocksGet } from "@/hooks/data/use-stocks-get.ts";
import { StockChart } from "@/components/stock-chart.tsx";

interface StockCardProps {
  stockCode: string;
  stockName: string;
  initialPrice: string;
}

const PriceDifference = ({
  currentPrice,
  initialPrice,
}: {
  currentPrice: number;
  initialPrice: number;
}) => {
  const percentageChange = (currentPrice - initialPrice) / initialPrice;

  let colourStyle = "";
  let Icon = Minus;

  if (percentageChange < 0) {
    colourStyle = "text-red-700";
    Icon = TrendingDown;
  }

  if (percentageChange > 0) {
    colourStyle = "text-green-800";
    Icon = TrendingUp;
  }

  const percentFormatted = percentageChange.toLocaleString("en-UK", {
    style: "percent",
    signDisplay: "always",
    minimumFractionDigits: 2,
  });

  return (
    <div className={`flex items-center gap-x-1.5 ${colourStyle}`}>
      <Icon className="w-4 h-4 " />
      <div>{percentFormatted}</div>
    </div>
  );
};

const StockCard = ({ stockCode, stockName, initialPrice }: StockCardProps) => {
  const { data: market } = useMarketActiveGet();
  const { data: prices, isLoading: isPricesLoading } = useMarketPricesGet(
    market?.uuid,
  );
  const price = prices?.find((price) => price.stock_code === stockCode);

  return (
    <Card>
      <CardHeader>
        <div className="flex">
          <div className="flex-1">
            <p className="font-mono text-xl font-bold">{stockCode}</p>
            <p className="text-muted-foreground text-sm">{stockName}</p>
          </div>
          {isPricesLoading || !price ? (
            <div className="grid gap-0.5 justify-items-end">
              <Skeleton className="h-6 w-[50px] mb-1 float-right" />
              <Skeleton className="h-5 w-[100px]" />
            </div>
          ) : (
            <div className="text-right">
              <p className="text-xl font-bold">{formatPrice(price.price)}</p>
              <PriceDifference
                currentPrice={Number(price.price)}
                initialPrice={parseFloat(initialPrice)}
              />
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <StockChart
          stockCode={stockCode}
          initialStockPrice={initialPrice}
          currentStockPrice={price?.price || ""}
        />
      </CardContent>
    </Card>
  );
};

const Stocks = () => {
  const { data: stocks } = useStocksGet();

  return (
    <PageLayout
      title="See stock prices"
      description="View the current and historical price of stocks"
    >
      <div className="grid md:grid-cols-3 gap-4">
        {stocks?.map((stock) => (
          <StockCard
            key={stock.code}
            stockCode={stock.code}
            stockName={stock.name}
            initialPrice={stock.initial_price}
          />
        ))}
      </div>
    </PageLayout>
  );
};

export default Stocks;
