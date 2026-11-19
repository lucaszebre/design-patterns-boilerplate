import { failure, isBlank, isValidEmail, normalizeEmail, normalizeName, success, type Result } from "../constraints";
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
    const lastName = normalizeName(input.rawLastName);
    if (isBlank(lastName)) {
        return failure({ code: "LAST_NAME_IS_BLANK" });
    }

    const firstName = normalizeName(input.rawFirstName);
    if (isBlank(firstName)) {
        return failure({ code: "FIRST_NAME_IS_BLANK" });
    }

    const normalizedEmail = normalizeEmail(input.rawEmail);
    if (!isValidEmail(normalizedEmail)) {
        return failure({ code: "EMAIL_IS_INVALID" });
    }

    const memberWithSameEmail = await dependencies.memberRepository.findByNormalizedEmail(normalizedEmail);
    if (memberWithSameEmail !== null) {
        return failure({ code: "EMAIL_ALREADY_REGISTERED", normalizedEmail });
    }

    const member: Member = {
        memberNumber: dependencies.idGenerator.nextMemberNumber(),
        lastName,
        firstName,
        normalizedEmail,
    };
    await dependencies.memberRepository.create(member);

    return success(member);
}
