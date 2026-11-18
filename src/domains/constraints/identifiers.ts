declare const brand: unique symbol;
export type Brand<T, B extends string> = T & { readonly [brand]: B };

export type MemberNumber = Brand<string, "MemberNumber">;
export type BookId = Brand<string, "BookId">;
export type CopyId = Brand<string, "CopyId">;
export type LoanId = Brand<string, "LoanId">;
