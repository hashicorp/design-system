# Helios Design System instructions

## Project context
The Helios Design System (HDS) provides the building blocks to design and implement consistent, accessible, and delightful product experiences across HashiCorp.

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
- Code Style: Prettier
- Linting: ESLint, Stylelint

## Components library

---
applyTo: "packages/components/src/components/hds/**"
description: "Instructions for how components should be built and used."
---

### Component structure

#### Required files
- `index.ts` - Primary entry point for the component, exporting the main component class and types.
- `index.hbs` - Handlebars template for the component.

#### Supplemental files
- `types.ts` - TypeScript types for the component's arguments and blocks.
- `{subcomponent-name}.ts` - Entry point for subcomponents, exporting the main subcomponent class and types.
- `{subcomponent-name}.hbs` - Handlebars template for the subcomponent

### Code formatting

#### Arguments
- Define all arguments in the `Args` interface.
- Use camelCase for argument names.
- Use the `argument?: type` syntax.

#### Class names
- Use the `hds-<component-name>` prefix for all class names in component template files, TS functions, and SCSS files.
- Use BEM methodology for class names, where the block is the component name, elements are separated by double underscores (`__`), and modifiers are separated by double dashes (`--`).
  - Good examples
    - `hds-component-name__element--modifier`
    - `hds-component-name__title`
    - `hds-component-name--color-primary`
  - Bad examples
   - `hds-component-name-element`
   - `hdsComponentName`
- Use a consistent naming structure throughout all of a component's files.

## CSS and SCSS styling
---
applyTo: "packages/components/src/styles/components/**"
description: "Instructions for how CSS styles should be written"
---

### File structure
- `{component-name}.scss` - Main SCSS file for the component, containing styles for the component.
- `{component-name}/index.scss` - Main SCSS file for the component, importing any subcomponent styles from files in the same folder.

### Additional info
- The CSS variables for the tokens package are compiled in the `packages/tokens/dist/products/css/tokens.css` file.

### Code formatting
- Do not include any unused style blocks
- Use the class names rules listed above for all class names

#### HDS tokens
- Use CSS variables from the HDS design tokens for colors, typography, elevation, and border radius. These variables are defined in the `packages/tokens/dist/products/css/tokens.css`.
- Do not use hardcoded values for colors, typography, elevation, and border radius when HDS tokens can be used instead.
- Use HDS token names that are accurate and available in the tokens package.

## Exports
---
applyTo: "packages/components/src/**"
description: "Instructions for how components should be exported and registered in the components library"
---

## Relevant files
- `packages/components/src/components.ts` - Main entry point for the components library, exporting all components and types.
- `packages/components/src/template-registry.ts` - Template registry file, registering all components for use in Ember applications.

### Requirements
- Export all component classes and types defined under `packages/components/src/components/hds/**` in the `packages/components/src/components.ts` file.
  - Example: The `HdsButton` component should be exported as follows:
    ```ts
    export { default as HdsButton } from './components/hds/button/index.ts';
    export * from './components/hds/button/types.ts';
    ```
- Import all components defined under `packages/components/src/components/hds/**` in the `packages/components/src/template-registry.ts` file, and add their registration to the `HdsComponentsRegistry` interface.
  - Example: The `HdsButton` component should be registered as follows:
    ```ts
    import type HdsButtonComponent from './components/hds/button';

    export default interface HdsComponentsRegistry {
      // Button
      'Hds::Button': typeof HdsButtonComponent;
      'hds/button': typeof HdsButtonComponent;
    }
    ```

## Showcase

---
applyTo: "showcase/app/**"
description: "Instructions for how components should be displayed in the showcase application"
---

### Required files
- `components/page-components/<component-name>/index.gts` - Main component for component's showcase page which contains references to sub-section components.
- `routes/page-components/<component-name>.ts` - Route for the component's showcase page.
- `templates/page-components/<component-name>.gts` - Page template which contains a component's index component.

Compare a component's showcase against its corresponding component in the `packages/components/src/components/hds` folder.

### Showcase components
The purpose of a Showcase page for an HDS component is to showcase possible combinations and edge cases of the component, for different formats and combinations of its content.

For a given component, the following items should be shown on its showcase page:
- Instances of all available arguments, and all available values for the component.
  - Example: An `@isActive` boolean argument should be demonstrated with both `true` and `false` values.
  - Example: A `@color` argument should be demonstrated with all available color values.
- Instances of all available blocks for the component.

For each HDS component, follow the following structure for showcase component files.
- `components/page-components/<component-name>/index.gts` - Index file for the component's showcase page.
- `components/page-components/<component-name>/code-fragments/<code-fragment-name>.gts` - Reusable examples of the main HDS component. Used multiple tiomes within the component's page.
- `components/page-components/<component-name>/sub-sections/<sub-section-name>.gts` - Sub-sections of the main component's showcase page. They should contains examples of the main HDS component's attributes, properties, interactive states, and other use cases. Each major section of the showcase should be broken into its own sub-section component. What constitutes a section can be flexible, but generally its each `ShwTextH2` plus the content below it.

#### Best practices
- Use arrow functions instead of `@action` for event handlers.
- For interactive components, document all interactive states for hover, focus, active, disabled, etc.

Examples:
```javascript
// Good: Arrow function
onClickToggleSingle = () => {

};

// Bad: Action decorator
@action
onClickToggleSingle {

};
```

### Routes
Each component should have a route file under the `routes/page-components/<component-name>.ts` path. This file should define the route for the component's showcase page.

Example file:
```ts
import Route from '@ember/routing/route';

import type { ModelFrom } from 'showcase/utils/ModelFromRoute';

export type PageComponentsAccordionModel =
  ModelFrom<PageComponentsAccordionRoute>;

export default class PageComponentsAccordionRoute extends Route {}
```

### Templates
Each component should have a template file under the `templates/page-components/<component-name>.gts` path. This template should contain the component's index component.

Example file:
```gts
import type { TemplateOnlyComponent } from '@ember/component/template-only';

import AccordionIndex from 'showcase/components/page-components/accordion';

const PageComponentsAccordion: TemplateOnlyComponent = <template>
  <AccordionIndex />
</template>;

export default PageComponentsAccordion;
```

### App router
- Include all pages under the `showcase/app/templates/page-components` folder in the `router.ts` file.
- Define a route with the format `this.route('component-name');` for each component.

## Testing

---
applyTo: "showcase/tests/**"
description: "Instructions for how components should be tested"
---

### File structure
- Define a folder for every component under `showcase/tests`.

#### Required files
- `acceptance/components/hds/<component-name>.js` - Acceptance test for the component.
- `integration/components/hds/<component-name>/index-test.js` - Integration test for the component.

Compare a component's test suite against its corresponding component in the `packages/components/src/components/hds/component-name` folder.

### Acceptance testing
- Call `allyAudit` to check for accessibility issues.

### Integration testing

#### Context
Tests use the qunit library and format. A component's integration tests should be defined in a file under `showcase/tests/integration/components/hds/<component-name>/index-test.js`.

### Formtting rules
- Test the component renders with a CSS class that matches the component name
- Test each argument is tested for all possible values
  - A list of arguments for a component can be found in the `packages/components/src/components/hds/<component-name>/index.ts` file.
  - Boolean arguments should be tested with both `true` and `false`
  - Enum arguments should be tested with all possible values
- Test each block in the Blocks interface
- Test each funtion or keyboard interaction

### Percy visual regeression testing
---
applyTo: "showcase/tests/acceptance/percy-test.js"
description: "Instructions for how components should be tested with Percy visual regression testing"
---
#### Context
The `tests/acceptance/percy-test.js` file defines what components are tested with Percy visual regression testing.

#### Requirements
- For all components with acceptance tests in the `showcase/tests/acceptance/components/hds` folder, add them to the list of Percy snapshots in the `tests/acceptance/percy-test.js` file.
- Use the `percySnapshot` function to take a snapshot of the component. Example: `percySnapshot('ComponentName');`

## Changelog entries

---
applyTo: ".changeset/**"
description: "Instructions for how to write changelog entries"
---

### Context
All changelog entries are creating using changesets. All upcoming changeset files are located in the `.changesets` folder.

### Template format
Each changeset entry should follow the following template:
```
<!-- START {components/path} -->
`{component-name}` - Fixed {...additional details}.
<!-- END -->
```

### Requirements
- Include a description of the change, including any relevant details.
- List the component name associated with a change in the format:
```
`ComponentName` - Ddescription of the change.
```
- Add an HTML comment on a new line before the change with the format `<!-- START components/path -->`to indicate the start of the entry.
- Add an HTML comment on a new line after the change with the format `<!-- END -->`to indicate the end of the entry.

### Formatting
- Always start an entry with a paragraph, not a list
- Use a list instead of a long paragraph of text to communicate multiple changes for one element
- If there are changes to multiple components in the same entry, described each change in a new paragraph (and a list of details, if needed)
- Add any additional notes to the bottom of the entry in a new paragraph
- Use complete sentences but be short, clear, and descriptive enough to be helpful
- Use past tense
- End entries with a period

#### Consistent terminology
- Use consistent terms for different types of changes:
  - Bugfix: “Fixed”
  - New component, token, variant: “Added”
  - Update: “Changed”, “Refactored”
  - Removed or deleted: “Removed”
  - Other possible cases: “Upgraded”, “Reduced”, “Prevented”

#### Component references
- When referencing components, use the plain-text component name, e.g., Accordion.
- Enclose all components or token names, including those in the summary, in backticks (`).