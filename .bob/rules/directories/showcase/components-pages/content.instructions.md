---
applyTo: "showcase/app/components/page-components/**, showcase/app/styles/showcase-pages/**"
description: "Use when choosing content, examples, demos, and section structure for HDS component showcase pages"
---

## Purpose and coverage

Showcase pages are working examples for manual exploration and visual regression review. Demonstrate representative, supported visual and behavioral differences, not an exhaustive API reference or a duplicate of the integration test suite.

## Content selection

### Required content

- All arguments that affect the component's visual appearance or behavior
- All yielded blocks
- Visual states for all interactive elements
- All sub-components
  - Each sub-component should have the same content requirements as the root component, including arguments, blocks, and visual states.
  - Each sub-component should have its own section with a clear heading and relevant content.
- Combinations of arguments that produce distinct visual or behavioral outcomes

### Determining content to show

To determine which content should be shown for a component's showcase page, follow these guidelines:

- Inventory the complete component surface before choosing examples: inspect the public component exports, each related public sub-component's signature (`Args`, `Blocks`, yielded components/functions, and `Element`), and the main component's yielded API. Follow imported or inherited types and argument unions as needed. Do not stop at the root component signature.
- Read the component templates and relevant implementations to understand how arguments, blocks, and yielded APIs work in practice. For stateful arguments, check whether a static setting is enough to show the behavior or whether a working demo must change the value.
- Read the relevant implementation to confirm defaults, conditional rendering, and required argument combinations.
- Inspect related base and field components, including those in nested directories.
- Inspect relevant styles and selectors for supported hover, active, focus, expanded/collapsed, disabled, and other visual states, as well as layout dependencies and breakpoints. Identify the actual DOM element that receives each state.
- Compare the existing page and a similar showcase page before adding content. Reuse examples that already demonstrate the intended outcome instead of duplicating them.

### Coverage considerations

| API or behavior                                                   | Representative coverage                                                                                                                                                                                                         |
| ----------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| A small finite set of visual values, such as color, size, or type | Show the distinct options in a labeled group. Loop over exported value lists, such as Button's `COLORS` and `SIZES`, when available.                                                                                            |
| A boolean or optional argument                                    | Show the alternatives when they reveal different appearance or behavior. Place them by effect: content flags with content, disabled with states, collision detection with positioning.                                          |
| Defaults and omitted arguments                                    | Let the baseline demonstrate defaults. Add omitted versus explicit examples only when the distinction matters.                                                                                                                  |
| Arguments that interact                                           | Combine them when the interaction changes rendering, behavior, or exposes a meaningful regression risk. For example, Alert's type/color matrix is useful; no particular argument pair is universally required or irrelevant.    |
| Optional blocks or contextual components                          | Show meaningful inclusion, omission, and composition. Avoid every permutation or a repeated absence example already covered by the baseline.                                                                                    |
| Mutually exclusive or controlled/uncontrolled modes               | Respect required argument combinations and show workflows for modes with meaningfully different consumer interaction. Do not mix incompatible modes in one example.                                                             |
| Interactive states | Demonstrate applicable hover, focus, active, and other user-interaction states for the actual interactive element, including controls nested inside a composite component. Include keyboard and pointer interactions when relevant. Do not omit states just because a control is nested or already shown in another section. |
| Native attributes                                                 | Demonstrate relevant supported attributes, such as `disabled`, `readonly`, `placeholder`, or `multiple`, on the element that actually receives them. Do not assume every component forwards them to its control.                |
| Callbacks and yielded actions                                     | Demonstrate their observable effect in a working workflow when useful, rather than adding a static grid or diagnostic log for every callback.                                                                                   |
| Data-dependent rendering                                          | Select supported empty, minimal, overflow, selected, expanded, or boundary cases that expose distinct outcomes. Add loading/error examples only when the component supports them or they are clearly consumer-owned demo state. |

## Page structure

### Page structure overview

The following main sections should exist on component pages. Include a header for each section of the major groups below.

- "Content": Show the main content and its variations.
- "Variants": Group finite visual options under descriptive headings.
- "States": Demonstrate interactive states for the main control and relevant children.
- "Demos": Include any meaningful usage scenarios beyond the basic content and variants.
- "Base elements": Demonstrate any sub-components and their variations.

### Content and variants

Show a minimal valid example and meaningful content variations: text with and without icons, short and long text, or optional content blocks. Use enough content to make wrapping or truncation observable.

Group finite visual options under `variants` or descriptive headings. Add content/argument combinations only when they reveal another useful outcome, such as size with icon-only content.

References:

- [Button content](../../../../../showcase/app/components/page-components/button/sub-sections/content.gts)
- [Button variants](../../../../../showcase/app/components/page-components/button/sub-sections/variants.gts)
- [Alert type/color combinations](../../../../../showcase/app/components/page-components/alert/sub-sections/color.gts)

### States

Show applicable visual states, such as default, hover, active, and focus, for the main control and relevant interactive children.

Use a labeled `ShwGrid` or `ShwFlex` group and loop over applicable states when useful. Match the grid columns to the comparison.

#### Visual state mocks

The showcase application converts `mock-state-value` into `mock-*` classes. These demonstrate appearance only where the component's CSS supports those classes; they do not move focus, dispatch events, or reproduce component state transitions.

- Set `mock-state-value="hover"` on the styled element, or on a wrapper with `mock-state-selector` targeting the relevant descendants.
- Use `mock-state-selector="input"`, for example, when the actual control is nested inside a field or showcase item. Ensure the selector does not unintentionally target unrelated controls.
- Combine supported classes with `mock-state-value="hover+focus"` when that combination is meaningful.
- Use `mock-state-delay` only when needed to wait for rendering, following an existing working example. A delay does not create or verify an interactive state.

For example, this complete subsection shows the supported TextInput hover/focus appearances on its nested input:

```gts
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { capitalize } from '@ember/string';
import { HdsFormTextInputBase } from '@hashicorp/design-system-components/components';
import ShwGrid from 'showcase/components/shw/grid';

const STATES = ['default', 'hover', 'focus'];

const StateExamples: TemplateOnlyComponent = <template>
  <ShwGrid @columns={{3}} as |SG|>
    {{#each STATES as |state|}}
      <SG.Item
        @label={{capitalize state}}
        mock-state-value={{state}}
        mock-state-selector="input"
      >
        <HdsFormTextInputBase aria-label="Text input / {{state}}" />
      </SG.Item>
    {{/each}}
  </ShwGrid>
</template>;

export default StateExamples;
```

#### Disabled, read-only, invalid, and other semantic states

Use the component's supported argument or native attribute rather than only a mock class. For example, native `disabled` and `readonly` differ from an HDS argument such as `@isInvalid`.

Keep these examples in the state matrix or separate them when easier to inspect. Include disabled hover styling only when meaningful and supported. Do not show impossible interactions, such as keyboard focus on a natively disabled control, or invent active styling for controls without it.

Reference: [TextInput base control states](../../../../../showcase/app/components/page-components/form/text-input/sub-sections/base-element.gts).

### Demos and workflows

Add a working demo when a static example cannot reveal the behavior. Use minimal local state/data to drive the real component, not a visual imitation of its functionality.

- **State changes and progression:** advance a stepper, change tabs, select rows, or update pagination and its displayed data. Show externally controlled updates when they reveal a different workflow.
- **Interacting arguments:** demonstrate effects such as changing `@isDismissDisabled` while an overlay is open.
- **Overlays:** demonstrate supported open, close, and dismissal behavior. Add alternate triggers, such as a dropdown item opening a modal, when they reveal a distinct interaction or focus-return case; not every overlay needs every trigger type.
- **Keyboard and focus:** support real keyboard interaction in relevant workflows, including focus return after dismissal where supported. CSS state mocks are not a substitute.
- **DOM-dependent behavior:** make the component operable when demonstrating behavior such as `@preserveContentInDom`. If the difference is invisible, provide a concise inspection note or observable demo state.
- **External elements:** render the referenced target or boundary with the DOM relationship the API requires. A target may be a sibling, while a boundary may need to be an ancestor. Verify supported selector/node types; add reference forms or target element types when they expose a meaningful difference, not as a universal matrix.

### Base elements and sub-components

Demonstrate sub-components and yielded elements of the main component, including their content, variants, and states, using the same selection principles as the main component. Prefer a `Base elements` section when a component exposes separately useful parts; use a valid parent or semantic context when required. A composition example counts only when it clearly demonstrates the sub-component and its meaningful API, not merely because the sub-component appears inside the parent.

Reference: [Pagination base elements](../../../../../showcase/app/components/page-components/pagination/sub-sections/base-elements.gts).

Reference: [StepperNav base elements](../../../../../showcase/app/components/page-components/stepper-nav/sub-sections/base-elements.gts).

### Miscellaneous considerations

#### Context, composition, and layout

Use a section such as `context`, `containers`, `display`, or `layout` when the surrounding content or CSS changes the component's behavior or presentation. One section can cover several concerns.

- Show intended containers, such as a flush accordion inside a card, when the composition matters.
- Put inline components in a realistic paragraph and show relevant inherited typography, color, alignment, or white-space behavior.
- Demonstrate meaningful constrained widths, flex/grid participation, growth, wrapping, truncation, or scrolling. Do not reproduce every parent CSS combination.
- Include nesting or sibling compositions only when supported and relevant to intended usage.

#### Generated elements and navigation modes

When arguments select different elements or navigation behavior, show labeled examples of the meaningful modes. For example, Button can render a native button, an anchor with `@href`, or an Ember `LinkTo` with `@route`; `LinkTo` also renders an anchor in the DOM.

A `generated-element` section is useful for comparing these modes, but related examples may be grouped elsewhere. Keep navigation examples local and valid, without accidental external navigation during exploration.

#### Positioning and floating behavior

When position is configurable, show supported finite values in a labeled group with enough space to inspect them. Reuse exported value lists where available.

When collision detection is supported, use `ShwAutoscrollable` to make position adjustments observable while scrolling. Supply a valid boundary and meaningful space constraints. Keep clipping, placement, and open/close behavior distinguishable rather than combining every option.

#### Responsiveness

Add responsiveness examples when the component changes at relevant viewport breakpoints or container sizes. Choose sizes on either side of the actual transition rather than arbitrary device categories.

For viewport-dependent behavior, use `ShwFrame` with its required `@src` pointing to a working frameless showcase route. Follow existing route/template wiring and supply an appropriate width, height, and label. Constraining a regular wrapper does not change the viewport for media queries. For container-dependent behavior, vary the parent container instead.

Reference: [Pagination responsiveness](../../../../../showcase/app/components/page-components/pagination/sub-sections/responsiveness.gts).

#### Edge cases and data boundaries

Prefer examples in the relevant existing section; use a dedicated section when a group of edge cases is clearer together. Select only cases the component supports:

- Long, multiline, unbroken, or minimal text; constrained parents and relevant CSS inheritance.
- Empty data, a single item, enough items to overflow, and first/last-page or selection boundaries.
- Supported nesting, expansion, or composition with related HDS components.
- Imperfect but supported configurations, clearly labeled with their limitation. Do not present invalid arguments, assertion failures, or inaccessible markup as recommended usage; keep hard failures in tests.

Reference: [AdvancedTable section organization](../../../../../showcase/app/components/page-components/advanced-table/index.gts).

## Formatting rules

- Use `ShwTextH1` for the page title, `ShwTextH2` for major sections, and `ShwTextH3`/`ShwTextH4` for nested headings without skipping levels. Use `ShwTextBody` for concise explanatory text.
- Use `ShwDivider` at logical boundaries, commonly `@level={{2}}` within subsections. Avoid duplicate separators where adjacent sections already provide separation.
- Use `ShwGrid` for aligned comparisons and `ShwFlex` for flexible groups. `ShwGrid` requires `@columns`; `@direction` belongs to `ShwFlex` and defaults to `row`. Use `column` when examples need vertical stacking.
- Give examples enough context through item `@label` or a yielded `Label` component for formatted labels. Use `capitalize` from `@ember/string` for human-readable enum captions when appropriate; preserve literal API values, code, and abbreviations.
- Use `ShwPlaceholder` for generic content slots. Use real labels, options, rows, and other semantic content when behavior or accessibility depends on them.
- Keep every example accessible: provide accessible names, unique IDs, valid label associations, and appropriate DOM semantics, including for standalone base controls.
- Use deterministic local fixtures and enough content to reveal the intended behavior. Bound asynchronous demo work and clean it up on teardown; avoid unintended form submissions, network requests, or navigation.
- Distinguish static snapshot examples from interactive exploration. Follow existing `data-test-percy` boundaries, and do not assume closed overlays, later demo states, or iframe contents are captured by the initial page snapshot. Verify relevant acceptance/Percy coverage when adding examples like these.

## Code fragments

Use `showcase/app/components/page-components/<component-name>/code-fragments/<code-fragment-name>.gts` for reusable examples or focused interactive demos that benefit from encapsulated state.

Extract fragments during authoring when they reduce duplication or keep a subsection readable. A one-off stateful example may remain in its subsection; extraction is not mandatory merely because it uses JavaScript.

Reference: [Button loading-state fragment](../../../../../showcase/app/components/page-components/button/code-fragments/with-loading-state.gts).

## Completion check

Before considering the content complete, revisit the component-surface inventory and confirm that every identified root component, distinct public sub-component/yielded element, meaningful stateful argument, and relevant interactive control/state is covered by a clearly labeled example or deliberately excluded. Confirm that the examples expose meaningful supported differences without redundant grids or invented APIs. Check defaults, relevant blocks/native attributes, valid child composition, actual interactive behavior, and workflows identified from the public contract. Omit categories with no meaningful outcome rather than adding filler, and explain non-obvious exclusions in the implementation summary when useful.

Verify example labels, accessibility, referenced routes, snapshot boundaries, and any new fragment paths. Keep exhaustive behavioral assertions in the integration tests described by the companion test instructions.
