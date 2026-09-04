---
applyTo: "website/**"
description: "Context for the HDS website application"
---

## Overview
The `website` app is an Ember application used to document all HDS components from the `packages/components` library, icons from the `packages/flight-icons` library, as well as design guidance.

## Key files
- `app/` - Ember application
- `docs/` - All documentation files for pages on the website. Filesystem structure is used to define the routes and navigation for the application.
- `tests/acceptance/` - Acceptance tests including `a11yAudit` and Percy snapshots for components from the `packages/components` library
- `tests/integration/` - Integration tests for components, helpers, and modifiers from the `packages/components` library

## Common build commands
- `pnpm build` - Builds the website application
- `pnpm start` - Starts the local server
- `pnpm start:prember` - Starts local server with prember pre-rendering enabled
- `pnpm lint` - Runs ESLint and Stylelint to check code quality and style
- `pnpm lint:fix` - Runs ESLint and Stylelint with auto-fix enabled to fix any fixable issues
- `pnpm format` - Runs Prettier to format code according to the project's code style rules
- `pnpm test` - Runs the test suite

## Requirements
- Any new pages or components must be implemented using single-file components with a `.gts` extension
- Changes to the website app do not require a changeset entry

## Server-side rendering and fastboot
The website uses a combination of `ember-cli-fastboot` and `prember` to pre-render static versions of routes at build time.

Additionally, `prember-sitemap-generator` is used to generate a sitemap based on the same prember config used for pre-rendering static pages. Configuration for this lives in `website/ember-cli-build.js`.

## Documentation helper components

There are various ember `Doc` components created under `website/app/components/doc` which can be used in markdown files.

- `Doc::Badge`
  - Used to show a textual "badge" with different visual "states"
  - Used on `accessibility/accessibility.md` files
- `Doc::Banner`
  - Used to highlight a certain piece of content in a page
  - Banner types
    - `information` - Use for informational content and tips
    - `warning` - Use for important messages cautioning consumers about a topic or to communicate breaking changes
    - `critical` - Use for sunset notices and deprecation messaging
    - `insight` - Use for suggestions and insights
    - `callout` - Use for sharing information that's still useful but ultimately supplemental
- `Doc::ComponentApi`
  - Used to show a component api in `code/component-api.md` files
- `Doc::CopyButton`
  - Used to show small code snippets and optionally allow the user to copy them
- `Doc::DoDont`
  - Used to highlight a certain piece of content in a page as something to "Do" or "Don't".
  - Used on `guidelines/guidelines.md` files
- `Doc::WcagList`
  - Used to show the list of WCAG criteria of a component
  - Used on `accessibility/accessibility.md` files

## Media assets

Any media files such as images should be placed in the `website/public/assets` folder. They will be cloned at build time into the `dist/assets` folder.

## Related instructions

- `documentation/context.instructions.md` Guidelines on how to structure, write, and implement documentation for components, foundations, guidelines, and any other website materials.
  - `documentation/accessibility.instructions.md` Writing accessibility compliance information
  - `documentation/code-examples.instructions.md` Writing code guidance and adding code examples
  - `documentation/component-api.instructions.md` Documenting a component's public API
  - `documentation/design-guidelines.instructions.md` Writing design guidance
  - `documentation/frontmater.instructions.md` Frontmater formatting instructions
- `writing-guide/context.instructions.md` Rules and principles to follow when writing content for documentation
  - `writing-guide/markdown-guidelines.instructions.md` Rules for writing markdown files
  - `writing-guide/writing-style.instructions.md` Rules for writing style
- `infrastructure.instructions.md` Overview of the website Ember application and its structure
