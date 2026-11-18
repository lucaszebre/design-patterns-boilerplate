import type { LoanId, MemberNumber } from "../../domains/constraints";
import type { IdGenerator } from "../../domains/ports";

export class SequentialIdGenerator implements IdGenerator {
    private lastMemberNumber = 0;
    private lastLoanId = 0;

    public nextMemberNumber(): MemberNumber {
        this.lastMemberNumber += 1;
        return `M-${this.lastMemberNumber}` as MemberNumber;
    }

    public nextLoanId(): LoanId {
        this.lastLoanId += 1;
        return `L-${this.lastLoanId}` as LoanId;
    }
}
