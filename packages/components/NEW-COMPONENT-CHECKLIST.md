# New Component Checklist

This is the quest issue/engineering checklist for the COMPONENT_NAME Component. All new components will have their own feature branch, and any PR that adds an item from the checklist should target the feature branch, and not `main`.

## Pre-Flight Checklist
Update this list and these links as appropriate.

- [Component Audit](https://www.figma.com/file/h3LtloARmbYVwh7z6XWHVb/Component-Audits-FY23?node-id=0%3A1): This audit should be completed by ambassadors before any work gets started.
- [Component Requirement Document (CRD)](url_here): This file should exist before any design explorations or code is written.
- [Design System Website](https://design-system-website.vercel.app/?path=/story/example-introduction--page) (storybook of storybooks): use for reference, to consider existing features that we might need to replicate in the component.


## Design Checklist 
The design checklist has [] parts: .

### Component Creation
- [ ] [create a branch](https://help.figma.com/hc/en-us/articles/360063144053-Create-branches-and-merge-changes#Create_a_branch) in the [product components ui kit](https://www.figma.com/file/noyY6dUMDYjmySpHcMjhkN/HDS-Product---Components)
- [ ] add a new page for the component, as needed
- [ ] work through design explorations 
  - provide 2-3 visual directions based on existing [foundations](https://www.figma.com/file/oQsMzMMnynfPWpMEt91OpH/HDS-Product---Foundations?node-id=2916%3A4) and patterns, as well as the findings from the audit and requirements from the CRD
- [ ] review with appropriate stakeholders
  - typically HDS designers, engineering partner, ambassadors
  - [ ] iterations, as necessary
- [ ] a11y sign off
  - [ ] iterations, as necessary
- [ ] design sign off with leadership
  - [ ] iterations, as necessary
- [ ] build out the approved design as a component
- [ ] documentation
  - [ ] stickersheet
    - make sure the component instances can be easily selected and other layers are locked
  - [ ] design guidelines
    - lock this frame
  - [ ] figma tips, as necessary
    - lock this frame
  - [ ] migration details, as necessary
    - lock this frame
- [ ] merge the branch
  - before merging, 
- [ ] publish the ui kit
  - do not communicate this release to consumers
- [ ] test the component with ambassadors
  - if iterations are needed, create a new branch, iterate, review and merge, as normal

When ready to add docs to the scrappy site:
- [ ] export a screenshot of the design guidelines
- [ ] create a new issue in [github](https://github.com/hashicorp/design-system/issues) with the screenshot
- [ ] let your engineering partner know it's ready to be added (or add it yourself)


## Engineering Checklist
The engineering checklist has six parts: creating the feature branch, component template, component backing class, component style, tests, and documentation.

### Dependency
- [Figma Design](url_here): Since we are trying to align the component API naming with the same terms used in the Figma file, it is likely useful to have a fairly stable Figma design before we create a component; it should definitely be finalized before the component ships, however.

### Component Creation

- [ ] create new branch from main for the component (`git checkout -b USER/COMPONENT-NAME`)
- [ ] create new component
  - `ember generate component hds/COMPONENT-NAME/index --gc` (the component won't need to be invoked with index, it's just to put all the files in the correct place)
  - tip: if you forget to generate the backing class (via `--gc`), you can add it with `ember generate component-class hds/COMPONENT-NAME/index`.
  - if it's a child component, then `hds/COMPONENT_NAME/CHILD_NAME` instead of `index`
  - tip: if you need to destroy a component and start over again, `ember destroy component hds/COMPONENT-NAME/index` will remove the component and the related files as appropriate.
- [ ] **component template**
  - use semantic HTML
  - the component should have a css class that is the same as the component (e.g. `hds/button` should have a class name of `hds-button` on the component, and additional CSS classes should start with this same class name.
  - add `...attributes` unless doing so would be detrimental (e.g., a parent element and child element in the same component that both have ...attributes)
- [ ] **component class**
  - use getters (vs template conditionals or constructors, if possible)
  - we have chosen to define the value of the `class` attribute (containing the different CSS class names) for the "root" of the element's code in the backing class, UNLESS that component only has one CSS class name.
  - write API comments in the [JS doc](https://jsdoc.app/) format (look at existing components for examples)
  - use the same naming as the Figma file for the components API, unless it conflicts with a pre-existing HTML attribute. If that is the case, document the difference in a comment.
  - if there is an existing Structure component that is similar to the HDS component being created, ensure that all existing functionality is accounted for in some way. If we are not providing existing functionality at all, it should be documented (along with the reason why). If we are providing temporary functionality, explain that it's temporary and why.
  - booleans should start with a verb (is/has/etc)
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
