import { useEventsGet } from "@/hooks/data/use-events-get";
import { useMarketActiveGet } from "@/hooks/data/use-market-active-get";
import Marquee from "react-fast-marquee";

export const BoardNews = () => {
  const { data: events } = useEventsGet();
  const { data: market } = useMarketActiveGet();

  const currentEvent = events?.find(
    (event) => event.uuid === market?.current_event,
  );

  return (
    <div className="flex-none grid grid-cols-8">
      <div className="p-3 border-r-2 border-white uppercase font-extrabold text-4xl text-right bg-red-800">
        News
      </div>
      <div className="py-3 col-span-7 bg-red-700 text-xl items-center">
        <div className="mt-1">
          <Marquee autoFill className="my-auto">
            <span className="font-bold mr-5">
              {currentEvent?.title ?? "No news yet"}:
            </span>
            <span>{currentEvent?.body ?? "We are waiting for new events"}</span>
            <span className="mx-8 animate-pulse">█</span>
          </Marquee>
        </div>
      </div>
    </div>
  );
};
