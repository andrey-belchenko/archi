import type { AnyDiagramNode } from './diagram.js';
import {
  DiagramModelReferenceNode,
  DiagramNodeKind,
  DiagramObjectNode,
  GroupNode,
  NoteNode,
  UnknownDiagramNode,
} from './diagram.js';
import type { AnyArchiElement } from './elements.js';
import {
  ConceptElement,
  DiagramElement,
  RelationshipElement,
  UnknownArchiElement,
} from './elements.js';

export function isConceptElement(e: AnyArchiElement): e is ConceptElement {
  return e instanceof ConceptElement;
}

export function isRelationshipElement(e: AnyArchiElement): e is RelationshipElement {
  return e instanceof RelationshipElement;
}

export function isDiagramElement(e: AnyArchiElement): e is DiagramElement {
  return e instanceof DiagramElement;
}

export function isUnknownArchiElement(e: AnyArchiElement): e is UnknownArchiElement {
  return e instanceof UnknownArchiElement;
}

export function isDiagramObjectNode(n: AnyDiagramNode): n is DiagramObjectNode {
  return n.kind === DiagramNodeKind.DiagramObject;
}

export function isNoteNode(n: AnyDiagramNode): n is NoteNode {
  return n.kind === DiagramNodeKind.Note;
}

export function isGroupNode(n: AnyDiagramNode): n is GroupNode {
  return n.kind === DiagramNodeKind.Group;
}

export function isDiagramModelReferenceNode(
  n: AnyDiagramNode,
): n is DiagramModelReferenceNode {
  return n.kind === DiagramNodeKind.DiagramModelReference;
}

export function isUnknownDiagramNode(n: AnyDiagramNode): n is UnknownDiagramNode {
  return n.kind === DiagramNodeKind.Unknown;
}
