export function startOfDay(date: Date = new Date()): Date {
  return new Date(date.setHours(0, 0, 0, 0));
}

export function endOfDay(date: Date = new Date()): Date {
  return new Date(date.setHours(23, 59, 59, 999));
}

export function startOfYesterday(): Date {
  const date = new Date();
  date.setDate(date.getDate() - 1);
  return startOfDay(date);
}

export function endOfYesterday(): Date {
  const date = new Date();
  date.setDate(date.getDate() - 1);
  return endOfDay(date);
}

export function oneWeekAgo(): Date {
  const date = new Date();
  date.setDate(date.getDate() - 7);
  return date;
}
