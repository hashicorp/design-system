## How to use this component

!!! Insight

It's much easier to use this component if one is familiar with the CSS3 Flexible Box specifications.
<br/>
A good and quick introduction to flexbox can be found in [**this MDN guide**](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flexible_box_layout/Basic_concepts_of_flexbox).

!!!

TODO add intro here about why this component in HDS

### Basic usage [TODO]

Explain the most basic usage here

- just flex
- flex + item(s)

explain that the `Flex.Item` is not necessary per se

add here text about not abusing it!

### Tag

To specify which HTML tag to use to render the flex container and/or item(s), use the `@tag` argument:

```handlebars{data-execute=false}
<Hds::Layout::Flex @tag="ul" as |LF|>
  <li>{{! some content here }}</li>
  <LF.Item @tag="li">
    {{! some other content here }}
  </HLF.Item>
  <li>{{! more content here }}</li>
</Hds::Layout::Flex>
```

!!! Insight

While by default the component renders a `<div>`, we invite consumers to consider which semantic HTML tag is the correct one for the context in which the text is used to meet WCAG Success Criterion [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html) as the visual experience should match what is presented to the user with assistive technology.

!!!

### Direction

To specify which in which [direction](https://developer.mozilla.org/en-US/docs/Web/CSS/flex-direction) the flex items are laid out, use the `@direction` argument:

```handlebars{data-execute=false}
<Hds::Layout::Flex @direction="column" as |LF|>
  {{! the flex items here }}
</Hds::Layout::Flex>
```

_Note: we don't expose the `reverse` directions because they come with intrinsic accessibility limitations that we prefer our consumers to avoid._

📚 Refer to the ["Recipes"](#flexbox-layout-recipes) and [Patterns](#common-layout-patterns) sections below for practical examples of how the Flexbox `direction` property can be used to implement specific layouts.

### Justify / Align

To specify how the flex items are spaced and aligned, use the `@justify` and `align` arguments:

```handlebars{data-execute=false}
<Hds::Layout::Flex @justify="align-items" @align="center">
  {{! the flex items here }}
</Hds::Layout::Flex>
```

These arguments correspond to the [`justify-content`](https://developer.mozilla.org/en-US/docs/Web/CSS/justify-content) and [`align-items`](https://developer.mozilla.org/en-US/docs/Web/CSS/align-items) flexbox properties in CSS.

_Note: we don't expose all the possible values for `justify-content`/`align-items`, only to the most commonly used ones. Refer to the [Component API](#component-api) section for details on which values are accepted._

📚 Refer to the ["Recipes"](#flexbox-layout-recipes) and [Patterns](#common-layout-patterns) sections below for practical examples of how the Flexbox `justify-content`/`align-items` properties can be used to implement specific layouts.


### Wrap

To allow the flex items to wrap along multiple rows if needed, set `@wrap` to `true`:

```handlebars{data-execute=false}
<Hds::Layout::Flex @wrap={{true}}>
  {{! multiple flex items here, some of which may appear on multiple rows }}
</Hds::Layout::Flex>
```

📚 Refer to the ["Recipes"](#flexbox-layout-recipes) and [Patterns](#common-layout-patterns) sections below for practical examples of how the Flexbox `flex-wrap` property can be used to implement specific layouts.


### Gap

To control the spacing between flex items, use the `@gap` argument:

```handlebars{data-execute=false}
<Hds::Layout::Flex @gap="16">
  {{! multiple flex items here, with a gap of 16px between them }}
</Hds::Layout::Flex>
```

To differentiate the vertical and horizontal spacing between items when they wrap on multiple rows, provide an array of two values to the `@gap` argument:

```handlebars{data-execute=false}
<Hds::Layout::Flex @wrap={{true}} @gap={{array "16" "48"}}>
  {{!
    multiple flex items appearing on multiple rows
    with a vertical gap of 16px and an horizontal one of 48px
  }}
</Hds::Layout::Flex>
```

The first value in the array refers to the vertical gap between "rows" of items (`row-gap` in CSS), the second one to the horizontal spacing between "columns" of items (`column-gap` in CSS).

The `@gap` argument accepts only **pre-defined values**, it can't be used to provide custom spacing values. Refer to the [Component API](#component-api) section for details on which values are accepted.

If you need to provide custom spacing values, see below how you can use a special escape hatch for this.

!!! Warning

**Important**

The **pre-defined value(s)** passed to the `@gap` argument **must be string(s)**, not numbers!

!!!

📚 Refer to the ["Recipes"](#flexbox-layout-recipes) and [Patterns](#common-layout-patterns) sections below for practical examples of how the Flexbox `gap` property can be used to implement specific layouts.

#### Non-standard gap values

If you absolutely have to use non-standard spacing value(s) for the flex `gap`, you can use the internal `--hds-layout-flex-row-gap` and `--hds-layout-flex-column-gap` CSS variables and pass custom values to them (e.g., via a local CSS variable or an inline style):

```handlebars{data-execute=false}
<Hds::Layout::Flex class="doc-flex-demo-custom-flex-column-gap">
  {{!
    multiple flex items here, with a non-standard gap between them
    by assigning a custom value for `--hds-layout-flex-column-gap`
    declared in the `.doc-flex-demo-custom-flex-column-gap` local class
  }}
</Hds::Layout::Flex>
```

In this case we're overwriting only the "column" gap value via the custom CSS class.

If the flex items are wrapping on multiple lines, you have to overwrite both the "row" and "column" gap values:

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

### isInline

To change the default display from `flex` to `inline-flex`, set `@isInline` to `true`:

```handlebars{data-execute=false}
<Hds::Layout::Flex @isInline={{true}}>
  {{! the flex items here }}
</Hds::Layout::Flex>
```

### Basis/Grow/Shrink

To control the relative sizing of the flex items, use the `@basis`, `@grow`, and `@shrink` arguments:

```handlebars{data-execute=false}
<Hds::Layout::Flex as |LF|>
  ...
  <LF.Item @basis="200px" @grow={{1}} @shrink={{0}}>
    {{! the flex item content here }}
  </HLF.Item>
  ...
</Hds::Layout::Flex>
```

How these three properties impact on the (relative) size of a flex item is not trivial, we suggest to look at the introduction to flexbox guide linked at the top of this page.

📚 Refer to the ["Recipes"](#flexbox-layout-recipes) and [Patterns](#common-layout-patterns) sections below for practical examples of how the Flexbox `flex-basis`/`flex-grow`/`flex-shrink` properties can be used to implement specific layouts.

---

## Flexbox layout "recipes"

Below some examples of common generic layouts that can be achieved using CSS `flexbox`, and therefore the `Layout::Flex` component.

### Alignment

Using `flexbox`/`Layout::Flex` is one of the simplest way to control the alignment of lists of items.

#### Evenly spaced items

This is an example of how to implement a layout where a set of items are evenly spaced:

```handlebars
<Hds::Layout::Flex @justify="space-between" @gap="16" class="doc-flex-outlined-container">
  <Doc::placeholder @width="auto" @height="40px" @background="#d2f4ff">Some content</Doc::placeholder>
  <Doc::placeholder @width="auto" @height="40px" @background="#d2f4ff">Other content</Doc::placeholder>
  <Doc::placeholder @width="auto" @height="40px" @background="#d2f4ff">More content</Doc::placeholder>
  <Doc::placeholder @width="200px" @height="40px" @background="#d2f4ff">Some content that is wider</Doc::placeholder>
</Hds::Layout::Flex>
```

In this case:

- the `@justify="space-between"` applied to the flex container forces the flex layout model to distribute the space evenly between the items; the space between the items remains the same, even if their size is different

#### Right aligned items

This is an example of how to obtain a layout where one of the items is flushed to the right side of the container, while all the others are flushed to the left:

```handlebars
<Hds::Layout::Flex @gap="16" class="doc-flex-outlined-container">
  <Doc::placeholder @width="auto" @height="40px" @background="#d2f4ff">Some content</Doc::placeholder>
  <Doc::placeholder @width="auto" @height="40px" @background="#d2f4ff">Other content</Doc::placeholder>
  <Doc::placeholder class="doc-flex-margin-left-auto" @width="auto" @height="40px" @background="#fff8d2">Content flushed on the right</Doc::placeholder>
</Hds::Layout::Flex>
```

In this case:

- by applying a `margin-left: auto` to the last flex item, the flexbox layout engine pushes it completely to the right (because implicitly it has `margin-right: 0`)

The same technique can also be applied when there are multiple elements that need to be aligned on the right:

```handlebars
<Hds::Layout::Flex @gap="16" class="doc-flex-outlined-container">
  <Doc::placeholder @width="auto" @height="40px" @background="#d2f4ff">Some content</Doc::placeholder>
  <Doc::placeholder @width="auto" @height="40px" @background="#d2f4ff">Other content</Doc::placeholder>
  <Doc::placeholder class="doc-flex-margin-left-auto" @width="auto" @height="40px" @background="#fff8d2">More content</Doc::placeholder>
  <Doc::placeholder @width="auto" @height="40px" @background="#e4c5f3">Extra content</Doc::placeholder>
</Hds::Layout::Flex>
```

In this case:

- the `margin-left: auto` is applied only to the first item that is flushed to the right; all the other items are automatically pushed to the right by the first flushed item

#### Vertical centering

For a long time, this has been one classic problem in CSS: how to vertically center two or more items? The more reliable solution is to use flexbox's alignment:

```handlebars
<Hds::Layout::Flex @align="center" @gap="8">
  <Doc::placeholder @width="100px" @height="100px" @background="#d2f4ff">Some content</Doc::placeholder>
  <Doc::placeholder @width="200px" @height="40px" @background="#fff8d2">Other content</Doc::placeholder>
  <Doc::placeholder @width="300" @height="20px" @background="#e4c5f3">More content</Doc::placeholder>
</Hds::Layout::Flex>
```

In this case:

- the `@align="center"` applied to the flex container forces the flex items to vertically align their centers along what is called the "cross axis"

#### Both horizontal and vertical centering

This has also been another classic CSS problem: how to center _both_ horizontally and vertically some content, inside a larger container? Again, the solution relies in using flexbox's alignment:

```handlebars
<Hds::Layout::Flex @justify="center" @align="center" class="doc-flex-fixed-height-container doc-flex-outlined-container">
  <Doc::placeholder @width="240px" @height="180px" @background="#d2f4ff">Some content</Doc::placeholder>
</Hds::Layout::Flex>
```

In this case:

- the `@justify="center"` and `@align="stretch"` applied to the flex container force the flex item to be centered both horizontally and vertically (_note: we have applied an outline and a fixed height to the flex container to demonstrate the behaviour_)

### Sizing

It's possible to control the flexible and dynamic sizing of flex items within a flex container using the `basis`, `grow`, and `shrink` properties.

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

If we want an item to to grow and occupy the available space, we have to use its `grow` property:

```handlebars
<Hds::Layout::Flex @gap="16" class="doc-flex-outlined-container" as |LF|>
  <Doc::placeholder @width="auto" @height="40px" @background="#d2f4ff">Some content</Doc::placeholder>
  <LF.Item @grow={{true}}>
    <Doc::placeholder @height="40px" @background="#e5ffd2">This content occupies as much space as possible</Doc::placeholder>
  </LF.Item>
  <Doc::placeholder @width="auto" @height="40px" @background="#d2f4ff">Extra content</Doc::placeholder>
</Hds::Layout::Flex>
```

In this case:

- we have applied `@grow=\{{true}}` to the wrapping `Flex::Item`, forcing it to use all the available extra space inside the flexbox container

#### Prevent collapsing of content

If one of the flex items has an intrinsic size larger than the flex container, it may squeeze the rest of the flex items (see the button element):

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

In this case:

- we have used a wrapping `Flex::Item` and applied `@shrink=\{{false}}` to it, to prevent it from shrinking

#### Prevent stretching of content

If one of the flex items has an intrinsic height larger than the other flex items, those items may be stretched vertically so they all have the same height:

```handlebars
<Hds::Layout::Flex @gap="16" class="doc-flex-outlined-container" as |LF|>
  <Doc::placeholder @width="auto" @height="80px" @background="#d2f4ff">Some content that is taller than the sibling item</Doc::placeholder>
  <button type="button" class="doc-flex-margin-left-auto">A simple button</button>
</Hds::Layout::Flex>
```

This behaviour is due to the default behaviout of the flexbox layout model, and depends on the CSS `display` of those items.

To avoid this, one has to choose a non-stretching alignment for the items:

```handlebars
<Hds::Layout::Flex @align="start" @gap="16" class="doc-flex-outlined-container" as |LF|>
  <Doc::placeholder @width="auto" @height="80px" @background="#d2f4ff">Some content that is taller than the sibling item</Doc::placeholder>
  <button type="button" class="doc-flex-margin-left-auto">A simple button</button>
</Hds::Layout::Flex>
```

In this case:

- the `@align="start"` applied to the flex container forces the flex items to vertically align at the start (top) along what is called the "cross axis"

### Wrapping

One of the useful functionalities of the flexbox layout model is that it allows the items to wrap along multiple rows when there is not enough space in the container to fit them all in a single line:

```handlebars
<Hds::Layout::Flex @gap={{array "8" "24"}} @wrap={{true}} class="doc-flex-outlined-container">
  <Doc::placeholder @width="220px" @height="40px" @background="#e5ffd2">Some content</Doc::placeholder>
  <Doc::placeholder @width="250px" @height="40px" @background="#e4c5f3">Other content</Doc::placeholder>
  <Doc::placeholder @width="200px" @height="40px" @background="#d2f4ff">More content</Doc::placeholder>
  <Doc::placeholder @width="300px" @height="40px" @background="#fff8d2">Extra content</Doc::placeholder>
  <Doc::placeholder @width="240px" @height="40px" @background="#f3d9c5">Even more content</Doc::placeholder>
</Hds::Layout::Flex>
```
In this case:

- the `@wrap=\{{true}}` applied to the flex container allows the flex items to wrap on multiple lines
- the `@gap=\{{array "8" "24"}}` applied to the flex container defines the gap between the items along the two "directions" (the first value is the space between "rows", the second between "columns")

### Nesting

It's possible to nest flexbox containers to achieve more complex layouts:

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

In this case:

- the outer container is a column-based flexbox layout, with three child items
- the second item is a row-based flexbox layout, used to create two side-by side content blocks; of these two the first has a fixed width, while the second fills the remaining area thanks to the `@grow=\{{true}}` attribute

!!! Insight

Depending on the complexity of the design you need to implement, you may want to consider using a CSS `grid` layout, instead of a `flex` layout.

!!!

---

## Common layout patterns

Below some more realistic examples of common layouts that can be achieved using the `Layout::Flex` component, in composition with other HDS components.

!!! Warning

**Important**

The examples below are meant to show how one _could_ use the `Layout::Flex` component to implement certain common/standard UI patterns. They're **not** meant to be taken literally as they are and be used in production code. Also, some of these patterns are already implemented directly in HDS components that are ready to use.

!!!

### Media + Text/Content

This is a classic layout, where a "media" element (it could be an image, an icon, an avatar, etc) is laid out next to a block of text (but could be more complex content). The two elements are visually centered along their horizontal axis.


```handlebars
<Hds::Layout::Flex @align="center" @gap="8">
  <img class="doc-flex-media-avatar" src="/assets/images/avatar.png" alt="portrait of a cat wearing coat and tie" />
  <Hds::Text::Body @size="200" @tag="p">Lorem ipsum dolor sit amet</Hds::Text::Body>
</Hds::Layout::Flex>

<br/>

<Hds::Layout::Flex @align="center" @gap="8">
  <Hds::Icon @name="info" @size="24" />
  <Hds::Text::Body @size="200" @tag="p">Lorem ipsum dolor sit amet</Hds::Text::Body>
</Hds::Layout::Flex>

<br/>

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

Using the automatic layout offered by flexbox, it's extremely easy to create a group of identically sized, evenly spaced cards:

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

!!! Warning

A responsive implementation of this UI pattern is a bit more complex, and requires to use `min-max/max-width` values for the cards, and allow wrapping of the flex item elements. It may also require changing direction of the flex container at a certain breakpoint.

!!!

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

Using the horizontal/vertical alignment offered by flexbox it's easy to implement a standard empty state in a page (as consumer you will just have to take care of the height of the container in relation to the available vertical space in the page):

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

Using the `margin-left: auto` trick described above, one can achieve the following layout, where one of the flex items is flushed on the right:

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

If needed, multiple items can be flushed on the right:

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