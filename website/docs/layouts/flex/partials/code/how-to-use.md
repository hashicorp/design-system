## How to use this component

!!! Insight

**Code tip**

It's much easier to use this component if one is familiar with the CSS3 Flexible Box specifications.
<br/>
A good and quick introduction to flexbox can be found in [this MDN guide](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flexible_box_layout/Basic_concepts_of_flexbox).
!!!

The `Layout::Flex` and optional `Layout::Flex::Item` components provide a way to quickly build out flexbox-based layouts of components or elements without needing to write a lot of custom CSS code or understand all the intricacies of CSS flexbox styles.

### Basic usage

!!! Info 

**Code consideration**

Note: there is no strict need to use the `Layout::Flex::Item` subcomponent; use it only when necessary to tweak the flex styles of an individual child item via the `@basis/@grow/@shrink` arguments. This avoids rendering extra Ember components.
!!!

The simplest way to implement a flexbox layout is by using the `Layout::Flex` component to wrap some content.

[[code-snippets/flex-basic execute=false]]

Every direct child element of the **flexbox container** will be treated, by the browser's layout engine, as a **flex item** (for details about what this means, refer to [the MDN guide](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flexible_box_layout/Basic_concepts_of_flexbox)).

Here is an example with four equally sized generic content placeholders:

[[code-snippets/flex-basic-placeholders]]

There are cases in which it is necessary to wrap one or more child elements in a specific `Layout::Flex::Item` (eg. to apply the `@basis/@grow/@shrink` arguments, see below for details).

[[code-snippets/flex-item execute=false]]

### Tag

!!! Warning

**Accessibility alert**

While, by default, the component renders a `<div>`, we invite consumers to consider which semantic HTML tag is the correct one for the context in which the text is used to meet WCAG Success Criterion [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html) as the visual experience should match what is presented to the user with assistive technology.

!!!

To specify which HTML tag to use to render the flex container and/or item(s), use the `@tag` argument.

[[code-snippets/flex-tag execute=false]]

### Direction

To specify in which [direction](https://developer.mozilla.org/en-US/docs/Web/CSS/flex-direction) the flex items are laid out, use the `@direction` argument.

[[code-snippets/flex-direction]]

_Note: we don't expose the `reverse` directions because they come with intrinsic accessibility limitations by changing the visual order of elements on the page from the DOM order._

### Spacing

!!! Warning

**Important**

The **pre-defined value(s)** passed to the `@gap` argument **must be string(s)**, not numbers!

!!!

To control the spacing between flex items, use the `@gap` argument.

Below is an example of multiple flex items with different relative sizes but an equal gap of 24px between them:

[[code-snippets/flex-spacing]]

To differentiate the vertical and horizontal spacing between items when they wrap on multiple rows, provide an array of two values to the `@gap` argument.

This is an example of multiple flex items with fixed sizes, appearing on multiple rows, with a vertical gap of 12px and a horizontal one of 24px:

[[code-snippets/flex-spacing-complex]]

The first value in the array refers to the vertical gap between "rows" of items (`row-gap` in CSS), the second one to the horizontal spacing between "columns" of items (`column-gap` in CSS).

The `@gap` argument accepts only **pre-defined values**, it can't be used to provide custom spacing values. Refer to the [Component API](#component-api) section for details on which values are accepted.

If you need to provide custom spacing values, see below how you can use a special escape hatch for this.

#### Non-standard gap values

If you absolutely have to use non-standard spacing value(s) for the flex `gap`, you can use the internal `--hds-layout-flex-row-gap` and `--hds-layout-flex-column-gap` CSS variables and pass custom values to them (e.g., via a local CSS class or an inline style).

[[code-snippets/flex-custom-gap execute=false]]

If the flex items are wrapping to multiple lines, you have to overwrite both the "row" and "column" gap values:

[[code-snippets/flex-custom-gap-complex execute=false]]

### Alignment

Using `flexbox` is one of the simplest ways to control how sets of items are aligned and spaced, and it's done via a set of `justify-*` and `align-*` properties.

In the `Layout::Flex` component this is achieved using the `@justify` and `align` arguments.

[[code-snippets/flex-align execute=false]]

These arguments correspond to the [`justify-content`](https://developer.mozilla.org/en-US/docs/Web/CSS/justify-content) and [`align-items`](https://developer.mozilla.org/en-US/docs/Web/CSS/align-items) flexbox properties in CSS.

When the `@direction` is set to `row`, the first controls the horizontal alignment and the second controls the vertical alignment. When the direction is set to `column`, the behavior is reversed.

_Note: we only expose the most commonly used values for `justify-content`/`align-items`. Refer to the [Component API](#component-api) section for details on which values are accepted._

#### Evenly distributed items

This is an example of how to implement a layout where a set of items are evenly spaced:

[[code-snippets/flex-align-even-horizontal]]

In this case, the `@justify="space-between"` applied to the flex container forces the flex layout model to distribute the space evenly between the items; the space between the items remains the same, even if their size is different.

#### Right aligned items

This is an example of how to obtain a layout where one of the items is flushed to the right side of the container, while all the others are flushed to the left:

[[code-snippets/flex-align-right]]

In this case, by applying a `margin-left: auto` to the last flex item, the flexbox layout engine pushes it completely to the right (because implicitly it has `margin-right: 0`).

The same technique can also be applied when there are multiple elements that need to be aligned to the right:

[[code-snippets/flex-align-with-margin]]

In this case, the `margin-left: auto` is applied only to the first item that is flushed to the right; all the other items are automatically pushed to the right by the first flushed right item.

#### Vertical centering

A classic CSS problem: how to vertically center two or more items? A reliable solution is to use flexbox alignment.

[[code-snippets/flex-vertical-align]]

In this case, the `@align="center"` applied to the flex container forces the flex items to vertically align their centers along the "cross axis".

#### Both horizontal and vertical centering

Another classic CSS problem: how to center content _both_ horizontally and vertically inside a larger container? Again, the solution is to use flexbox alignment.

[[code-snippets/flex-complex-align]]

In this case, the `@justify="center"` and `@align="stretch"` arguments applied to the flex container force the flex item to be centered both horizontally and vertically.

_Note: We have applied an outline and a fixed height to the flex container to demonstrate the behavior._

### Wrapping

One useful function of the flexbox layout model is that it allows items to wrap along multiple rows when there is not enough space in the container to fit them all in a single line.

To allow the flex items in the `Layout::Flex` to wrap along multiple rows if needed, set `@wrap` to `true`.

[[code-snippets/flex-wrap]]

In this case the `@wrap=\{{true}}` applied to the flex container allows the flex items to wrap on multiple lines. The `@gap=\{{array "8" "24"}}` applied to the flex container defines the gap between the items along the two "directions" (the first value is the space between "rows", the second between "columns").


### Sizing

In flexbox, it's possible to control the relative sizing of flex items within a flex container using the `basis`, `grow`, and `shrink` properties.

In the `Flex::Layout`, these properties translate to the `@basis`, `@grow`, and `@shrink` arguments.

[[code-snippets/flex-relative-sizing-basic execute=false]]

How these three properties impact the (relative) size of a flex item is not trivial. We suggest consulting [the MDN guide](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flexible_box_layout/Basic_concepts_of_flexbox).

#### Force items to use all the available space

By default, flex items use only the space necessary to fit their content. If there is extra space in the flex container, the items will not automatically expand to fill it.

[[code-snippets/flex-default-sizing]]

If we want an item to to grow and occupy the available space, we have to use its `grow` property.

[[code-snippets/flex-grow]]

In this case we have applied `@grow=\{{true}}` to the wrapping `Flex::Item`, forcing it to use all the available space inside the flexbox container.

#### Prevent collapsing of content

In the example below, you can see how, if one of the flex items has an intrinsic size larger than the flex container, it may squeeze the rest of the flex items (specifically the button element in this case).

[[code-snippets/flex-default-collapse]]

To avoid this, one has to tell the item not to shrink beyond its own size:

[[code-snippets/flex-no-shrink]]

In this case, we have used a wrapping `Flex::Item` and applied `@shrink=\{{false}}` to it, to prevent it from shrinking.

#### Prevent stretching of content

If one of the flex items has an intrinsic height larger than the other flex items, those items may be stretched vertically so they all have the same height:

[[code-snippets/flex-default-stretch]]

This behavior is due to the default behavior of the flexbox layout model, and depends on the CSS `display` of those items.

To avoid this, one can choose a non-stretching alignment for the items.

[[code-snippets/flex-no-stretch]]

In this case, the `@align="start"` applied to the flex container forces the flex items to vertically align at the start (top) along what is called the "cross axis".

An alternative solution is to wrap the element that shouldn't stretch with a flex `Item` like in this example:

[[code-snippets/flex-no-stretch-with-item]]

### More options

#### Inline

To change the default display from `flex` to `inline-flex`, set `@isInline` to `true`.

[[code-snippets/flex-inline]]

#### Nesting

It's possible to nest flexbox containers to achieve more complex layouts.

[[code-snippets/flex-nesting]]

In this case, the outer container is a column-based flexbox layout, with three child items, while the second item is a row-based flexbox layout, used to create two side-by-side content blocks. Of these two, the first has a fixed width, while the second fills the remaining area thanks to the `@grow=\{{true}}` attribute.

!!! Insight

**Code tip**

Depending on the complexity and type of design you need to implement, you may want to consider using a [CSS `grid` layout](/layouts/grid), instead of a `flex` layout.
!!!

---

## Common layout patterns

Below are some examples of common layouts that can be achieved using the `Layout::Flex` component, in combination with other HDS components.

!!! Warning

**Important**

The examples below are meant to show how one _could_ use the `Layout::Flex` component to implement certain common/standard UI patterns. They're **not** meant to be taken literally as they are and be used in production code.

!!!

### Media + Text/Content

This is a classic layout, where a "media" element (it could be an image, an icon, an avatar, etc) is laid out next to a block of text (but could be more complex content). The two elements are either visually centered along their horizontal axis, or aligned to their top.


[[code-snippets/flex-media-content-image]]

[[code-snippets/flex-media-content-icon]]

[[code-snippets/flex-media-content-icon-tile]]

### Group of cards

!!! Warning

A responsive implementation of this UI pattern is a bit more complex and requires usage of `min-max/max-width` values for the cards and allowing wrapping of the flex item elements. It may also require changing the direction of the flex container at a certain breakpoint.

!!!

Using the automatic layout offered by flexbox, you can create a group of identically sized, evenly spaced cards, like in this example:

[[code-snippets/flex-horizontal-cards]]

Similarly, it's easy to implement a vertical stack of cards:

[[code-snippets/flex-vertical-cards]]

### Empty state

Using the horizontal/vertical alignment offered by flexbox, it is also possible to implement a standard empty state in a page. As a consumer, you will just have to take care of the height of the container in relation to the available vertical space in the page.

[[code-snippets/flex-empty-state]]

### Right aligned actions

Using the `margin-left: auto` trick described above, one can achieve the following layout, where one of the flex items is flushed to the right:

[[code-snippets/flex-action-right]]

If needed, multiple items can be flushed to the right:

[[code-snippets/flex-multiple-action-right]]
