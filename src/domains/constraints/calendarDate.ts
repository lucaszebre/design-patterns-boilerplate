import type { Brand } from "./identifiers";

export type CalendarDate = Brand<string, "CalendarDate">;

const MILLISECONDS_PER_DAY = 86_400_000;

function toUtcMilliseconds(date: CalendarDate): number {
    return Date.parse(`${date}T00:00:00Z`);
}

export function addDays(date: CalendarDate, days: number): CalendarDate {
    return new Date(toUtcMilliseconds(date) + days * MILLISECONDS_PER_DAY).toISOString().slice(0, 10) as CalendarDate;
}

export function daysFromTo(from: CalendarDate, to: CalendarDate): number {
    return Math.round((toUtcMilliseconds(to) - toUtcMilliseconds(from)) / MILLISECONDS_PER_DAY);
}
