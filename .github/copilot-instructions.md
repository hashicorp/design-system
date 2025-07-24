# General Instructions
- List all comments even if they are not high-confidence.

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
A component should be defined in a folder under `packages/components/src/components/hds` with the following structure:
```
hds
└── <component-name>
    ├── index.ts
    ├── index.hbs
    ├── types.ts (optional)
    └── subcomponent.ts (optional)
    └── subcomponent.hbs (optional)
```

### Component file
The `index.ts` file should match the following template:
  ```ts
  import Component from '@glimmer/component';
  interface HdsComponentNameSignature {
    Args: {
      // argument signatures
      argumentName?: string;

    };
    Blocks: {
      // blocks signatures
      default: [];
    };
    Element: HTMLElement;
  }
  export default class HdsComponentName extends Component<HdsComponentNameSignature> {
    // backing class code
    get classNames() {
      const classes = ['hds-component-name'];

      return classes.join(' ');
    }
  }
  ```

For a template only component the file shoild match the following pattern:
```ts
import TemplateOnlyComponent from '@ember/component/template-only';
interface HdsComponentNameSignature {
  // signature
}
const HdsComponentName = TemplateOnlyComponent<HdsComponentNameSignature>();
export default HdsBadge;
```

#### Arguments
- Define all arguments in the `Args` interface.
- Use camelCase for argument names.
- Use the `argument?: type` syntax.

### Template file

The `index.hbs` file should contain the template for the component, using the `hds-<component-name>` class as the root element. The template should be written in Handlebars syntax and can include any necessary HTML and Handlebars expressions.

### Class names
Check that all class names in the component's template and styles follow these rules:
- Use the `hds-<component-name>` prefix for all class names related to the component.
- Use BEM (Block Element Modifier) methodology for class names, where the block is the component name, elements are separated by double underscores (`__`), and modifiers are separated by double dashes (`--`).
  - Example: `hds-component-name__element--modifier`.
  - Example: `hds-component-name__title
  - Example: `hds-component-name--color-primary`.

## Styles
---
applyTo: "packages/components/src/styles/components/**"
---

### File format
A component's styles should be defined in a file under `packages/components/src/styles/components/<component-name>.scss` or in a folder such as `packages/components/src/styles/components/<component-name>/index.scss` .

### General styles
- Do not include any unused style blocks

### HDS tokens
- Use CSS variables from the HDS design tokens for colors, typography, elevation, and border radius. These variables are defined in the `packages/tokens/dist/products/css/tokens.css`.
- Avoid using hardcoded values when HDS tokens could be used instead.
- If using an HDS token, the token name should be accurate and available in the tokens package.

## Exports
---
applyTo: "packages/components/src/components.ts, packages/components/src/template-registry.ts"
---
Check that for every component that is created in the `packages/components/src/components/hds` folder, it should be exported in the `packages/components/src/components.ts` file and registered in the `packages/components/src/template-registry.ts` file.

In the `packages/components/src/components.ts` file, every component and all of its subcomponents and types file should be exported as follows:
```ts
export { default as HdsComponentName } from './components/hds/component-name/index.ts';
export * from './components/hds/component-name/types.ts';
```
Check that a component is exported in the `packages/components/src/components.ts` file.

In the `packages/components/src/template-registry.ts` file, every component type should be registered as follows:
```ts
import type HdsComponentNameComponent from './components/hds/component-name';

export default interface HdsComponentsRegistry {
  // Component Name
  'Hds::ComponentName': typeof HdsComponentNameComponent;
  'hds/component-name': typeof HdsComponentNameComponent;
}
```
Check that a component is registered corerctly in the `packages/components/src/template-registry.ts` file.

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
The `templates/page-components/<component-name>.hbs` file should match the following template:
```hbs
{{page-title "ComponentName Component"}}

<Shw::Text::H1>ComponentName</Shw::Text::H1>

<section data-test-percy>
  <Hds::ComponentName />

</section>
```

The showcase template should include:
- Instances of all available arguments, and all avilable values for the component.
  - Example: An `@isActive` boolean argument should be demonstrated with both `true` and `false` values.
  - Example: A `@color` argument should be demonstrated with all available color values.
- Instances of all available blocks for the component.

### Component routes

In the `showcase/app/router.ts` file, the component route should be registered as follows:
```ts
  this.route('component-name');
```

In the `showcase/app/templates/index.hbs` file, a linkt to the component route should be added as follows:
```hbs
<li>
  <LinkTo @route="page-components.component-name">
    ComponentName
  </LinkTo>
</li>
```

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
---
applyTo: "showcase/tests/acceptance/compomnents/hds/**
---
The `tests/acceptance/components/hds/<component-name>.js` file should match the following template:
```js
module('Acceptance | components/component-name', function (hooks) {
  setupApplicationTest(hooks);

  test('Components/component-name page passes automated a11y checks', async function (assert) {
    await visit('/components/component-name');

    await a11yAudit();

    assert.ok(true, 'a11y automation audit passed');
  });
});
```

The acceptance test should:
- call `allyAudit` to check for accessibility issues.

#### Percy visual regeression test
---
applyTo: "showcase/tests/acceptance/percy-test.js"
---
The `tests/acceptance/percy-test.js` file should include a test for the component as follows:
```js
  await visit('/components/component-name');
  await percySnapshot('ComponentName');
```

### Integration tests
---
applyTo: "showcase/tests/integration/compomnents/hds/**
---

Tests use the qunit library and format. A component's integration tests should be defined in a file under `showcase/tests/integration/components/hds/<component-name>/index-test.js`.

Check the test suite includes the following tests:
- The component renders with a CSS class that matches the component name
- Each argument in the Args interface is tested for all possible values
- Each block in the Blocks interface is tested
- Each funtion in the component is tested

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
