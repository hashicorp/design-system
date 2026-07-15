---
applyTo: "packages/components/**"
description: "Context for the HDS components library"
---

## Overview
The `packages/components` library is the core reusable Ember component library for the Helios Design System. It provides accessible, consistent UI components for HashiCorp product teams, built with Ember.js and Glimmer using TypeScript and Handlebars.

## Key files
- `src/components/hds/` - Component source files (gts)
- `src/styles/components/` - Component SCSS files
- `src/components.ts` - Main entry point; exports all component classes and types
- `src/template-registry.ts` - Registers all components for use in consuming Ember applications
- `translations/hds` - i18n translation strings for components

## Common build commands
- `pnpm build` - Builds the components library for production use
- `pnpm start` - Starts the development server which re-runs the build on file changes
- `pnpm lint` - Runs ESLint and Stylelint to check code quality and style
- `pnpm lint:fix` - Runs ESLint and Stylelint with auto-fix enabled to fix any fixable issues
- `pnpm format` - Runs Prettier to format code according to the project's code style rules

## Requirements
- All components must be implemented using single-file components with a `.gts` extension
- All changes to components must be accompanied by appropriate changesets to ensure they are included in the next release
- All component arguments, events, and contextual components must have associated tests in `showcase/tests`
- All component arguments, events, and contextual components must be documented in the `website/docs`
- All component UI text must be defined as translation strings in the `translations` directory and referenced in the component templates

## Related instructions

- `changeset.instructions.md`
  Instructions for creating changesets when making changes to packages.
- `components.instructions.md`
  Guidelines on component development including file structure, code formatting, styling.
- `exports.instructions.md`
  Instructions for how to export components in `src/components.ts` and register them in `src/template-registry.ts`.
- `translations.instructions.md`
  Instructions for how to define and reference translation strings for component UI text.