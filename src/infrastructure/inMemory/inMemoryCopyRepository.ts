import type { CopyId } from "../../domains/constraints";
import type { Copy } from "../../domains/entities";
import type { CopyRepository } from "../../domains/repositories";

export class InMemoryCopyRepository implements CopyRepository {
    private readonly copiesById = new Map<CopyId, Copy>();

    public constructor(catalog: readonly Copy[] = []) {
        for (const copy of catalog) {
            this.copiesById.set(copy.copyId, copy);
        }
    }

    public async findByCopyId(copyId: CopyId): Promise<Copy | null> {
        return this.copiesById.get(copyId) ?? null;
    }
}
