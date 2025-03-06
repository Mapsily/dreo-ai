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

export async function predictFields(data: Record<string, string>[]): Promise<{
  headers: string[];
  rows: Record<string, string>[];
}> {
  if (!data || data.length === 0) return { headers: [], rows: [] };

  const headers = Object.keys(data[0]);
  const predictedFields = headers.map((header) => {
    const lowerHeader = header.toLowerCase();
    if (lowerHeader.includes("name")) return "Name";
    if (lowerHeader.includes("phone") || lowerHeader.includes("tel"))
      return "Phone";
    if (lowerHeader.includes("note")) return "Notes";
    return "Unknown";
  });

  return {
    headers: predictedFields,
    rows: data,
  };
}


export const getDuration = (start: Date, end: Date) => {
  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    return "Invalid date";
  }

  let diff = Math.abs(end.getTime() - start.getTime()); // Difference in milliseconds

  const hours = Math.floor(diff / (1000 * 60 * 60));
  diff -= hours * (1000 * 60 * 60);

  const minutes = Math.floor(diff / (1000 * 60));
  diff -= minutes * (1000 * 60);

  const seconds = Math.floor(diff / 1000);

  return `${hours}h ${minutes}m ${seconds}s`;
};

