import { failure, success, type CopyId, type Result } from "../constraints";
import { closeLoan, type ReturnedLoan } from "../entities";
import type { Clock } from "../ports";
import type { CopyRepository, LoanRepository } from "../repositories";

export interface ReturnCopyInput {
    readonly copyId: CopyId;
}

export interface ReturnCopyDependencies {
    readonly copyRepository: CopyRepository;
    readonly loanRepository: LoanRepository;
    readonly clock: Clock;
}

export type ReturnCopyErrorInCheckOrder =
    | { readonly code: "COPY_NOT_FOUND"; readonly copyId: CopyId }
    | { readonly code: "COPY_HAS_NO_ACTIVE_LOAN"; readonly copyId: CopyId };

export async function returnCopy(
    input: ReturnCopyInput,
    dependencies: ReturnCopyDependencies,
): Promise<Result<ReturnedLoan, ReturnCopyErrorInCheckOrder>> {
    const copy = await dependencies.copyRepository.findByCopyId(input.copyId);
    if (copy === null) {
        return failure({ code: "COPY_NOT_FOUND", copyId: input.copyId });
    }

    const currentLoanOfCopy = await dependencies.loanRepository.findActiveLoanByCopyId(copy.copyId);
    if (currentLoanOfCopy === null) {
        return failure({ code: "COPY_HAS_NO_ACTIVE_LOAN", copyId: copy.copyId });
    }

    const returnedLoan = closeLoan(currentLoanOfCopy, dependencies.clock.today());
    await dependencies.loanRepository.insertOrReplaceByLoanId(returnedLoan);

    return success(returnedLoan);
}
