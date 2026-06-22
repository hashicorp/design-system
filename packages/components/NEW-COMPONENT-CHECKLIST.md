# New Component Checklist

This is the checklist the HDS team uses for any new component project. All new components will have their own feature branch, and any PR that adds an item from the checklist should target the feature branch, and not `main`.

## Pre-Flight Checklist

The following should be available as resources for the Project Kickoff.

- [Component Audit](https://www.figma.com/files/902667414815738345/project/212365804)
- [Project Plan](https://ibm.sharepoint.com/:w:/r/sites/DEPT-helios-design-system/Shared%20Documents/Templates/HDS%20Project%20Plan%20%5BTemplate%5D.dotx?d=waadcf6b743e5423c8ca1641420eec104&csf=1&web=1&e=HKDM5C): This file should be started before the kickoff and include an early estimate of scope and any open questions that need to be answered during the kickoff.

## Project Kickoff

A project kickoff will be scheduled before the project start date. The kickoff will be used to align on project scope, timelines, and milestones and as a space to discuss any open questions. In attendance should be Design Systems Team leadership, lead Designer and Engineer on the project, and Design/Engineer buddies (if applicable).

## Design Checklist

The design checklist has 4 primary parts:

1. component design
2. testing
3. documentation
4. final release

The design process is largely cyclical, so some steps may be repeated until final approval.

### Component Design

- [ ] [create a branch](https://help.figma.com/hc/en-us/articles/360063144053-Create-branches-and-merge-changes#Create_a_branch) in the [HDS Components v2.0 UI Kit](https://www.figma.com/design/iweq3r2Pi8xiJfD9e6lOhF/HDS-Components-v2.0?m=auto&t=bvxo8w9gLZN1UWPO-6)
- [ ] add a new page for the component, as needed
- [ ] copy & paste the [stickersheet template](https://www.figma.com/design/vqhh0wWZ8PwnRkvh1jk7jB/Utilities-UI-Kit?node-id=2149-1300&t=5arRjDafSGBNZ3yw-4) to the new page
  - [ ] set the position of this frame to 0, 0
  - [ ] update the status badge in the banner to "In progress"
  - [ ] change "{Component}" to the name of the component
- [ ] design and build the component, taking into account existing HDS [Foundations](https://www.figma.com/design/uX4OEaJQdWfzULADchjAeN/HDS-Foundations-v2.0?m=auto&t=bvxo8w9gLZN1UWPO-6) and [Patterns](https://www.figma.com/design/5Pv32j4QiOOD8lkFTD1dxC/HDS-Patterns-v2.0?m=auto&t=bvxo8w9gLZN1UWPO-6), as well as the findings from the audit and requirements from the Project Plan
  - artifacts should include:
    - component explorations
    - examples in context
    - built component
- [ ] review with situationally appropriate stakeholders and iterate
  - reviewers should include:
    - HDS designers and manager
    - engineering partner(s)
    - a11y SME
    - other external stakeholders as defined during the kickoff
  - reviews should include checks for:
    - alignment to Helios Foundations
    - ux solution
    - fulfillment of requirements from the audit and Project Plan
    - a11y conformance
    - alignment to code API
    - consistent naming conventions
    - token usage
- [ ] have HDS designers test the component and iterate, until approval is granted in the [Component Testing Criteria](https://www.figma.com/design/vqhh0wWZ8PwnRkvh1jk7jB/Utilities-UI-Kit?node-id=4-1355&t=5arRjDafSGBNZ3yw-4)
- [ ] add a variety of examples to the stickersheet
  - make sure the component instances can be easily selected and other layers are locked
- [ ] request a final branch review from HDS designers
- [ ] sync with your engineering partner
  - let them know it's been approved and answer any remaining questions

### Component Testing

- [ ] prepare for testing
  - [ ] lock the components
  - [ ] change the badge in the banner to "Experimental"
  - [ ] merge the branch
  - [ ] publish the component
    - Important: do not communicate this release broadly to consumers yet (this will be done later in the process)
- [ ] ask key stakeholders to test the component
  - depending on the complexity, we usually give them 3-4 days to complete the testing
- [ ] if iterations are needed, work through the process until approved (don't forget to branch!)

### Documentation

- [ ] while the component is being tested, write the documentation
  - artifacts should include:
    - design guidelines
    - specifications
    - relevant accessibility details

### Release in Figma

Once key stakeholders have tested the component and iterations are approved, prepare for a final release of the component.

- [ ] add a changelog entry to [CHANGELOG-FIGMA-COMPONENTS.md](https://github.com/hashicorp/design-system/blob/main/packages/components/CHANGELOG-FIGMA-COMPONENTS.md)
- [ ] if changes were made, publish the component
- [ ] once the code has been released, communicate the release in the slack channel [#team-design-systems](https://ibm.enterprise.slack.com/archives/C09L2MVUL5S)

## Engineering Checklist

The engineering checklist has six parts: creating the feature branch, component template, component backing class, component style, tests, and documentation.

### Dependency

- Since we are trying to align the component API naming with the same terms used in the Figma file, it is likely useful to have a fairly stable Figma design before we create a component; it should definitely be finalized before the component ships, however.

### Component Creation

- [ ] create new branch from main for the component (`git checkout -b USER/COMPONENT-NAME`)
- [ ] create new component using a blueprint
  - if it's a component, you have to run two commands, one for the component code (and its tests) and one for the documentation pages:
    - `cd showcase` and then `ember generate hds-component COMPONENT-NAME`
    - `cd website` and then `ember generate hds-component-docs COMPONENT-NAME`
  - if it's a child component, then you have to run only one command:
    - `cd showcase` and then `ember generate hds-component COMPONENT_NAME/CHILD_NAME`
  - (Note: Many of the below mentioned files will be automatically generated.)
- [ ] **component template**
  - use semantic HTML
  - the component should have a css class that is the same as the component (e.g. `hds/button` should have a class name of `hds-button` on the component, and additional CSS classes should start with this same class name.
  - add `...attributes` unless doing so would be detrimental (e.g., a parent element and child element in the same component that both have ...attributes)
- [ ] **component class**
  - use getters (vs template conditionals or constructors, if possible)
  - we have chosen to define the value of the `class` attribute (containing the different CSS class names) for the "root" of the element's code in the backing class, UNLESS that component only has one CSS class name.
  - write API comments in the [JS doc](https://jsdoc.app/) format (look at existing components for examples)
  - use the same naming as the Figma file for the components API, unless it conflicts with a pre-existing HTML attribute. If that is the case, document the difference in a comment.
  - booleans should start with a verb (is/has/etc)
  - private properites and methods should be declared as `private` and start with an `_`, e.g., `private _elementId`
  - assertions should match the content style of the other components, e.g., `'@text for "Hds::Button" must have a valid value'`,
  - program with intent; think about the invocation for the developer who will use the component. The goal is a terse invocation, but we also want to consider the big picture. Try to get feedback when you can.
- [ ] **component style**
  - create `component/COMPONENT-NAME.scss` in `app/styles`
  - add `@use` to `app/styles/@hashicorp/design-system-components.scss` (see existing code for precise syntax)
  - use design tokens wherever possible, comment where they are not
  - sizes should be in relative units
  - line heights should be unitless
- [ ] **testing**
  - [ ] test basic functionality
  - [ ] test defaults
  - [ ] try not to repeat tests (i.e., don't have to test all sizes, all colors, etc.)
  - [ ] test all accessibility attributes
  - [ ] test assertions
  - [ ] add an entry to the file `/showcase/tests/acceptance/percy-test.js` and make sure the visual regression tests are passing
  - [ ] run the accessibility automation tests (`pnpm test:a11y --filter="COMPONENT-NAME"`)
- [ ] **documentation**
  - create component page `ember generate route components/COMPONENT_NAME --dummy`
  - add link to `templates/index.hbs` page
  - [ ] Definition of component (from CRD) (this should be a paragraph under the component name, and before the first section)
  - [ ] Component API
  - [ ] Usage
  - [ ] Design Guidelines
  - [ ] Accessibility
    - Conformance Rating [(internal document)](https://docs.google.com/document/d/1OjTKpQLB_wuZSVJNLbbguTzMDMYCHKhNdKQz7-Kfqic/edit#bookmark=id.v7r42vfu4pdd)
    - Known Issues (if any)
    - Related WCAG (pull from CRD or ask Melanie)
  - [ ] Showcase

### Component Review

Pre-review request checks:

- [ ] run `pnpm lint` and fix any issues (`pnpm lint:hbs --fix` will resolve most issues)
- [ ] make sure all tests pass (`ember s` then visit /tests; or `ember t -s`)
- [ ] make sure the visual regression test pass
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
- [ ] add instructions for reviewers in your PR, letting them know what kind of review you need
- [ ] add a changelog update via [Changesets](https://github.com/changesets/changesets) if needed using the command `pnpm changeset` (in the project root) using the [predefined format](https://hashicorp.atlassian.net/wiki/spaces/HDS/pages/3243114706/Changelog+authoring+best+practices#Templates))
