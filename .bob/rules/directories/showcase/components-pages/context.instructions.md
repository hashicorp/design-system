---
applyTo: "showcase/app/components/page-components/**, showcase/app/templates/page-components/**, showcase/app/styles/showcase-pages/**, showcase/app/templates/index.gts, showcase/tests/acceptance/components/hds/**, showcase/tests/acceptance/percy-test.js, showcase/app/router.ts"
description: "Instructions for how components should be displayed in the showcase application"
---

## Overview

All components from the `packages/components` library must have a corresponding showcase page in the `showcase` app with representative examples of their supported visual differences, composition, and user-observable behavior. Follow `content.instructions.md` to select meaningful content without requiring a separate example for every argument or combination. Comprehensive automated test requirements remain defined by the test instructions.

## File structure

For each HDS component the following files are required:

- `showcase/app/components/page-components/<component-name>/index.gts` - Index file for the component's showcase page; combines all sub-section components into one template.
- `showcase/app/components/page-components/<component-name>/code-fragments/<code-fragment-name>.gts` - (Optional) Reusable examples or focused interactive demos that benefit from encapsulated state. Used by sub-sections; reuse is not required for every fragment.
- `showcase/app/components/page-components/<component-name>/sub-sections/<sub-section-name>.gts` - Sub-sections of the main component's showcase page. Each major section should be its own sub-section component, generally each `ShwTextH2` heading and the content below it.
- `showcase/app/styles/showcase-pages/<component-name>.scss` - (Optional) Custom styling for a showcase page. Used to force states, add background colors to sections, and style placeholder content.
- `showcase/app/templates/page-components/<component-name>.gts` - Page template that renders the component's index component.
- `showcase/app/templates/index.gts` - Main index template for the showcase application. A link to each component's showcase page must be included here.
- `showcase/tests/acceptance/components/hds/<component-name>-test.js` - Acceptance test for the component's showcase page.
- `showcase/tests/acceptance/percy-test.js` - Percy visual regression test for the showcase pages. A snapshot needs to be added for each component page.
- `showcase/app/router.ts` - Router for the showcase application. A component page needs to be added to this router in the format `this.route('component-name');`

## Required showcase page content

Read `content.instructions.md` for detailed guidance on what content should be included in each showcase page.
