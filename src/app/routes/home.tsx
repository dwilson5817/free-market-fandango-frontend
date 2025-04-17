import { NavigationBar } from "@/components/navigation-bar.tsx";
import { Card, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { StocksTable } from "@/components/stocks-table.tsx";
import { ChevronsRight, CreditCard, LifeBuoy, TrendingUp } from "lucide-react";
import { Link } from "react-router";
import { BalancesTable } from "@/components/balances-table.tsx";
import MarketStatus from "@/components/market-status.tsx";

const options = [
  {
    icon: CreditCard,
    route: "/card",
    title: "Card",
    description: "Check your card balance",
  },
  {
    icon: TrendingUp,
    route: "/stocks",
    title: "Stocks",
    description: "See live price information",
  },
  {
    icon: LifeBuoy,
    route: "/help",
    title: "Help",
    description: "See information about how to play",
  },
];

const Home = () => {
  return (
    <>
      <NavigationBar />
      <div className="container mx-auto p-4 lg:p-6 grid gap-y-4">
        <MarketStatus />
        <Card className="text-white">
          <CardHeader className="rounded-t-xl bg-primary">
            <CardTitle>
              <h1 className="text-4xl font-bold mb-4">Free Market Fandango</h1>
              <h2 className="text-2xl font-bold opacity-70">
                A stock market themed party where purchases affect drink prices
              </h2>
            </CardTitle>
          </CardHeader>
          <div className="grid lg:grid-cols-3 bg-primary/80 rounded-b-xl border-t divide-y lg:divide-y-0 lg:divide-x">
            {options.map((option) => (
              <Link
                to={option.route}
                className="p-4 flex gap-x-3 items-center transition-colors opacity-75 hover:opacity-100"
              >
                <option.icon className="w-8 h-8" />
                <div className="flex-1">
                  <h1 className="font-semibold">{option.title}</h1>
                  <h2 className="text-sm">{option.description}</h2>
                </div>
                <ChevronsRight className="w-8 h-8" />
              </Link>
            ))}
          </div>
        </Card>
        <div className="grid lg:grid-cols-2 gap-x-4 gap-y-4">
          <StocksTable />
          <BalancesTable />
        </div>
      </div>
    </>
  );
};

export default Home;
