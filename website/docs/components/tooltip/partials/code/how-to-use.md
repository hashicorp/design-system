## How to use this component

The HDS tooltip is provided as both a `TooltipButton` component and as an `hds-tooltip` Ember [modifier](/components/tooltip?tab=code#ember-modifier). To be accessible, the element which triggers a tooltip needs to be an interactive element which can receive focus. This means that:

* if the tooltip needs to be applied to a non-interactive element, the `TooltipButton` component should be used as it wraps the opener element with a `button` element.
* if the tooltip needs to be applied to an element which is already interactive, the `hds-tooltip` modifier should be used.

Currently, the tooltip uses [Tippy.js](https://atomiks.github.io/tippyjs/) under the hood for its main functionality.

<!-- use the same heading order from Guidelines -->
### TooltipButton

!!! Warning

As the `TooltipButton` component wraps its content with an HTML `<button>` element, there may be possible layout changes when using it to wrap an existing non-interactive element in your application’s UI.
!!!

#### Icon

[[code-snippets/tooltip-icon]]

#### Inline with text

[[code-snippets/tooltip-inline]]

#### Placement

The tooltip appears at the “top” centered above the opener button content by default. If the tooltip is near any of the edges of the screen, its position will automatically adjust to prevent the tooltip content from being cut off so it remains readable.

Use the `@placement` argument if you would like to use a different starting position for the tooltip vs. the default.

[[code-snippets/tooltip-placement]]

#### Offset

You can change the offset of the tooltip in relation to the opener element content if needed.

[[code-snippets/tooltip-offset]]

#### isInline

You can change the default `inline-block` display to use `flex` display if needed.

[[code-snippets/tooltip-not-inline]]

#### Extra Tippy Options

You can use `@extraTippyOptions` to provide more specific options to [Tippy.js](https://atomiks.github.io/tippyjs/). For a full list of available options refer to the [Tippy.js API documentation](https://atomiks.github.io/tippyjs/v6/all-props/).

For example, you can use the `allowHTML` option to enable rich tooltip text:

[[code-snippets/tooltip-extra-options]]

!!! Warning

If you enable the `allowHTML` option:
- be sure to sanitize your data
- to maintain accessibility, do not include interactive content such as links or buttons
- we recommend using only basic inline-level text formatting tags such as `strong` or `em`; using block-level tags such as `div` or `p` will make the HTML syntax invalid

!!!

### Ember modifier

An Ember modifier is available if your use case requires attaching a tooltip to an element that is already interactive (to be accessible, tooltips should only be attached to interactive elements, like buttons, links, inputs, etc).

#### Modifier used on a link

[[code-snippets/tooltip-modifier]]

#### Placement

[[code-snippets/tooltip-modifier-placement]]

#### Offset

[[code-snippets/tooltip-modifier-offset]]

#### Extra Tippy Options

You can enable extra [Tippy.js options](https://atomiks.github.io/tippyjs/v6/all-props/) by passing a hash of the options you wish to use similarly to how the `TooltipButton` component works. You should make sure that any additional options chosen will still result in a WCAG-conformant outcome.

For example, this is how to enable rich text in the case of the modifier:

[[code-snippets/tooltip-modifier-extra-options]]

!!! Warning

If you enable the `allowHTML` option:
- be sure to sanitize your data
- to maintain accessibility, do not include interactive content such as links or buttons
- we recommend using only basic inline-level text formatting tags such as `strong` or `em`; using block-level tags such as `div` or `p` will make the HTML syntax invalid

!!!
