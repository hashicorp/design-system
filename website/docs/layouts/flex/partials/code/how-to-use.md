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

```handlebars{data-execute=false}
<Hds::Layout::Flex>
  <div>{{! some content here }}</div>
  <div>{{! some other content here }}</div>
  <div>{{! more content here }}</div>
</Hds::Layout::Flex>
```

Every direct child element of the **flexbox container** will be treated, by the browser's layout engine, as a **flex item** (for details about what this means, refer to [the MDN guide](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flexible_box_layout/Basic_concepts_of_flexbox)).

Here is an example with four equally sized generic content placeholders:

```handlebars
<Hds::Layout::Flex>
  <Doc::placeholder @width="100%" @height="40px" @background="#e5ffd2">Some content</Doc::placeholder>
  <Doc::placeholder @width="100%" @height="40px" @background="#e4c5f3">Other content</Doc::placeholder>
  <Doc::placeholder @width="100%" @height="40px" @background="#d2f4ff">More content</Doc::placeholder>
  <Doc::placeholder @width="100%" @height="40px" @background="#fff8d2">Extra content</Doc::placeholder>
</Hds::Layout::Flex>
```

There are cases in which it is necessary to wrap one or more child elements in a specific `Layout::Flex::Item` (eg. to apply the `@basis/@grow/@shrink` arguments, see below for details).

```handlebars{data-execute=false}
<Hds::Layout::Flex as |LF|>
  <div>{{! some content here }}</div>
  <LF.Item @grow={{false}}>
    {{! some other content here }}
  </LF.Item>
  <div>{{! more content here }}</div>
</Hds::Layout::Flex>
```

### Tag

!!! Warning

**Accessibility alert**

While, by default, the component renders a `<div>`, we invite consumers to consider which semantic HTML tag is the correct one for the context in which the text is used to meet WCAG Success Criterion [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html) as the visual experience should match what is presented to the user with assistive technology.

!!!

To specify which HTML tag to use to render the flex container and/or item(s), use the `@tag` argument.

```handlebars{data-execute=false}
<Hds::Layout::Flex @tag="ul" as |LF|>
  <li>{{! some content here }}</li>
  <LF.Item @tag="li">
    {{! some other content here }}
  </LF.Item>
  <li>{{! more content here }}</li>
</Hds::Layout::Flex>
```

### Direction

To specify in which [direction](https://developer.mozilla.org/en-US/docs/Web/CSS/flex-direction) the flex items are laid out, use the `@direction` argument.

```handlebars
<Hds::Layout::Flex @direction="column" @tag="ul" class="doc-flex-demo-plain-list" as |LF|>
  <LF.Item @tag="li">
    <Doc::placeholder @height="40px" @background="#e5ffd2">Some content</Doc::placeholder>
  </LF.Item>
  <LF.Item @tag="li">
    <Doc::placeholder @height="40px" @background="#e4c5f3">Other content</Doc::placeholder>
  </LF.Item>
  <LF.Item @tag="li">
    <Doc::placeholder @height="40px" @background="#d2f4ff">More content</Doc::placeholder>
  </LF.Item>
  <LF.Item @tag="li">
    <Doc::placeholder @height="40px" @background="#fff8d2">Extra content</Doc::placeholder>
  </LF.Item>
</Hds::Layout::Flex>
```

_Note: we don't expose the `reverse` directions because they come with intrinsic accessibility limitations by changing the visual order of elements on the page from the DOM order._

### Spacing

!!! Warning

**Important**

The **pre-defined value(s)** passed to the `@gap` argument **must be string(s)**, not numbers!

!!!

To control the spacing between flex items, use the `@gap` argument.

Below is an example of multiple flex items with different relative sizes but an equal gap of 24px between them:

```handlebars
<Hds::Layout::Flex @gap="24">
  <Doc::placeholder @width="100%" @height="40px" @background="#e5ffd2">Some content</Doc::placeholder>
  <Doc::placeholder @width="80%" @height="40px" @background="#e4c5f3">Other content</Doc::placeholder>
  <Doc::placeholder @width="60%" @height="40px" @background="#d2f4ff">More content</Doc::placeholder>
  <Doc::placeholder @width="120%" @height="40px" @background="#fff8d2">Extra content</Doc::placeholder>
</Hds::Layout::Flex>
```

To differentiate the vertical and horizontal spacing between items when they wrap on multiple rows, provide an array of two values to the `@gap` argument.

This is an example of multiple flex items with fixed sizes, appearing on multiple rows, with a vertical gap of 12px and a horizontal one of 24px:

```handlebars
<Hds::Layout::Flex @wrap={{true}} @gap={{array "12" "24"}}>
  <Doc::placeholder @width="450px" @height="40px" @background="#e5ffd2">Some content</Doc::placeholder>
  <Doc::placeholder @width="250px" @height="40px" @background="#e4c5f3">Other content</Doc::placeholder>
  <Doc::placeholder @width="180px" @height="40px" @background="#d2f4ff">More content</Doc::placeholder>
  <Doc::placeholder @width="200px" @height="40px" @background="#fff8d2">Extra content</Doc::placeholder>
  <Doc::placeholder @width="240px" @height="40px" @background="#f3d9c5">Even more content</Doc::placeholder>
</Hds::Layout::Flex>
```

The first value in the array refers to the vertical gap between "rows" of items (`row-gap` in CSS), the second one to the horizontal spacing between "columns" of items (`column-gap` in CSS).

The `@gap` argument accepts only **pre-defined values**, it can't be used to provide custom spacing values. Refer to the [Component API](#component-api) section for details on which values are accepted.

If you need to provide custom spacing values, see below how you can use a special escape hatch for this.

#### Non-standard gap values

If you absolutely have to use non-standard spacing value(s) for the flex `gap`, you can use the internal `--hds-layout-flex-row-gap` and `--hds-layout-flex-column-gap` CSS variables and pass custom values to them (e.g., via a local CSS class or an inline style).

```handlebars{data-execute=false}
<Hds::Layout::Flex class="doc-flex-demo-custom-flex-column-gap">
  {{!
    // example of CSS code associated with the demo class:
    .doc-flex-demo-custom-flex-column-gap {
      --hds-layout-flex-column-gap: 13px;
    }
  }}
  {{!
    multiple flex items here, with a non-standard gap between them
  }}
</Hds::Layout::Flex>
```

If the flex items are wrapping to multiple lines, you have to overwrite both the "row" and "column" gap values:

```handlebars{data-execute=false}
<Hds::Layout::Flex
  {{style --hds-layout-flex-row-gap="10px" --hds-layout-flex-column-gap="0.625rem"}}
  @wrap={{true}}
>
  {{!
    multiple flex items appearing on multiple rows
    with a vertical gap of 10px and an horizontal one of 0.625rem
  }}
</Hds::Layout::Flex>
```

### Alignment

Using `flexbox` is one of the simplest ways to control how sets of items are aligned and spaced, and it's done via a set of `justify-*` and `align-*` properties.

In the `Layout::Flex` component this is achieved using the `@justify` and `align` arguments.

```handlebars{data-execute=false}
<Hds::Layout::Flex @justify="space-between" @align="center">
  {{! the flex items here }}
</Hds::Layout::Flex>
```

These arguments correspond to the [`justify-content`](https://developer.mozilla.org/en-US/docs/Web/CSS/justify-content) and [`align-items`](https://developer.mozilla.org/en-US/docs/Web/CSS/align-items) flexbox properties in CSS.

When the `@direction` is set to `row`, the first controls the horizontal alignment and the second controls the vertical alignment. When the direction is set to `column`, the behavior is reversed.

_Note: we only expose the most commonly used values for `justify-content`/`align-items`. Refer to the [Component API](#component-api) section for details on which values are accepted._

#### Evenly distributed items

This is an example of how to implement a layout where a set of items are evenly spaced:

```handlebars
<Hds::Layout::Flex @justify="space-between" @gap="16" class="doc-flex-outlined-container">
  <Doc::placeholder @width="auto" @height="40px" @background="#e5ffd2">Some content</Doc::placeholder>
  <Doc::placeholder @width="auto" @height="40px" @background="#e4c5f3">Other content</Doc::placeholder>
  <Doc::placeholder @width="auto" @height="40px" @background="#d2f4ff">More content</Doc::placeholder>
  <Doc::placeholder @width="200px" @height="80px" @background="#fff8d2">Some content that is wider and taller</Doc::placeholder>
</Hds::Layout::Flex>
```

In this case, the `@justify="space-between"` applied to the flex container forces the flex layout model to distribute the space evenly between the items; the space between the items remains the same, even if their size is different.

#### Right aligned items

This is an example of how to obtain a layout where one of the items is flushed to the right side of the container, while all the others are flushed to the left:

```handlebars
<Hds::Layout::Flex @gap="16" class="doc-flex-outlined-container">
  <Doc::placeholder @width="auto" @height="40px" @background="#d2f4ff">Some content</Doc::placeholder>
  <Doc::placeholder @width="auto" @height="40px" @background="#d2f4ff">Other content</Doc::placeholder>
  <Doc::placeholder class="doc-flex-margin-left-auto" @width="auto" @height="40px" @background="#fff8d2">Content flushed on the right</Doc::placeholder>
</Hds::Layout::Flex>
```

In this case, by applying a `margin-left: auto` to the last flex item, the flexbox layout engine pushes it completely to the right (because implicitly it has `margin-right: 0`).

The same technique can also be applied when there are multiple elements that need to be aligned to the right:

```handlebars
<Hds::Layout::Flex @gap="16" class="doc-flex-outlined-container">
  <Doc::placeholder @width="auto" @height="40px" @background="#d2f4ff">Some content</Doc::placeholder>
  <Doc::placeholder @width="auto" @height="40px" @background="#d2f4ff">Other content</Doc::placeholder>
  <Doc::placeholder class="doc-flex-margin-left-auto" @width="auto" @height="40px" @background="#fff8d2">More content</Doc::placeholder>
  <Doc::placeholder @width="auto" @height="40px" @background="#e4c5f3">Extra content</Doc::placeholder>
</Hds::Layout::Flex>
```

In this case, the `margin-left: auto` is applied only to the first item that is flushed to the right; all the other items are automatically pushed to the right by the first flushed right item.

#### Vertical centering

A classic CSS problem: how to vertically center two or more items? A reliable solution is to use flexbox alignment.

```handlebars
<Hds::Layout::Flex @align="center" @gap="8">
  <Doc::placeholder @width="100px" @height="100px" @background="#d2f4ff">Some content</Doc::placeholder>
  <Doc::placeholder @width="200px" @height="40px" @background="#fff8d2">Other content</Doc::placeholder>
  <Doc::placeholder @width="300" @height="20px" @background="#e4c5f3">More content</Doc::placeholder>
</Hds::Layout::Flex>
```

In this case, the `@align="center"` applied to the flex container forces the flex items to vertically align their centers along the "cross axis".

#### Both horizontal and vertical centering

Another classic CSS problem: how to center content _both_ horizontally and vertically inside a larger container? Again, the solution is to use flexbox alignment.

```handlebars
<Hds::Layout::Flex @justify="center" @align="center" class="doc-flex-fixed-height-container doc-flex-outlined-container">
  <Doc::placeholder @width="240px" @height="180px" @background="#d2f4ff">Some content</Doc::placeholder>
</Hds::Layout::Flex>
```

In this case, the `@justify="center"` and `@align="stretch"` arguments applied to the flex container force the flex item to be centered both horizontally and vertically.

_Note: We have applied an outline and a fixed height to the flex container to demonstrate the behavior._

### Wrapping

One useful function of the flexbox layout model is that it allows items to wrap along multiple rows when there is not enough space in the container to fit them all in a single line.

To allow the flex items in the `Layout::Flex` to wrap along multiple rows if needed, set `@wrap` to `true`.

```handlebars{data-execute=false}
<Hds::Layout::Flex @wrap={{true}}>
  {{! multiple flex items here, some of which may appear on multiple rows }}
</Hds::Layout::Flex>
```

```handlebars
<Hds::Layout::Flex @wrap={{true}} @gap={{array "8" "24"}}  class="doc-flex-outlined-container">
  <Doc::placeholder @width="220px" @height="40px" @background="#e5ffd2">Some content</Doc::placeholder>
  <Doc::placeholder @width="250px" @height="40px" @background="#e4c5f3">Other content</Doc::placeholder>
  <Doc::placeholder @width="200px" @height="40px" @background="#d2f4ff">More content</Doc::placeholder>
  <Doc::placeholder @width="300px" @height="40px" @background="#fff8d2">Extra content</Doc::placeholder>
  <Doc::placeholder @width="240px" @height="40px" @background="#f3d9c5">Even more content</Doc::placeholder>
</Hds::Layout::Flex>
```
In this case the `@wrap=\{{true}}` applied to the flex container allows the flex items to wrap on multiple lines. The `@gap=\{{array "8" "24"}}` applied to the flex container defines the gap between the items along the two "directions" (the first value is the space between "rows", the second between "columns").


### Sizing

In flexbox, it's possible to control the relative sizing of flex items within a flex container using the `basis`, `grow`, and `shrink` properties.

In the `Flex::Layout`, these properties translate to the `@basis`, `@grow`, and `@shrink` arguments.

```handlebars{data-execute=false}
<Hds::Layout::Flex as |LF|>
  ...
  <LF.Item @basis="200px" @grow={{1}} @shrink={{0}}>
    {{! the flex item content here }}
  </LF.Item>
  ...
</Hds::Layout::Flex>
```

How these three properties impact the (relative) size of a flex item is not trivial. We suggest consulting [the MDN guide](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flexible_box_layout/Basic_concepts_of_flexbox).

#### Force items to use all the available space

By default, flex items use only the space necessary to fit their content. If there is extra space in the flex container, the items will not automatically expand to fill it.

```handlebars
<Hds::Layout::Flex @gap="16" class="doc-flex-outlined-container" as |LF|>
  <Doc::placeholder @width="auto" @height="40px" @background="#d2f4ff">Some content</Doc::placeholder>
  <LF.Item>
    <Doc::placeholder @height="40px" @background="#e5ffd2">This content occupies the minimum space possible</Doc::placeholder>
  </LF.Item>
  <Doc::placeholder @width="auto" @height="40px" @background="#d2f4ff">Extra content</Doc::placeholder>
</Hds::Layout::Flex>
```

If we want an item to to grow and occupy the available space, we have to use its `grow` property.

```handlebars
<Hds::Layout::Flex @gap="16" class="doc-flex-outlined-container" as |LF|>
  <Doc::placeholder @width="auto" @height="40px" @background="#d2f4ff">Some content</Doc::placeholder>
  <LF.Item @grow={{true}}>
    <Doc::placeholder @height="40px" @background="#e5ffd2">This content occupies as much space as possible</Doc::placeholder>
  </LF.Item>
  <Doc::placeholder @width="auto" @height="40px" @background="#d2f4ff">Extra content</Doc::placeholder>
</Hds::Layout::Flex>
```

In this case we have applied `@grow=\{{true}}` to the wrapping `Flex::Item`, forcing it to use all the available space inside the flexbox container.

#### Prevent collapsing of content

In the example below, you can see how, if one of the flex items has an intrinsic size larger than the flex container, it may squeeze the rest of the flex items (specifically the button element in this case).

```handlebars
<Hds::Layout::Flex @gap="16" class="doc-flex-outlined-container" as |LF|>
  <Doc::placeholder @width="100%" @height="auto" @background="#d2f4ff">Some content that wants to occupy all the available space</Doc::placeholder>
  <button type="button">A simple button</button>
</Hds::Layout::Flex>
```

To avoid this, one has to tell the item not to shrink beyond its own size:

```handlebars
<Hds::Layout::Flex @gap="16" class="doc-flex-outlined-container" as |LF|>
  <Doc::placeholder @width="100%" @height="auto" @background="#d2f4ff">Some content that wants to occupy all the available space</Doc::placeholder>
  <LF.Item @shrink={{false}}>
    <button type="button">A simple button</button>
  </LF.Item>
</Hds::Layout::Flex>
```

In this case, we have used a wrapping `Flex::Item` and applied `@shrink=\{{false}}` to it, to prevent it from shrinking.

#### Prevent stretching of content

If one of the flex items has an intrinsic height larger than the other flex items, those items may be stretched vertically so they all have the same height:

```handlebars
<Hds::Layout::Flex @gap="16" class="doc-flex-outlined-container" as |LF|>
  <Doc::placeholder @width="auto" @height="80px" @background="#d2f4ff">Some content that is taller than the sibling item</Doc::placeholder>
  <button type="button" class="doc-flex-margin-left-auto">A simple button</button>
</Hds::Layout::Flex>
```

This behavior is due to the default behavior of the flexbox layout model, and depends on the CSS `display` of those items.

To avoid this, one can choose a non-stretching alignment for the items.

```handlebars
<Hds::Layout::Flex @align="start" @gap="16" class="doc-flex-outlined-container" as |LF|>
  <Doc::placeholder @width="auto" @height="80px" @background="#d2f4ff">Some content that is taller than the sibling item</Doc::placeholder>
  <button type="button" class="doc-flex-margin-left-auto">A simple button</button>
</Hds::Layout::Flex>
```

In this case, the `@align="start"` applied to the flex container forces the flex items to vertically align at the start (top) along what is called the "cross axis".

An alternative solution is to wrap the element that shouldn't stretch with a flex `Item` like in this example:

```handlebars
<Hds::Layout::Flex @direction="column" @gap="16" as |LF|>
  <Hds::Badge @text="Stretched badge" @color="critical" />
  <LF.Item>
    <Hds::Badge @text="Non-stretched badge" @color="success" />
  </LF.Item>
</Hds::Layout::Flex>
```

### More options

#### Inline

To change the default display from `flex` to `inline-flex`, set `@isInline` to `true`.

```handlebars
<p>It is going to be a
<Hds::Layout::Flex  @isInline={{true}} @tag="span" @gap="4">
  <Doc::Placeholder @width="16px" @height="16px" @text="😎" @background="#e4c5f3" />
  <Doc::Placeholder @height="16px" @text="Sunny day" @background="#fff8d2" />
</Hds::Layout::Flex>
this Sunday.</p>
```

#### Nesting

It's possible to nest flexbox containers to achieve more complex layouts.

```handlebars
<Hds::Layout::Flex @direction="column" class="doc-flex-outlined-container">
  <Doc::placeholder @height="50px" @background="#e5ffd2">Top content</Doc::placeholder>
  <Hds::Layout::Flex @direction="row" as |LF|>
    <Doc::placeholder @width="150px" @height="auto" @background="#e4c5f3">Side content</Doc::placeholder>
    <LF.Item @grow={{true}}>
      <Doc::placeholder @width="auto" @height="250px" @background="#d2f4ff">Main content</Doc::placeholder>
    </LF.Item>
  </Hds::Layout::Flex>
  <Doc::placeholder @height="50px" @background="#fff8d2">Bottom content</Doc::placeholder>
</Hds::Layout::Flex>
```

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


```handlebars
<Hds::Layout::Flex @align="center" @gap="8">
  <img class="doc-flex-media-avatar" src="/assets/images/avatar.png" alt="portrait of a cat wearing coat and tie" />
  <Hds::Text::Body @size="200" @tag="p">Lorem ipsum dolor sit amet</Hds::Text::Body>
</Hds::Layout::Flex>
```

```handlebars
<Hds::Layout::Flex @align="center" @gap="8">
  <Hds::Icon @name="info" @size="24" />
  <Hds::Text::Body @size="200" @tag="p">Lorem ipsum dolor sit amet</Hds::Text::Body>
</Hds::Layout::Flex>
```

```handlebars
<Hds::Layout::Flex @align="start" @gap="16">
  <Hds::IconTile @logo="boundary" />
  <Hds::Layout::Flex @direction="column" @gap="4">
    <Hds::Text::Display @size="400" @tag="h5">Lorem ipsum dolor</Hds::Text::Display>
    <Hds::Text::Body @size="200" @tag="p">Lorem ipsum dolor sit amet consectetur adipiscing elit</Hds::Text::Body>
    <Hds::Link::Standalone @icon="external-link" @iconPosition="trailing" @text="Documentation" @href="#" />
  </Hds::Layout::Flex>
</Hds::Layout::Flex>
```

### Group of cards

!!! Warning

A responsive implementation of this UI pattern is a bit more complex and requires usage of `min-max/max-width` values for the cards and allowing wrapping of the flex item elements. It may also require changing the direction of the flex container at a certain breakpoint.

!!!

Using the automatic layout offered by flexbox, you can create a group of identically sized, evenly spaced cards, like in this example:

```handlebars
<Hds::Layout::Flex @align="stretch" @gap="48" as |LF|>
  <LF.Item @basis={{0}} @grow={{true}}>
    <Hds::Card::Container @level="mid" @hasBorder={{true}} class="doc-flex-cards-item">
      <Hds::Text::Body @tag="p" @size="200">This is some generic content inside a card</Hds::Text::Body>
    </Hds::Card::Container>
  </LF.Item>
  <LF.Item @basis={{0}} @grow={{true}}>
    <Hds::Card::Container @level="mid" @hasBorder={{true}} class="doc-flex-cards-item">
      <Hds::Text::Body @tag="p" @size="200">This is some other generic content inside a card</Hds::Text::Body>
    </Hds::Card::Container>
  </LF.Item>
  <LF.Item @basis={{0}} @grow={{true}}>
    <Hds::Card::Container @level="mid" @hasBorder={{true}} class="doc-flex-cards-item">
      <Hds::Text::Body @tag="p" @size="200">This is also some generic content inside a card, but the text is longer and makes the card grow vertically</Hds::Text::Body>
    </Hds::Card::Container>
  </LF.Item>
</Hds::Layout::Flex>
```
Similarly, it's easy to implement a vertical stack of cards:

```handlebars
<Hds::Layout::Flex @direction="column" @gap="16" as |LF|>
  <Hds::Card::Container @level="mid" @hasBorder={{true}} class="doc-flex-cards-item">
    <Hds::Text::Body @tag="p" @size="200">This is some generic content inside a card</Hds::Text::Body>
  </Hds::Card::Container>
  <Hds::Card::Container @level="mid" @hasBorder={{true}} class="doc-flex-cards-item">
    <Hds::Text::Body @tag="p" @size="200">This is some other generic content inside a card</Hds::Text::Body>
  </Hds::Card::Container>
  <Hds::Card::Container @level="mid" @hasBorder={{true}} class="doc-flex-cards-item">
    <Hds::Text::Body @tag="p" @size="200">This is also some generic content inside a card, but the text is longer and makes the card grow vertically</Hds::Text::Body>
  </Hds::Card::Container>
</Hds::Layout::Flex>
```

### Empty state

Using the horizontal/vertical alignment offered by flexbox, it is also possible to implement a standard empty state in a page. As a consumer, you will just have to take care of the height of the container in relation to the available vertical space in the page.

```handlebars
<Hds::Layout::Flex
  @justify="center"
  @align="center"
  class="doc-flex-fixed-height-container doc-flex-outlined-container"
as |LF|>
  <Hds::ApplicationState as |A|>
    <A.Header @title="Empty state title text" @icon="alert-circle" />
    <A.Body @text="The item you were looking for was not found." />
  </Hds::ApplicationState>
</Hds::Layout::Flex>
```

### Right aligned actions

Using the `margin-left: auto` trick described above, one can achieve the following layout, where one of the flex items is flushed to the right:

```handlebars
<Hds::Layout::Flex @align="start" @gap="16" class="doc-flex-outlined-container">
  <Hds::IconTile @logo="boundary" />
  <Hds::Text::Display @size="500" @tag="h5">Lorem ipsum dolor</Hds::Text::Display>
  <Hds::Dropdown class="doc-flex-margin-left-auto" as |D|>
    <D.ToggleButton @text="Main actions" />
    <D.Interactive @route="components">Action One</D.Interactive>
    <D.Interactive @route="components">Action Two</D.Interactive>
    <D.Interactive @route="components">Action Three</D.Interactive>
  </Hds::Dropdown>
</Hds::Layout::Flex>
```

If needed, multiple items can be flushed to the right:

```handlebars
<Hds::Layout::Flex @align="start" @gap="16" class="doc-flex-outlined-container">
  <Hds::IconTile @logo="boundary" />
  <Hds::Text::Display @size="500" @tag="h5">Lorem ipsum dolor</Hds::Text::Display>
  <Hds::Button class="doc-flex-margin-left-auto" @text="Main action" @icon="edit" />
  <Hds::Dropdown as |D|>
    <D.ToggleButton @text="More actions" @color="secondary" />
    <D.Interactive @route="components">Action One</D.Interactive>
    <D.Interactive @route="components">Action Two</D.Interactive>
    <D.Interactive @route="components">Action Three</D.Interactive>
  </Hds::Dropdown>
</Hds::Layout::Flex>
```
