/**
 * Shared primitives for Archi persistence (XML attributes and child elements).
 */

/** Archi element id, typically `id-` + hex uuid */
export type ArchiId = string;

/** `property` child: key/value pair on concepts, views, diagram nodes */
export class ArchiProperty {
  constructor(
    public readonly key: string,
    public readonly value: string,
  ) {}
}

/** Diagram `bounds` element */
export class Bounds {
  constructor(
    public readonly x: number,
    public readonly y: number,
    public readonly width: number,
    public readonly height: number,
  ) {}
}

/** Diagram `feature` child (e.g. labelExpression) */
export class DiagramFeature {
  constructor(
    public readonly name: string,
    public readonly value: string,
  ) {}
}

/** Connection routing `bendpoint` */
export class Bendpoint {
  constructor(
    public readonly startX?: number,
    public readonly startY?: number,
    public readonly endX?: number,
    public readonly endY?: number,
  ) {}
}

/**
 * Attributes present on XML but not mapped to first-class fields yet.
 * Ensures forward compatibility and lossless round-trip.
 */
export type ExtraAttributes = Readonly<Record<string, string>>;
