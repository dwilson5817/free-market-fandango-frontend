import { useMarketActiveGet } from "@/hooks/data/use-market-active-get";
import { useMarketPurchasesGet } from "@/hooks/data/use-market-purchases-get";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { Badge } from "@/components/ui/badge.tsx";
import { formatPrice } from "@/lib/utils";
import { useCardsGet } from "@/hooks/data/use-cards-get";
import { components } from "@/hooks/types/schema";

const PURCHASES_TO_SHOW = 3;

interface PurchaseInfo {
  cards?: components["schemas"]["Card-Output"][];
  purchase: components["schemas"]["PurchaseOut"];
}

const PurchaseInfo = ({ cards, purchase }: PurchaseInfo) => {
  const card = cards?.find((card) => card.card_number === purchase.card_number);

  if (card)
    return (
      <p>
        {card.name} purchased{" "}
        <Badge className="font-mono">{purchase.stock_code}</Badge> for{" "}
        {formatPrice(purchase.price)} at{" "}
        {new Intl.DateTimeFormat("en-GB", {
          timeStyle: "short",
          hourCycle: "h12",
        }).format(Date.parse(purchase.timestamp!))}
      </p>
    );

  return (
    <p>
      <Badge className="font-mono">{purchase.stock_code}</Badge> was purchased
      for {formatPrice(purchase.price)} at{" "}
      {new Intl.DateTimeFormat("en-GB", {
        timeStyle: "short",
        hourCycle: "h12",
      }).format(Date.parse(purchase.timestamp!))}
    </p>
  );
};

export const BoardPurchases = () => {
  const { data: market } = useMarketActiveGet();
  const { data: purchases } = useMarketPurchasesGet(market?.uuid!);
  const { data: cards } = useCardsGet();

  const latestPurchases = purchases
    ?.sort((a, b) => Date.parse(a.timestamp!) - Date.parse(b.timestamp!))
    .slice(Math.max(purchases.length - PURCHASES_TO_SHOW, 0));

  return (
    <motion.div layoutId="purchases" className="flex-1">
      <div className="flex flex-col h-full p-3">
        <div className="flex-1">
          <h1 className="uppercase text-base font-bold">Latest purchases</h1>
        </div>
        <div className="">
          <LayoutGroup>
            <AnimatePresence>
              {latestPurchases?.map((purchase) => (
                <motion.div
                  className="my-0.5"
                  layoutId={purchase.timestamp}
                  key={purchase.timestamp}
                  variants={{
                    enter: {
                      zIndex: 0,
                      y: 15,
                      opacity: 1,
                    },
                    center: {
                      zIndex: 1,
                      y: 0,
                      opacity: 1,
                    },
                    exit: () => {
                      return {
                        zIndex: 0,
                        opacity: 0,
                      };
                    },
                  }}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    y: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 1 },
                  }}
                >
                  <PurchaseInfo cards={cards} purchase={purchase} />
                </motion.div>
              ))}
            </AnimatePresence>
          </LayoutGroup>
        </div>
      </div>
    </motion.div>
  );
};
