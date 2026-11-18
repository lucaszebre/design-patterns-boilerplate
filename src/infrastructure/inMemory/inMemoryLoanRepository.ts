import type { CopyId, LoanId, MemberNumber } from "../../domains/constraints";
import type { ActiveLoan, Loan } from "../../domains/entities";
import type { LoanRepository } from "../../domains/repositories";

export class InMemoryLoanRepository implements LoanRepository {
    private readonly loansById = new Map<LoanId, Loan>();

    public async findActiveLoanByCopyId(copyId: CopyId): Promise<ActiveLoan | null> {
        for (const loan of this.loansById.values()) {
            if (loan.status === "active" && loan.copyId === copyId) {
                return loan;
            }
        }
        return null;
    }

    public async countActiveLoansByMemberNumber(memberNumber: MemberNumber): Promise<number> {
        let activeLoanCount = 0;
        for (const loan of this.loansById.values()) {
            if (loan.status === "active" && loan.memberNumber === memberNumber) {
                activeLoanCount += 1;
            }
        }
        return activeLoanCount;
    }

    public async insertOrReplaceByLoanId(loan: Loan): Promise<void> {
        this.loansById.set(loan.loanId, loan);
    }
}
