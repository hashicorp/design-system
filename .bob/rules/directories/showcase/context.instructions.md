---
applyTo: "showcase/**"
description: "Context for the HDS showcase application"
---

## Overview
The `showcase` app is an Ember application used to develop, test, and visually validate all HDS components from the `packages/components` library. It serves as a live component playground, source for Percy visual regression snapshots, and houses the component acceptance and integration test suite.

## Key files
- `app/components/page-components/` - Showcase page components, one folder per HDS component
- `app/templates/page-components/` - Templates that render each showcase page component
- `app/styles/` - Global styles for the showcase app and component page specific styles
- `app/router.ts` - Defines routes for all component showcase pages
- `tests/acceptance/` - Acceptance tests including `a11yAudit` and Percy snapshots for components from the `packages/components` library
- `tests/integration/` - Integration tests for components, helpers, and modifiers from the `packages/components` library

## Common build commands
- `pnpm build` - Builds the showcase app
- `pnpm start` - Starts the development server for the showcase app, for testing and visual validation
- `pnpm lint` - Runs ESLint and Stylelint to check code quality and style
- `pnpm lint:fix` - Runs ESLint and Stylelint with auto-fix enabled to fix any fixable issues
- `pnpm format` - Runs Prettier to format code according to the project's code style rules

## Requirements
- All showcase pages must be implemented using single-file components with a `.gts` extension
- Changes to the showcase app do not require a changeset entry

## Related instructions

- `components-pages.instructions.md`
  Guidelines on how to build showcase pages, including file structure, code formatting, and best practices for demonstrating component features and states.
- `testing.instructions.md`
  Instructions for how to write and organize acceptance and integration tests
