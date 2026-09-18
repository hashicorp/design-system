---
applyTo: "showcase/app/components/page-components/**, showcase/app/templates/page-components/**, styles/showcase-pages/**, templates/page-components/**, router.ts"
description: "Instructions for how components should be displayed in the showcase application"
---

## Overview
All components from the `packages/components` library must have a corresponding showcase page in the `showcase` app that demonstrates all arguments, blocks, and interactive states of the component.

## File structure

For each HDS component the following files are required:

- `components/page-components/<component-name>/index.gts` - Index file for the component's showcase page; combines all sub-section components into one template.
- `components/page-components/<component-name>/code-fragments/<code-fragment-name>.gts` - (Optional) Reusable examples of the main HDS component. Used multiple times across examples in sub-sections.
- `components/page-components/<component-name>/sub-sections/<sub-section-name>.gts` - Sub-sections of the main component's showcase page. Each major section should be its own sub-section component — generally each `ShwTextH2` heading and the content below it.
- `styles/showcase-pages/<component-name>.scss` - (Optional) Custom styling for a showcase page. Used to force states, add background colors to sections, style placeholder content
- `templates/page-components/<component-name>.gts` - Page template that renders the component's index component.
- `router.ts` - Router for the showcase application. A component page needs to be added to this router in the format `this.route('component-name');`

## Required showcase page content

For a given component, the following must be shown:
- All available arguments, with every possible value demonstrated
  - Example: An `@isActive` boolean argument should show both `true` and `false` states
  - Example: A `@color` argument should show all available color values
- Combinations of possible content and arguments.
  - Example: Show every `@color` option both with and without an optional icon
- All sub-components and their arguments/blocks
- All interactive states (hover, focus, active, disabled) for interactive components

## Content structure

To determine what content should be shown for a component:
- Read all arguments listed in the `Args` of the component signature
- Read all component files in the same directory as the main `index.gts` file
- Note any interactive elements in any component templates

Content sub-sections should be generally structured in the following order:
- Content
- Variants
- Additional content
- Base elements / sub-components

### Arguments

#### Variants with multiple values

Example file: `showcase/app/components/page-components/button/sub-sections/variants.gts`

A `variants` sub-section should show arguments with multiple options, such as color, size, type, etc.

Commonly all available options for these kinds of arguments are exported from the components as constants. These can be looped over in the template to display available options.

Example: The `HdsButton` exports arrays `COLORS` and `SIZES` which list all possible values for the `@color` and `@size` arguments.

#### Variants with differing forms of content

Example file: `showcase/app/components/page-components/button/sub-sections/content.gts`

A `content` sub-section should show boolean arguments, and varying types of content a component could contain.

The `ShwFlex` or `ShwGrid` should be for examples of each type of content with labels defining each use case.

### Sub-components

Any available sub-components should be shown with all of their available arguments and blocks to the same extent as the main component.

A `base elements` sub-section should be used to show all sub-components.

### Interactive states

For interactive elements all interactive states such as `hover`, `active`, `focus`, `disabled` need to be shown.

Each HDS component contains `mock-state-value` data attributes, which when set to a value like `hover` mocks the hover state.

All interactive states should be looped through and each displayed in a `ShwGrid`

```gts
const STATES = ['default', 'hover', 'active', 'focus', 'disabled'];

<template>
  <ShwGrid @columns={{5}} as |SG|>
    {{#each STATES as |state|}}
      <SG.Item @label="{{capitalize state}}">
        {{#if (eq state "disabled")}}
          <HdsComponentName disabled />
        {{else}}
          <HdsComponentName mock-state-value={{state}} />
        {{/if}}
      </SG.Item>
    {{/each}}
  </ShwGrid>
</template>
```

### Additional content

#### Demos

Add a `demos` sub-section when static argument grids can't cover the behavior. Trigger conditions:

- **Component functionality** - when the component performs a specific action that can not be tested from a default example, add a mock js demo. (e.g stepper state progression, tab changes via js)
- **Connected elements** - when a component has arguments related to targets of other HTML elements outside the component add examples of the interaction between these two components with a variety of targets, both HDS components and native elements.
- **Overlay open/close** (Modal, Flyout, Dropdown) — show opening from a `HdsButton` trigger and from a `HdsDropdown` item trigger.
- **State progression** — components with phases (e.g. a stepper) need a working demo that advances through each phase.
- **Interacting arguments** — when arguments must be combined to observe their effect (e.g. `@isDismissDisabled` toggled externally), add a working demo.
- **DOM-dependent behavior** — e.g. `@preserveContentInDom` requires the dropdown to be openable to confirm the DOM state.
- **Arguments that reference external DOM elements** — when an argument accepts a CSS selector or DOM node (e.g. `@target`), render the target element as a sibling so both are visible together. Cover each reference form (string selector, Node) and a representative range of target element types (`<input>`, `<textarea>`, `<select>`, HTML blocks).

#### Context / composition

Add a `context` sub-section (or `containers`, `display`) when:

- The component is **designed to live inside specific containers** (e.g. a flush accordion inside a card or flyout)
- The component **inherits CSS from its parent** (typography, color, `text-align`, `white-space`) — show it inside parents with those properties applied
- The component is **inline and appears alongside text** — show it in a realistic paragraph

#### Generated element

When a component renders different HTML elements depending on arguments (e.g. `<button>` by default, `<a>` with `@href`, `<LinkTo>` with `@route`), add a `generated-element` sub-section with a labeled example for each possible element.

#### Layout and display behavior

When layout or sizing depends on the parent CSS context, add a `display`, `layout`, or `containers` sub-section showing the component inside parents with varying CSS properties (e.g. `inline-block`, `inline-flex`, `flex-grow: 0`, `max-width: fit-content`, `overflow: auto`).

#### Positioning and floating behavior

When a component has `@listPosition`, `@placement`, or similar, add a `positions` sub-section showing every value in a labeled grid with enough surrounding space.

When the component has collision detection, add a dedicated section using `ShwAutoscrollable` so users can scroll and observe position adjustments.

#### Responsiveness

When a component adapts at specific breakpoints, add a `responsiveness` sub-section using `ShwFrame` to render the component at multiple simulated viewport widths.

### Edge cases

Add edge case examples within the most relevant existing sub-section rather than in a standalone section.

Consider the following angles — not all apply to every component:

- **Text length** — very long text, multi-line wrapping, no spaces, minimal content
- **Nested components** — component containing other HDS components; two instances of the same component nested; component placed alongside its intended sibling components
- **Parent style interference** — constrained parents (`white-space: nowrap`, `max-width: fit-content`, `text-align`), unexpected CSS inheritance
- **Known broken configurations** — argument combinations that produce an imperfect but valid result; show them with an explanatory notice rather than omitting them
