import type { ArchiId, ArchiProperty, ExtraAttributes } from './common.js';
import type { DiagramModel } from './diagram.js';

/**
 * Base for every `element` under a folder in Archi XML (concepts, relationships, diagram roots).
 */
export abstract class ArchiElement {
  constructor(
    public readonly id: ArchiId,
    /** Local name from xsi:type, e.g. `Capability`, `AssociationRelationship`, `ArchimateDiagramModel` */
    public readonly xsiType: string,
    public readonly name: string | undefined,
    public readonly documentation: string | undefined,
    public readonly properties: readonly ArchiProperty[],
    /** Value of `profiles` attribute when present (space-separated ids in XML). */
    public readonly profileRefs: readonly ArchiId[] | undefined,
    public readonly extraAttributes: ExtraAttributes | undefined,
  ) {}
}

/** ArchiMate concept / structure element (not a *Relationship, not ArchimateDiagramModel). */
export class ConceptElement extends ArchiElement {
  constructor(
    id: ArchiId,
    xsiType: string,
    name: string | undefined,
    documentation: string | undefined,
    properties: readonly ArchiProperty[],
    profileRefs: readonly ArchiId[] | undefined,
    extraAttributes: ExtraAttributes | undefined,
    /** For `Junction`: `or` | `and` from XML `type` attribute (distinct from xsi:type). */
    public readonly junctionKind: string | undefined,
  ) {
    super(id, xsiType, name, documentation, properties, profileRefs, extraAttributes);
  }
}

/** Relationship line in the model graph (`*Relationship` xsi types). */
export class RelationshipElement extends ArchiElement {
  constructor(
    id: ArchiId,
    xsiType: string,
    name: string | undefined,
    documentation: string | undefined,
    properties: readonly ArchiProperty[],
    profileRefs: readonly ArchiId[] | undefined,
    extraAttributes: ExtraAttributes | undefined,
    public readonly source: ArchiId,
    public readonly target: ArchiId,
    /** Influence strength: `+`, `++`, `-`, etc. */
    public readonly strength: string | undefined,
    /** Access type and similar relationship qualifiers when present on XML */
    public readonly accessType: string | undefined,
  ) {
    super(id, xsiType, name, documentation, properties, profileRefs, extraAttributes);
  }
}

/**
 * View root: `xsi:type="archimate:ArchimateDiagramModel"` — canvas + nested diagram objects.
 */
export class DiagramElement extends ArchiElement {
  constructor(
    id: ArchiId,
    name: string | undefined,
    documentation: string | undefined,
    properties: readonly ArchiProperty[],
    profileRefs: readonly ArchiId[] | undefined,
    extraAttributes: ExtraAttributes | undefined,
    public readonly diagram: DiagramModel,
  ) {
    super(id, 'ArchimateDiagramModel', name, documentation, properties, profileRefs, extraAttributes);
  }
}

/** Any xsi:type not mapped to a dedicated class — still round-tripped via attribute bag. */
export class UnknownArchiElement extends ArchiElement {
  constructor(
    id: ArchiId,
    xsiType: string,
    name: string | undefined,
    documentation: string | undefined,
    properties: readonly ArchiProperty[],
    profileRefs: readonly ArchiId[] | undefined,
    extraAttributes: ExtraAttributes | undefined,
  ) {
    super(id, xsiType, name, documentation, properties, profileRefs, extraAttributes);
  }
}

export type AnyArchiElement =
  | ConceptElement
  | RelationshipElement
  | DiagramElement
  | UnknownArchiElement;
