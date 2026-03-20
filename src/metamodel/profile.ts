import type { ArchiId } from './common.js';

/**
 * Top-level `profile` in Archi model — specialization / image for a concept type.
 */
export class Profile {
  constructor(
    public readonly id: ArchiId,
    public readonly name: string,
    /** Path under model package, e.g. `images/foo.png` */
    public readonly imagePath: string | undefined,
    /** Target concept xsi:type local name, e.g. `Capability`, `BusinessFunction` */
    public readonly conceptType: string | undefined,
  ) {}
}
