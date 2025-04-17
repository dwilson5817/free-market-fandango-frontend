import { NavigationBar } from "@/components/navigation-bar.tsx";
import MarketStatus from "@/components/market-status.tsx";
import { PropsWithChildren } from "react";

interface PageLayoutProps {
  title: string;
  description: string;
  showMarketStatus?: boolean;
}

export const PageLayout = ({
  title,
  description,
  showMarketStatus = true,
  children,
}: PropsWithChildren<PageLayoutProps>) => {
  return (
    <>
      <NavigationBar />
      <div
        className={`bg-primary ${showMarketStatus ? "pb-32" : "pb-20"} text-white`}
      >
        <div className="container px-4 pt-6 pb-2 mx-auto lg:px-6">
          <h1 className="text-4xl font-bold mb-2">{title}</h1>
          <h2 className="text-2xl font-bold opacity-70">{description}</h2>
        </div>
      </div>
      <div
        className={`container mx-auto ${showMarketStatus ? "-mt-32" : "-mt-20"} p-4 lg:p-6 grid gap-y-4`}
      >
        {showMarketStatus && <MarketStatus />}
        {children}
      </div>
    </>
  );
};
