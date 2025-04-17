import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: string) {
  const amount = parseFloat(price);

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

const options: Intl.DateTimeFormatOptions = {
  weekday: "short",
  year: "numeric",
  month: "long",
  day: "numeric",
  hourCycle: "h12",
  hour: "numeric",
  minute: "numeric",
};

export function formatTimestamp(timestamp: string) {
  const date = new Date(timestamp);

  return date.toLocaleDateString("en-GB", options);
}
