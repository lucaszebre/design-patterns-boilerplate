import type { CopyId, MemberNumber, Result } from "../constraints";
import type { ActiveLoan } from "../entities";
import type { Clock, IdGenerator } from "../ports";
import type { CopyRepository, LoanRepository, MemberRepository } from "../repositories";

export interface BorrowCopyInput {
    readonly memberNumber: MemberNumber;
    readonly copyId: CopyId;
}

export interface BorrowCopyDependencies {
    readonly memberRepository: MemberRepository;
    readonly copyRepository: CopyRepository;
    readonly loanRepository: LoanRepository;
    readonly clock: Clock;
    readonly idGenerator: IdGenerator;
}

export type BorrowCopyErrorInCheckOrder =
    | { readonly code: "MEMBER_NOT_FOUND"; readonly memberNumber: MemberNumber }
    | { readonly code: "COPY_NOT_FOUND"; readonly copyId: CopyId }
    | { readonly code: "ACTIVE_LOAN_LIMIT_REACHED"; readonly activeLoanCount: number }
    | { readonly code: "COPY_ALREADY_BORROWED"; readonly copyId: CopyId };

export async function borrowCopy(
    input: BorrowCopyInput,
    dependencies: BorrowCopyDependencies,
): Promise<Result<ActiveLoan, BorrowCopyErrorInCheckOrder>> {
    throw new Error("Not implemented");
}
