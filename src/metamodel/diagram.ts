import type { ArchiId, ExtraAttributes } from './common.js';
import { Bendpoint, Bounds, DiagramFeature } from './common.js';

/** Discriminator for diagram canvas nodes (`child` under ArchimateDiagramModel or nested). */
export const DiagramNodeKind = {
  DiagramObject: 'DiagramObject',
  Note: 'Note',
  Group: 'Group',
  DiagramModelReference: 'DiagramModelReference',
  Unknown: 'Unknown',
} as const;

export type DiagramNodeKind =
  (typeof DiagramNodeKind)[keyof typeof DiagramNodeKind];

export abstract class DiagramNode {
  abstract readonly kind: DiagramNodeKind;
  constructor(
    public readonly id: ArchiId,
    public readonly extraAttributes: ExtraAttributes | undefined,
  ) {}
}

/** Visual instance of a model element on a canvas */
export class DiagramObjectNode extends DiagramNode {
  readonly kind: typeof DiagramNodeKind.DiagramObject =
    DiagramNodeKind.DiagramObject;

  constructor(
    id: ArchiId,
    extraAttributes: ExtraAttributes | undefined,
    public readonly archimateElement: ArchiId | undefined,
    /** Parsed from `targetConnections` (space-separated diagram object ids) */
    public readonly targetConnectionIds: readonly ArchiId[] | undefined,
    public readonly bounds: Bounds | undefined,
    public readonly fillColor: string | undefined,
    public readonly font: string | undefined,
    public readonly lineColor: string | undefined,
    public readonly textPosition: number | undefined,
    public readonly textAlignment: number | undefined,
    public readonly borderType: number | undefined,
    /** Archi diagram-object `type` attribute (integer), not xsi:type */
    public readonly objectType: number | undefined,
    public readonly features: readonly DiagramFeature[],
    public readonly sourceConnections: readonly ConnectionNode[],
    public readonly children: readonly DiagramNode[],
  ) {
    super(id, extraAttributes);
  }
}

export class NoteNode extends DiagramNode {
  readonly kind: typeof DiagramNodeKind.Note = DiagramNodeKind.Note;

  constructor(
    id: ArchiId,
    extraAttributes: ExtraAttributes | undefined,
    public readonly bounds: Bounds | undefined,
    public readonly content: string | undefined,
    public readonly font: string | undefined,
    public readonly fillColor: string | undefined,
    public readonly lineColor: string | undefined,
    public readonly textPosition: number | undefined,
    public readonly textAlignment: number | undefined,
    public readonly borderType: number | undefined,
    public readonly features: readonly DiagramFeature[],
  ) {
    super(id, extraAttributes);
  }
}

export class GroupNode extends DiagramNode {
  readonly kind: typeof DiagramNodeKind.Group = DiagramNodeKind.Group;

  constructor(
    id: ArchiId,
    extraAttributes: ExtraAttributes | undefined,
    public readonly name: string | undefined,
    public readonly bounds: Bounds | undefined,
    public readonly font: string | undefined,
    public readonly borderType: number | undefined,
    public readonly features: readonly DiagramFeature[],
    public readonly children: readonly DiagramNode[],
  ) {
    super(id, extraAttributes);
  }
}

/** Link box to another diagram (nested view reference) */
export class DiagramModelReferenceNode extends DiagramNode {
  readonly kind: typeof DiagramNodeKind.DiagramModelReference =
    DiagramNodeKind.DiagramModelReference;

  constructor(
    id: ArchiId,
    extraAttributes: ExtraAttributes | undefined,
    public readonly referencedDiagramId: ArchiId,
    public readonly bounds: Bounds | undefined,
  ) {
    super(id, extraAttributes);
  }
}

export class UnknownDiagramNode extends DiagramNode {
  readonly kind: typeof DiagramNodeKind.Unknown = DiagramNodeKind.Unknown;

  constructor(
    id: ArchiId,
    extraAttributes: ExtraAttributes | undefined,
    /** xsi:type local name for debugging / forward compatibility */
    public readonly xsiTypeLocalName: string,
    public readonly children: readonly DiagramNode[],
  ) {
    super(id, extraAttributes);
  }
}

export type AnyDiagramNode =
  | DiagramObjectNode
  | NoteNode
  | GroupNode
  | DiagramModelReferenceNode
  | UnknownDiagramNode;

/** `sourceConnection` / `archimate:Connection` — edge between diagram objects */
export class ConnectionNode {
  constructor(
    public readonly id: ArchiId,
    public readonly sourceId: ArchiId,
    public readonly targetId: ArchiId,
    public readonly archimateRelationship: ArchiId | undefined,
    public readonly lineColor: string | undefined,
    public readonly lineWidth: number | undefined,
    public readonly font: string | undefined,
    public readonly textPosition: number | undefined,
    public readonly features: readonly DiagramFeature[],
    public readonly bendpoints: readonly Bendpoint[],
    public readonly extraAttributes: ExtraAttributes | undefined,
  ) {}
}

/** Content of an `ArchimateDiagramModel` element (the canvas tree). */
export class DiagramModel {
  constructor(public readonly rootChildren: readonly AnyDiagramNode[]) {}
}
