import { computeDueDate, computeLateDays, type CalendarDate, type CopyId, type LoanId, type MemberNumber } from "../constraints";

interface LoanCommonFields {
    readonly loanId: LoanId;
    readonly memberNumber: MemberNumber;
    readonly copyId: CopyId;
    readonly borrowedOn: CalendarDate;
    readonly dueOn: CalendarDate;
}

export interface ActiveLoan extends LoanCommonFields {
    readonly status: "active";
}

export interface ReturnedLoan extends LoanCommonFields {
    readonly status: "returned";
    readonly returnedOn: CalendarDate;
    readonly lateDays: number;
}

export type Loan = ActiveLoan | ReturnedLoan;

export function startLoan(params: {
    readonly loanId: LoanId;
    readonly memberNumber: MemberNumber;
    readonly copyId: CopyId;
    readonly borrowedOn: CalendarDate;
}): ActiveLoan {
    return {
        ...params,
        status: "active",
        dueOn: computeDueDate(params.borrowedOn),
    };
}

export function closeLoan(activeLoan: ActiveLoan, returnedOn: CalendarDate): ReturnedLoan {
    return {
        ...activeLoan,
        status: "returned",
        returnedOn,
        lateDays: computeLateDays(activeLoan.dueOn, returnedOn),
    };
}
