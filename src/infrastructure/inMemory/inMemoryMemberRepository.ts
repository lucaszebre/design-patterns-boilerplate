import type { MemberNumber } from "../../domains/constraints";
import type { Member } from "../../domains/entities";
import type { MemberRepository } from "../../domains/repositories";

export class InMemoryMemberRepository implements MemberRepository {
    private readonly membersByNumber = new Map<MemberNumber, Member>();

    public async findByMemberNumber(memberNumber: MemberNumber): Promise<Member | null> {
        return this.membersByNumber.get(memberNumber) ?? null;
    }

    public async findByNormalizedEmail(normalizedEmail: string): Promise<Member | null> {
        for (const member of this.membersByNumber.values()) {
            if (member.normalizedEmail === normalizedEmail) {
                return member;
            }
        }
        return null;
    }

    public async create(member: Member): Promise<void> {
        this.membersByNumber.set(member.memberNumber, member);
    }
}
