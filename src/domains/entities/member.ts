import type { MemberNumber } from "../constraints";

export interface Member {
    readonly memberNumber: MemberNumber;
    readonly lastName: string;
    readonly firstName: string;
    readonly normalizedEmail: string;
}
