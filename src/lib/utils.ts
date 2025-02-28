import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const calculatePercentageChange = (
  todayCount: number,
  yesterdayCount: number
) => {
  if (yesterdayCount === 0) {
    return todayCount > 0 ? 100 : 0;
  }
  return ((todayCount - yesterdayCount) / yesterdayCount) * 100;
};

export function calculateConversationRate(
  successful: number,
  total: number
): number {
  if (total === 0) return 0;
  return (successful / total) * 100;
}

export const getDirection = (value: number | undefined) => {
  if (!value) return "DEFAULT";
  return value > 0 ? "UP" : "DOWN";
};
