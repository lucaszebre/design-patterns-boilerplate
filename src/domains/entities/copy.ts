import type { BookId, CopyId } from "../constraints";

export interface Copy {
    readonly copyId: CopyId;
    readonly bookId: BookId;
}
