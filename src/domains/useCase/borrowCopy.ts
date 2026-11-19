import { failure, hasReachedActiveLoanLimit, success, type CopyId, type MemberNumber, type Result } from "../constraints";
import { startLoan, type ActiveLoan } from "../entities";
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
    const member = await dependencies.memberRepository.findByMemberNumber(input.memberNumber);
    if (member === null) {
        return failure({ code: "MEMBER_NOT_FOUND", memberNumber: input.memberNumber });
    }

    const copy = await dependencies.copyRepository.findByCopyId(input.copyId);
    if (copy === null) {
        return failure({ code: "COPY_NOT_FOUND", copyId: input.copyId });
    }

    const activeLoanCount = await dependencies.loanRepository.countActiveLoansByMemberNumber(member.memberNumber);
    if (hasReachedActiveLoanLimit(activeLoanCount)) {
        return failure({ code: "ACTIVE_LOAN_LIMIT_REACHED", activeLoanCount });
    }

    const currentLoanOfCopy = await dependencies.loanRepository.findActiveLoanByCopyId(copy.copyId);
    if (currentLoanOfCopy !== null) {
        return failure({ code: "COPY_ALREADY_BORROWED", copyId: copy.copyId });
    }

    const newLoan = startLoan({
        loanId: dependencies.idGenerator.nextLoanId(),
        memberNumber: member.memberNumber,
        copyId: copy.copyId,
        borrowedOn: dependencies.clock.today(),
    });
    await dependencies.loanRepository.insertOrReplaceByLoanId(newLoan);

    return success(newLoan);
}
