# Philosophy & Principles
*Core beliefs that guide all decisions*

## Guiding principles:
- Rooted in reality We ground our work and our decisions in reality through data and observations.
- Guidance over control. We provide balance between configurability and composability while driving consistency.
- Quality by default. We recognize that we are providing a service and commit to a baseline of quality to provide value and leverage for our consumers. We iterate on features, not quality.

# General Info
- Language: Ember.js
- Framework: Glimmer
- Template Engine: Handlebars
- CSS Methodology: BEM (Block Element Modifier)
- CSS Preprocessor: Sass
- Package Manager: pnpm
- Code Style: Prettier
- Linting: ESLint, Stylelint

# Components
*Rules and templates for how components should be built and used.*

## Components packages
---
applyTo: "packages/components/src/components/hds/**"
---

### Component files

#### Arguments
- Define all arguments in the `Args` interface.
- Use camelCase for argument names.
- Use the `argument?: type` syntax.

#### Class names
- Use the `hds-<component-name>` prefix for all class names related to the component.
- Use BEM (Block Element Modifier) methodology for class names, where the block is the component name, elements are separated by double underscores (`__`), and modifiers are separated by double dashes (`--`).
  - Example: `hds-component-name__element--modifier`.
  - Example: `hds-component-name__title
  - Example: `hds-component-name--color-primary`.

## Styles

### File format
A component's styles should be defined in a file under `packages/components/src/styles/components/<component-name>.scss` or in a folder such as `packages/components/src/styles/components/<component-name>/index.scss` .

### General styles
- Do not include any unused style blocks
- Use the class names rules listed above for all class names

### HDS tokens
- Use CSS variables from the HDS design tokens for colors, typography, elevation, and border radius. These variables are defined in the `packages/tokens/dist/products/css/tokens.css`.
- Avoid using hardcoded values when HDS tokens could be used instead.
- If using an HDS token, the token name should be accurate and available in the tokens package.

## Exports
- Export all component classes and types in the `packages/components/src/components.ts` file.
- Register all components in the `packages/components/src/template-registry.ts` file.

Example of exporting a component:
```ts
export { default as HdsComponentName } from './components/hds/component-name/index.ts';
export * from './components/hds/component-name/types.ts';
```

Example of registering a component in the template registry:
```ts
import type HdsComponentNameComponent from './components/hds/component-name';

export default interface HdsComponentsRegistry {
  // Component Name
  'Hds::ComponentName': typeof HdsComponentNameComponent;
  'hds/component-name': typeof HdsComponentNameComponent;
}
```

## Showcase
---
applyTo: "showcase/app/**"
---

### File structure
A component should be defined in a folder under `showcase/app` with the following structure:
```
app
└── controllers
    └── page-components
        └── <component-name>.js (optional)
└── routes
    └── page-components
        └── <component-name>.js (optional)
└── templates
    └── page-components
        └── <component-name>.hbs
```

Compare a component's showcase against its corresponding component in the `packages/components/src/components/hds` folder.

### Showcase template

The showcase template should include:
- Instances of all available arguments, and all avilable values for the component.
  - Example: An `@isActive` boolean argument should be demonstrated with both `true` and `false` values.
  - Example: A `@color` argument should be demonstrated with all available color values.
- Instances of all available blocks for the component.

### Component routes
- Include all pages under the `showcase/app/templates/page-components` folder in the `showcase/app/router.ts` file.
- Define a route with the format `this.route('component-name');` for each component.

### Testing
---
applyTo: "showcase/tests/**"
---

### File structure
A component should be defined in a folder under `showcase/tests` with the following structure:
```
tests
└── acceptance/components/hbs
  └── <component-name>.js
└── integration/components/hds
  └── <component-name>
    └── index-text.js
```

Compare a component's test suite against its corresponding component in the `packages/components/src/components/hds/component-name` folder.

### Acceptance test
The `tests/acceptance/components/hds/<component-name>.js` file contains the acceptance test for the component.
The acceptance test should:
- Call `allyAudit` to check for accessibility issues.

#### Percy visual regeression test
---
applyTo: "showcase/tests/acceptance/percy-test.js"
---
The `tests/acceptance/percy-test.js` file defines what components are tested with Percy visual regression testing.
- Include all acceptance tests for components in the `showcase/tests/acceptance/components/hds` folder in the percy test.
- Use the `percySnapshot` function to take a snapshot of the component. Example: `percySnapshot('ComponentName');`

### Integration tests
---
applyTo: "showcase/tests/integration/compomnents/hds/**
---

Tests use the qunit library and format. A component's integration tests should be defined in a file under `showcase/tests/integration/components/hds/<component-name>/index-test.js`.

- Test the component renders with a CSS class that matches the component name
- Test each argument in the Args interface for all possible values
- Test each block in the Blocks interface
- Test each funtion or keyboard interaction

# Changelog entries
---
applyTo: ".changeset/**"
---
All changelog entries are creating using changesets. All upcoming changeset files are located in the `.changesets` fodler.

Each changeset entry should follow the following template:
```
<!-- START {components/path} -->
`{component-name}` - Fixed {...additional details}.
<!-- END -->
```

## Formatting
An entry should follow these formatting rules:
- A description of the change, including any relevant details.
- The component name associated with a change in the format:
```
`ComponentName` - Ddescription of the change.
```
- An HTML comment on a new line before the change with the format `<!-- START {components/path} -->`to indicate the start of the entry.
- An HTML comment on a new line after the change with the format `<!-- END -->`to indicate the end of the entry.

## General guidance
- Changelog entries should always start with a paragraph (not a list).
- Consider using a list instead of a long paragraph of text to communicate multiple changes for one element.
- If there are changes to multiple components in the same entry, each change should be described in a new paragraph (and a list of details, if needed).
- If you need to include a note (like a migration tip), add it to the bottom of the entry in a new paragraph. If you need to draw more attention to the note, consider using emphasized text.
- Entries should use complete sentences but be short, clear, and descriptive enough to be helpful.
- Use past tense.
- Entries should always end with a period

## Consistent terminology
- Use consistent terms for different types of changes:
  - Bugfix: “Fixed”
  - New component, token, variant: “Added”
  - Update: “Changed”, “Refactored”
  - Removed or deleted: “Removed”
  - Other possible cases: “Upgraded”, “Reduced”, “Prevented”

## Component references
- When referencing components, use the plain-text component name, e.g., Accordion.
- All components or token names, including those in the summary, should be enclosed in backticks (`).
