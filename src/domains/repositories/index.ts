import type { CopyId, MemberNumber } from "../constraints";
import type { ActiveLoan, Copy, Loan, Member } from "../entities";

export interface MemberRepository {
    findByMemberNumber(memberNumber: MemberNumber): Promise<Member | null>;
    findByNormalizedEmail(normalizedEmail: string): Promise<Member | null>;
    create(member: Member): Promise<void>;
}

export interface CopyRepository {
    findByCopyId(copyId: CopyId): Promise<Copy | null>;
}

export interface LoanRepository {
    findActiveLoanByCopyId(copyId: CopyId): Promise<ActiveLoan | null>;
    countActiveLoansByMemberNumber(memberNumber: MemberNumber): Promise<number>;
    insertOrReplaceByLoanId(loan: Loan): Promise<void>;
}
