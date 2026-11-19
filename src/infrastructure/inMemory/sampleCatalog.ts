import type { BookId, CopyId } from "../../domains/constraints";
import type { Copy } from "../../domains/entities";

function copiesOfBook(bookId: string, numberOfCopies: number): Copy[] {
    return Array.from({ length: numberOfCopies }, (_, index) => ({
        copyId: `${bookId}-${index + 1}` as CopyId,
        bookId: bookId as BookId,
    }));
}

export const sampleCatalog: readonly Copy[] = [
    ...copiesOfBook("le-petit-prince", 3),
    ...copiesOfBook("les-miserables", 2),
    ...copiesOfBook("l-etranger", 2),
    ...copiesOfBook("madame-bovary", 1),
    ...copiesOfBook("vingt-mille-lieues-sous-les-mers", 1),
];
