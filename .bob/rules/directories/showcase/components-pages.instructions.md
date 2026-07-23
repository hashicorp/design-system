---
applyTo: "showcase/app/**"
description: "Instructions for how components should be displayed in the showcase application"
---

## Overview
All components from the `packages/components` library must have a corresponding showcase page in the `showcase` app that demonstrates all arguments, blocks, and interactive states of the component.

## File structure

For each HDS component the following files are defined:

- `components/page-components/<component-name>/index.gts` - Index file for the component's showcase page; references all sub-section components.
- `components/page-components/<component-name>/code-fragments/<code-fragment-name>.gts` - Reusable examples of the main HDS component. Used multiple times within the component's page.
- `components/page-components/<component-name>/sub-sections/<sub-section-name>.gts` - Sub-sections of the main component's showcase page. Each major section should be its own sub-section component — generally each `ShwTextH2` heading and the content below it.
- `templates/page-components/<component-name>.gts` - Page template that renders the component's index component.

## Showcase content

The purpose of a showcase page is to display every meaningful combination and edge case of a component.

For a given component, the following must be shown:
- All available arguments, with every possible value demonstrated
  - Example: An `@isActive` boolean argument should show both `true` and `false` states
  - Example: A `@color` argument should show all available color values
- All available blocks
- All sub-components and their arguments/blocks
- All interactive states (hover, focus, active, disabled) for interactive components

### Important notes
- Every argument and block of an HDS component must be represented on its showcase page
- All interactive states (hover, focus, active, disabled) must be visible for interactive components using the `mock-{state}` CSS class utility

## Templates

Each component must have a template file under `templates/page-components/<component-name>.gts`. Example:

```gts
import type { TemplateOnlyComponent } from '@ember/component/template-only';

import AccordionIndex from 'showcase/components/page-components/accordion';

const PageComponentsAccordion: TemplateOnlyComponent = <template>
  <AccordionIndex />
</template>;

export default PageComponentsAccordion;
```

## App router

- Add a route for each component in `app/router.ts` using the format `this.route('component-name');`
- Include all pages under `showcase/app/templates/page-components/`

## Best practices

- Use arrow functions instead of `@action` for event handlers
- Document all interactive states for hover, focus, active, and disabled
- For loops over component arguments, import the list of values from the component file to ensure all values are included and stay up to date with any changes to the component's arguments

```javascript
// Good: Arrow function
onClickToggleSingle = () => {

};

// Bad: Action decorator
@action
onClickToggleSingle() {

}
```
