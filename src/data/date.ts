export type Date = string;

export function parseDate(dateString: string): Date {
  const regex = /^(\d{4})-(\d{2})-(\d{2})$/;
  const match = dateString.match(regex);
  
  if (!match) {
    throw new Error('Invalid date format. Expected YYYY-MM-DD');
  }

  const [, year, month, day] = match;
  const parsedDate = new globalThis.Date(parseInt(year), parseInt(month) - 1, parseInt(day));

  if (isNaN(parsedDate.getTime())) {
    throw new Error('Invalid date');
  }

  return dateString;
}

export function formatDate(date: Date): string {
  return date;
}

export function addDays(date: Date, days: number): Date {
  const parsedDate = new globalThis.Date(date);
  parsedDate.setDate(parsedDate.getDate() + days);
  return parsedDate.toISOString().split('T')[0];
}

export function compareDates(date1: Date, date2: Date): number {
  const d1 = new globalThis.Date(date1);
  const d2 = new globalThis.Date(date2);
  return d1.getTime() - d2.getTime();
}