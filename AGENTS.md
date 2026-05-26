# AGENTS.md — Helios Design System

## Requirements

- Node.js `24.X` (pinned via `.nvmrc` / `.tool-versions` for asdf/mise)
- pnpm `10.11.0` (`>= 10.0.0` required)

## Monorepo Structure

```
packages/components/    # @hashicorp/design-system-components — Ember.js v2 addon (HDS components + SCSS)
packages/tokens/        # @hashicorp/design-system-tokens — style-dictionary design tokens
packages/flight-icons/  # @hashicorp/flight-icons — SVG icons + React components (Figma-synced)
packages/codemods/      # @hashicorp/design-system-codemods — jscodeshift migration codemods
showcase/               # Private Ember app — component demo app + test suite (QUnit + Percy)
website/                # Private Ember app — helios.hashicorp.design docs site
```

## Key commands - Root

```bash
pnpm install
pnpm changeset  # create a changeset before merging user-facing changes
```

## Directories

### packages/components

The `packages/components` library is the core reusable Ember component library for the Helios Design System. It provides accessible, consistent UI components for HashiCorp product teams, built with Ember.js and Glimmer using TypeScript and Handlebars.

#### Tech stack
- Components from this library are tested against minimum support target of Ember v5.12
- TypeScript support via Glint
- Creates single-file Glimmer components in `gts` format

#### Key commands
```bash
pnpm build   # must run before running tests in showcase
pnpm start   # watch mode
pnpm lint
pnpm lint:fix
pnpm format
```

#### Additional context
Read through further context and guidance for this library at `.github/instructions/directories/components`

#### Additional resources
- Design system documentation: [https://helios.hashicorp.design/components](https://helios.hashicorp.design/components)

### packages/tokens

The `packages/tokens` library contains the style tokens used in `@hashicorp/design-system-components`. It builds a library of foundational, semantic, and component-level CSS variables.

#### Key commands

```bash
pnpm build   # regenerates dist/ from style-dictionary
```

### packages/flight-icons

An icon library of icons synced from a Figma library which generates SVGs which can be used in React or Ember apps.

#### Key commands

```bash
# Requires FIGMA_TOKEN in .env
pnpm sync    # pull icons from Figma
pnpm build   # generate SVG/sprite/React bundles
pnpm typecheck
pnpm lint
```

### packages/codemods

A collection of codemods published for the `@hashicorp/design-system-components` package to be used in consumer applications.

#### Key commands
```bash
pnpm test  # Jest (not QUnit/Vitest)
pnpm update-docs
pnpm lint
pnpm lint:fix
```

### showcase

The `showcase` app is an Ember application used to develop, test, and visually validate all HDS components from the `packages/components` library. It serves as a live component playground, source for Percy visual regression snapshots, and houses the component acceptance and integration test suite.

#### Key commands

```bash
pnpm build
pnpm start      # dev server at localhost:4200
pnpm test       # runs the entire test suite
ember t -f component-name # runs component tests for an individual component
pnpm lint
pnpm lint:fix
pnpm format
```

#### Additional context
Read through further context and guidance for this application at `.github/instructions/directories/showcase`

### website

The `website` app is an Ember application used to document the HDS components and styles from the `packages/components` library. It provides design guidance, code guidance and examples, a11y compliance and recommendations, and the component API for each component.

#### Key commands

```bash
pnpm build
pnpm start      # dev server at localhost:4200
pnpm test       # runs the website application tests
pnpm lint
pnpm lint:fix
pnpm format
```

## Critical conventions

When working with this codebase:

- **Follow project conventions first**, then Ember standards
- **Don't edit auto-generated files**
- **Don't upgrade packages or Ember versions** unless explicitly requested
- **Use single-file format with file type `gts`** for all Ember components, templates, and test files.

## Architecture overview

For detailed language-specific patterns, see:
- **Sass / CSS**: `.github/instructions/languages/scss.instructions.md` - Sass and CSS patterns and best practices

## Workflows overview

For detailed instructions on specific workflows see:
- **Adding changesets**: `.github/instructions/workflows/changeset.instructions.md` - Details on adding a changeset entry for user-facing changes to packages
