import type { CopyId, Result } from "../constraints";
import type { ReturnedLoan } from "../entities";
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
    throw new Error("Not implemented");
}
