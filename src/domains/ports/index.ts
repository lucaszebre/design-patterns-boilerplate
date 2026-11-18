import type { CalendarDate, LoanId, MemberNumber } from "../constraints";

export interface Clock {
    today(): CalendarDate;
}

export interface IdGenerator {
    nextMemberNumber(): MemberNumber;
    nextLoanId(): LoanId;
}
