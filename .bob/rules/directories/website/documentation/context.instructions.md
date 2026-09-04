---
applyTo: "website/docs"
description: "Guidelines on how to structure, write, and implement documentation for components, foundations, guidelines, and any other website materials."
---

# Website Documentation

## File structure and routing

The folder `website/docs` contains all the markdown files used to generate the documentation pages. The folder contains a set of folders and subfolders, used to organize the content in it, and a set of files (mainly markdown, but also JavaScript) that store the actual content.

**IMPORTANT** How the folders and files are organized is very important: it represents exactly the routing and URL at which this content will be accessible. For example, the document `website/docs/about/hds-principles.md` will be available at the URL `/about/hds-principles`, and the document `website/docs/components/form/checkbox/index.md` will be available at the URL `/components/form/checkbox`.

## Markdown content

All pages are documented using markdown files, and frontmatter for metadata information. Most pages are either a single markdown file or split into multiple sections with a root `index.md` file.

## Frontmatter

All pages have a frontmatter block that provides metadata on a given page. It is declared at the top of a page's `index.md` file. Read `frontmatter.instructions.md` for more information.

## Component documentation

All components from the `packages/components` package are documented under `docs/components` in a directory matching their component name.

### File structure

- `index.md` - Root level frontmatter metadata and template
- `accessibility/accessibility.md` - Accessibility conformance, best practices, and WCAG success criteria
  - Read instructions `accessibility.instructions.md`
- `code/` - Developer guidance
  - `code/code-snippets` - Code examples used in `code/how-to-use.md`
  - `code/component-api.md` - Public component API
  - `code/how-to-use.md` - Code guidance and live examples
  - Read instructions `code-examples.instructions.md`, `component-api.instructions.md`
- `content/content.md` - (Optional) General usage guidance
- `guidelines/guidelines.md` - Design guidelines on when to use, available variants, general best practices
  - Read instructions `design-guidelines.instructions.md`
- `guidelines/overview.md` - (Optional) Brief summary of design guidelines
- `specifications/` - Structural details on component parts and states
  - `specifications/anatomy.md` - Table of component parts
  - `specifications/states.md` - Visuals of interactive states
- `version-history/version-history.md` - Version history. DO NOT EDIT (auto-generated)