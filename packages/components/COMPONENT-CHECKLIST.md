# New Component Checklist

This is the quest issue/engineering checklist for the COMPONENT_NAME Component. All new components will have their own feature branch, and any PR that adds an item from the checklist should target the feature branch, and not `main`.

## Pre-Flight Checklist
Update this list and these links as appropriate.

- [Component Requirement Document (CRD)](url_here): This file should exist before any code is written.
- [FIGMA Design](url_here): Since we are trying to align the component API naming with the same terms used in the Figma file, it is likely useful to have a fairly stable Figma design before we create a component; it should definitely be finalized before the component ships, however.
- [Design System Website](https://design-system-website.vercel.app/?path=/story/example-introduction--page) (storybook of storybooks): use for reference, to consider existing features that we might need to replicate in the component.

## Engineering Checklist
The engineering checklist has six parts: creating the feature branch, component template, component backing class, component style, tests, and documentation.

### Component Creation

- [ ] create new branch from main for the component.
- [ ] create new component
  - `ember generate component hds/COMPONENT_NAME/index --gc` (the component won't need to be invoked with index, it's just to put all the files in the correct place)
  - if it's a variation on a component, then `hds/COMPONENT_NAME/VARIATION` instead of `index`
- [ ] **component template**
  - use semantic HTML
  - the component should have a css class that is the same as the component (e.g. `hds/button` should have a class name of `hds-button` on the component, and additional CSS classes should start with this same class name.
  - add `...attributes` unless doing so would be detrimental (e.g., a parent element and child element in the same component that both have ...attributes)
- [ ] **component class**
  - use getters (vs template conditionals or constructors, if possible)
  - write API comments in the JS doc way (copy from an existing DS component)
  - use the same naming as the Figma file for the components API unless it conflicts with a pre-existing HTML attribute. If that is the case, document the difference in the comment.
  - ensure that all existing functionality (from a Structure component) is accounted for in some way. If we are not providing existing functionality at all, it should be documented (along with the reason why). If we are providing temporary functionality, explain that it's temporary and why.
  - check the [design system website](https://design-system-website.vercel.app/?path=/story/example-introduction--page) to see what kind of component functionality is being used across all products
  - booleans should start with a verb (is/has/etc)
  - assertion text should match the content style of the other components.
  - goal is a terse invocation
- [ ] **component style**
  - create `component/COMPONENT_NAME.scss` in `app/styles`
  - add `@use` to `app/styles/@hashicorp/design-system-components.scss` (see existing code for precise syntax)
  - use design tokens wherever possible, comment where they are not
  - sizes should be in relative units
  - line heights should be unitless
- [ ] **testing**
  - [ ] test basic functionality
  - [ ] test defaults
  - [ ] try not to repeat tests (i.e., don't have to test all sizes, all colors, etc.)
  - [ ] test all accessibility attributes
- [ ] **documentation**
  - create component page `ember generate route components/COMPONENT_NAME --dummy`
  - add link to `templates/index.hbs` page
  - [ ] API docs
  - [ ] Usage
  - [ ] Accessibility
  - [ ] Showcase

### Component Review

Pre-review request checks:

- [ ] run `yarn lint` and fix any issues (`yarn lint:hbs --fix` will resolve most issues)
- [ ] make sure all tests pass (`ember s` then visit /tests; or `ember t -s`)
- [ ] check for basic a11y on docs page:
  - keyboard navigation
  - logical DOM order
  - zoom up to 400%
  - color contrast
  - (the axe-core browser plugin can run some basic tests and give immediate feedback)
- [ ] check page on browsers
  - Chrome
  - Firefox
  - Safari
  - Edge (once available)

When ready for review:
- [ ] add situationally appropriate reviewers
- [ ] added instructions for reviewers in your PR, letting them know what kind of review you need
