---
applyTo: "showcase/app/components/page-components/**, showcase/app/styles/showcase-pages/**"
description: "Instructions for the content structure and best practices for showcase pages of components"
---

## Required showcase page content

For a given component, the following must be shown:
- All relevant arguments, with every supported value demonstrated where practical
  - Example: An `@isActive` boolean argument should show both `true` and `false` states
  - Example: A `@color` argument should show all available color values
  - IMPORTANT: Each argument should have its own demonstration section
- Meaningful combinations of different argument values, especially when the combination changes behavior
  - Example: Demonstrate all combinations of `@type` and `@color`
  - DO NOT include irrelevant combinations that do not affect the component's behavior such as `@color` and `@size`
- Meaningful combinations of content and arguments
  - Example: Show representative `@color` options both with and without an optional icon
- All sub-components and their arguments/blocks
- All interactive states (hover, focus, active, disabled) for interactive components

## Required showcase page layout and component usage

Follow the layout of other showcase pages as much as possible, including the following rules:
- Use the `ShwTextH{2,3,4}` components for headings
- Include a `ShwDivider` component at the end of each sub-section and in-between larger sections
- Use `ShwGrid` and `ShwFlex` components to layout content within sub-sections
  - Use the `@label` argument on `ShwGrid` and `ShwFlex` items to provide context for each example
  - Set `@direction` to `row` for smaller components
- Use `capitalize` from `@ember/string` to capitalize all type values in labels or text
- Use `ShwPlaceholder` for generic yielded content blocks

## Content structure

To determine what content should be shown for a component:
- Read all arguments listed in the `Args` of the component signature
- Read all sub-component files in the same directory as the main `index.gts` file
- Note any interactive elements in any component templates

Content sub-sections should be structured in the following order:
- Content
  - The most basic examples and (optionally) content variations
- Variants
  - The different variations of the component based on its arguments
- Additional content
  - Any additional content that is relevant to the component: Demos, usage examples, or edge cases
- States
  - Interactive states for the main component
- Base elements / sub-components
  - Examples of all sub-components in isolation
  - Interactive states for any sub-components

### Content

Example file: `showcase/app/components/page-components/button/sub-sections/content.gts`

A `content` sub-section should show boolean arguments, and varying types of content a component could contain. This could be text length, generic content blocks, or other types of content that the component can hold. It should be a general catch-all for the types of basic content that could be placed inside a component.

### Variants

Example file: `showcase/app/components/page-components/button/sub-sections/variants.gts`

A `variants` sub-section should show arguments with multiple options, such as color, size, type, etc. It should also show examples of combinations of multiple arguments.

Commonly all available options for these kinds of arguments are exported from the components as constants. These can be looped over in the template to display available options.

Example: The `HdsButton` exports arrays `COLORS` and `SIZES` which list all possible values for the `@color` and `@size` arguments.

### States

A `states` sub-section should show all interactive states for the main component, such as `hover`, `active`, and `focus`.

#### Interactive states

For interactive elements, show all applicable interactive states such as `hover`, `active`, and `focus`.

The showcase application recognizes the custom `mock-state-value` attribute and adds the corresponding `mock-*` class to the element, which mocks states such as `hover`.

All interactive states should be looped through and each displayed in a `ShwGrid`

```gts
const STATES = ['default', 'hover', 'active', 'focus'];

<template>
  <ShwGrid @columns={{5}} as |SG|>
    {{#each STATES as |state|}}
      <SG.Item @label="{{capitalize state}}">
        <HdsComponentName mock-state-value={{state}} />
      </SG.Item>
    {{/each}}
  </ShwGrid>
</template>
```

#### Disabled state

When applicable, show the `disabled` state separately. Include both the default and hover presentation when the component supports meaningful disabled hover styling.

```gts
const STATES = ['default', 'hover'];

<template>
  <ShwGrid @columns={{5}} as |SG|>
    {{#each STATES as |state|}}
      <SG.Item @label="Disabled / {{capitalize state}}">
        <HdsComponentName disabled mock-state-value={{state}} />
      </SG.Item>
    {{/each}}
  </ShwGrid>
</template>
```

### Base elements / Sub-components

Any available sub-components should be shown with all of their available arguments and blocks to the same extent as the main component.

A `base elements` sub-section should be used to show all sub-components.

Other component states such as `read-only` and `invalid` should also be shown separately when supported, using the same principle.

### Additional content

#### Demos

Add a `demos` sub-section when static argument grids can't cover the behavior. Trigger conditions:

- **Component functionality** - when the component performs a specific action that cannot be tested from a default example, add a mock JS demo (e.g. stepper state progression or tab changes via JS)
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

### Code fragments

Code fragments under the path `showcase/app/components/page-components/<component-name>/code-fragments/<code-fragment-name>.gts` are reusable code snippets or interactive examples used in sub-section examples for a given component.

After completing all sub-sections, review any provided examples to see if they could be simplified and extracted into reusable code fragments.

Example: In the `HdsButton` a loading state button is used across multiple sub-sections. It has been extracted into a code fragment at `components/page-components/hds-button/code-fragments/loading-state.gts`.