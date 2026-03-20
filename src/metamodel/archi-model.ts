import type { Folder } from './folder.js';
import type { Profile } from './profile.js';

/**
 * Root of an Archi `.archimate` document (`archimate:model`).
 */
export class ArchiModel {
  constructor(
    public readonly id: string,
    public readonly name: string,
    /** Archi file format version string, e.g. `5.0.0` */
    public readonly version: string | undefined,
    public readonly rootFolders: readonly Folder[],
    public readonly profiles: readonly Profile[],
  ) {}
}
