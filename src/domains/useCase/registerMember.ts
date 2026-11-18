import type { Result } from "../constraints";
import type { Member } from "../entities";
import type { IdGenerator } from "../ports";
import type { MemberRepository } from "../repositories";

export interface RegisterMemberInput {
    readonly rawLastName: string;
    readonly rawFirstName: string;
    readonly rawEmail: string;
}

export interface RegisterMemberDependencies {
    readonly memberRepository: MemberRepository;
    readonly idGenerator: IdGenerator;
}

export type RegisterMemberErrorInCheckOrder =
    | { readonly code: "LAST_NAME_IS_BLANK" }
    | { readonly code: "FIRST_NAME_IS_BLANK" }
    | { readonly code: "EMAIL_IS_INVALID" }
    | { readonly code: "EMAIL_ALREADY_REGISTERED"; readonly normalizedEmail: string };

export async function registerMember(
    input: RegisterMemberInput,
    dependencies: RegisterMemberDependencies,
): Promise<Result<Member, RegisterMemberErrorInCheckOrder>> {
    throw new Error("Not implemented");
}
