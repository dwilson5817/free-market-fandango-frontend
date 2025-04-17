import QRCode from "@/assets/qr-code.svg";
import { BoardSpotify } from "@/components/board-spotify";
import { BoardPurchases } from "@/components/board-purchases";
import { LayoutGroup, motion } from "framer-motion";

export const BoardFooter = () => {
  return (
    <div className="flex flex-row bg-gradient-to-r from-green-800 to-blue-700">
      <LayoutGroup>
        <BoardSpotify />
        <BoardPurchases />
        <motion.div layoutId="info" className="flex-1">
          <div className="flex items-center">
            <div className="flex-1 px-3">
              <h1 className="font-semibold text-xl">
                Welcome to Free Market Fandango!
              </h1>
              <p className="my-2">
                Use your card to make drink purchases, your purchase will
                influence the market's prices.
              </p>
              <p className="my-2">
                Use the QR code to the right or visit{" "}
                <strong>market.dylanw.dev</strong> to check your card balance
                and stock prices from your phone!
              </p>
            </div>
            <img
              className="w-40"
              src={QRCode}
              alt="QR code to market.dylanw.dev"
            />
          </div>
        </motion.div>
      </LayoutGroup>
    </div>
  );
};
