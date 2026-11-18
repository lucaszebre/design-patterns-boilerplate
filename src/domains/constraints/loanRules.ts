import { addDays, daysFromTo, type CalendarDate } from "./calendarDate";

export const MAX_ACTIVE_LOANS_PER_MEMBER = 3;
export const LOAN_DURATION_IN_DAYS = 14;

export function hasReachedActiveLoanLimit(activeLoanCount: number): boolean {
    return activeLoanCount >= MAX_ACTIVE_LOANS_PER_MEMBER;
}

export function computeDueDate(borrowedOn: CalendarDate): CalendarDate {
    return addDays(borrowedOn, LOAN_DURATION_IN_DAYS);
}

export function computeLateDays(dueOn: CalendarDate, returnedOn: CalendarDate): number {
    return Math.max(0, daysFromTo(dueOn, returnedOn));
}
