import type { ArchiId } from './common.js';
import type { AnyArchiElement } from './elements.js';

/**
 * Folder tree as in Archi XML: nested folders plus model elements (concepts, relations, diagram roots).
 */
export class Folder {
  constructor(
    public readonly id: ArchiId,
    public readonly name: string,
    /** Archi folder `type`: strategy, business, application, technology, motivation, implementation_migration, relations, views, other */
    public readonly type: string | undefined,
    public readonly subfolders: readonly Folder[],
    public readonly elements: readonly AnyArchiElement[],
  ) {}
}
