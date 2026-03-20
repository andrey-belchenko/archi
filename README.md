# archi

TypeScript library modeling **Archi’s native `.archimate` XML** (persistence metamodel): folders, concepts, relationships, diagram canvas nodes, and profiles.

## Setup

```bash
npm install
npm run build
```

## Layout

- [`src/metamodel/archi-model.ts`](src/metamodel/archi-model.ts) — `ArchiModel` root
- [`src/metamodel/folder.ts`](src/metamodel/folder.ts) — `Folder` tree
- [`src/metamodel/elements.ts`](src/metamodel/elements.ts) — `ArchiElement`, `ConceptElement`, `RelationshipElement`, `DiagramElement`, `UnknownArchiElement`
- [`src/metamodel/diagram.ts`](src/metamodel/diagram.ts) — `DiagramModel`, `DiagramObjectNode`, `NoteNode`, `GroupNode`, `ConnectionNode`, etc.
- [`src/metamodel/profile.ts`](src/metamodel/profile.ts) — `Profile`
- [`src/metamodel/common.ts`](src/metamodel/common.ts) — `Bounds`, `ArchiProperty`, …
- [`src/metamodel/guards.ts`](src/metamodel/guards.ts) — type predicates

Import from the package root after build: `import { ArchiModel, Folder } from 'archi-metamodel'` (or use relative paths to `src/` during development).

Next step: XML parser/serializer that maps DOM → these classes.