import { AnimatePresence, motion } from "motion/react";
import { useSpotifyCurrentlyPlayingGet } from "@/hooks/data/use-spotify-currently-playing-get";
import { useEffect, useRef, useState } from "react";
import { Progress } from "@/components/ui/progress.tsx";

function useInterval(callback: () => void, delay: number) {
  const savedCallback = useRef<() => void>();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current?.();
    }
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export const BoardSpotify = () => {
  const { data: currentPlaying, dataUpdatedAt } =
    useSpotifyCurrentlyPlayingGet();
  const [progressTimeMs, setProgressTimeMs] = useState(0);

  useInterval(
    () =>
      setProgressTimeMs(
        (currentPlaying?.progress_ms ?? 0) + (Date.now() - dataUpdatedAt),
      ),
    100,
  );

  return (
    <>
      <AnimatePresence>
        {currentPlaying && (
          <motion.div
            layoutId="spotify"
            className="flex-1 relative h-full bg-gradient-to-r from-green-600"
            initial={{
              x: "-100%",
            }}
            animate={{
              x: 0,
            }}
            transition={{
              ease: "easeInOut",
              duration: 2,
            }}
            exit={{
              x: "-100%",
            }}
          >
            <div className="flex">
              <div className="flex-none">
                <img
                  className="w-40"
                  src={currentPlaying.artwork_url}
                  alt="Album artwork"
                />
              </div>
              <div className="flex flex-col w-full overflow-hidden m-3">
                <div className="flex-none text-2xl font-bold">
                  <p className="uppercase text-base font-bold">Now playing</p>
                </div>
                <div className="flex-grow content-end">
                  <p className="text-2xl font-bold truncate">
                    {currentPlaying.title}
                  </p>
                  <p className="text-xl font-bold truncate opacity-80">
                    {currentPlaying.album}
                  </p>
                  <p className="text-xl font-bold truncate opacity-80">
                    {currentPlaying.artists}
                  </p>

                  <Progress
                    value={(progressTimeMs / currentPlaying.duration_ms) * 100}
                    className="w-[60%] h-2 mt-2"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
