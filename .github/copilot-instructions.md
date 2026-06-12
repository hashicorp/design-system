# Helios Design System instructions

## Project context
The Helios Design System (HDS) provides the building blocks to design and implement consistent, accessible, and delightful product experiences across HashiCorp.

### Workflows
- `changeset.instructions.md` instructions for creating changesets when making changes to packages
- `pr-review.instructions.md` instructions for reviewing pull requests, use this workflow when reviewing every PR

## Repository structure

### Key directories
- `/packages/components`: Reusable Ember component library
- `/packages/tokens`: Design token library for CSS variables
- `/showcase/app`: Playground application for testing components
- `/showcase/tests`: Test suite for components library
- `/website`: Documentation site for the design system


## Tool and framework specifications
- Programming languages: HTML, CSS, SCSS, JavaScript, TypeScript, Handlebars
- Front-end Framework: Ember.js, Glimmer
- Testing Framework: QUnit, Ember Testing
- Visual Regression Testing: Percy
- CSS Preprocessor: Sass
- Linting: ESLint, Stylelint

## Instruction architecture

This repository uses split instruction files under `.github/instructions/`:

- `languages/` contains language-specific guidance
- `directories/` contains package or app-specific context and implementation guidance
- `workflows/` contains end-to-end workflow instructions

### Directories model

Within each `directories/` sub-folder:

- `context.instructions.md` provides baseline context (scope, file structure, related guidance, and core principles)
- Additional `*.instructions.md` files provide focused guidance on specific tasks