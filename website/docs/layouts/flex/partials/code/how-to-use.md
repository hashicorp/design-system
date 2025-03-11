## How to use this component

!!! Insight

It's much easier to use this component if one is familiar with the CSS3 Flexible Box specifications.
<br/>
A good and quick introduction to flexbox can be found in [**this MDN guide**](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flexible_box_layout/Basic_concepts_of_flexbox).

!!!

TODO

### TODO

TODO

## Examples

Below some examples of common layouts.

### Alignment

TODO.

#### Evenly spaced items

Using a flexbox-based layout is one of the simplest way to evenly space a set of different items:

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

Using a flexbox layout is possible to obtain a layout where one of the content blocks is flushed to the right side of the container, while all the others are flushed to the left:

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

This is one classic problem in CSS: how to center vertically two or more items? The more reliable solution is to use flexbox:

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

For long time, this has also been another classic CSS problem: how to center horizontally and vertically some content, inside a larger container? Again, the solution is in using flexbox:

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

If one of the flex items has an intrinsic size larger than the flex container, it may squeeze the rest of the flex items:

```handlebars
<Hds::Layout::Flex @gap="16" class="doc-flex-outlined-container" as |LF|>
  <Doc::placeholder @width="100%" @height="auto" @background="#d2f4ff">Some content that wants to occupy all the available space</Doc::placeholder>
  <Hds::Button @text="Main action" @icon="edit" />
</Hds::Layout::Flex>
```

To avoid this, one has to tell the item not to shrink beyond its own size:

```handlebars
<Hds::Layout::Flex @gap="16" class="doc-flex-outlined-container" as |LF|>
  <Doc::placeholder @width="100%" @height="auto" @background="#d2f4ff">Some content that wants to occupy all the available space</Doc::placeholder>
  <LF.Item @shrink={{false}}>
    <Hds::Button @text="Main action" @icon="edit" />
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
  <Hds::Button class="doc-flex-margin-left-auto" @text="Main action" @icon="edit" />
</Hds::Layout::Flex>
```

This behaviour is due to the default behaviout of the flexbox layout model, and depends on the CSS `display` of those items.

To avoid this, one has to choose a non-stretching alignment for the items:

```handlebars
<Hds::Layout::Flex @align="start" @gap="16" class="doc-flex-outlined-container" as |LF|>
  <Doc::placeholder @width="auto" @height="80px" @background="#d2f4ff">Some content that is taller than the sibling item</Doc::placeholder>
  <Hds::Button class="doc-flex-margin-left-auto" @text="Main action" @icon="edit" />
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

## Common layout patterns

Below some examples of common layouts.

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