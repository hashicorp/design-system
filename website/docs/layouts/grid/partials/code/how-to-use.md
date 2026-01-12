## How to use this component

!!! Insight

**Code tip**

While it’s not necessary to be familiar with CSS3 grid specifications to use this component, some knowledge may be helpful in achieving more complex layouts.

A helpful reference with clear examples: [CSS Tricks: Complete grid layout guide](https://css-tricks.com/snippets/css/complete-guide-grid/).
!!!

The `Layout::Grid` and optional `Layout::Grid::Item` components provide a way to quickly build out flexible grid-based layouts of components or elements without needing to write a lot of custom CSS code or understand all the intricacies of CSS grid styles.

### Basic usage

!!! Info

**Code consideration**

There is no strict need to use the `Layout::Grid::Item` subcomponent as a direct child of `Layout::Grid`; use it only when necessary to tweak grid styles of an individual child item such as via the `@colspan/@rowspan` arguments (to avoid rendering an extra Ember component).

!!!

The simplest way to implement a grid layout is by using the `Layout::Grid` component to wrap content directly. A grid layout of equal width “columns” is created by default.

```handlebars
<Hds::Layout::Grid>
  <Doc::Placeholder @height="40px" @text="Item 1" @background="#e4c5f3" />
  <Doc::Placeholder @height="40px" @text="Item 2" @background="#e5ffd2" />
  <Doc::Placeholder @height="40px" @text="Item 3" @background="#d2f4ff" />
  <Doc::Placeholder @height="40px" @text="Item 4" @background="#fff8d2" />
</Hds::Layout::Grid>
```

Every child of the **grid container** will be stretched to fit evenly within the underlying grid column tracks behaving as a **grid item** (for details on what this means, refer to the guide linked at the top of the page).

In some cases, it may be necessary to wrap one or more content items within the optional `Layout::Grid::Item` component. i.e., to group content together within a column or row, prevent content from being stretched to fit the underlying grid column width, or to make use of `rowspan` and `colspan` options in order to create more complex layouts. (See below for more details and examples on these features.)

### Preventing content stretch

Wrap content in a `Grid::Item` to prevent it from stretching to fill the grid column.

```handlebars
<Hds::Layout::Grid @columnMinWidth="100%" @gap="16" as |LG|>
  <Hds::Badge @text="Stretched badge" @color="critical" />

  <LG.Item>
    <Hds::Badge @text="Non-stretched badge" @color="success" />
  </LG.Item>
</Hds::Layout::Grid>
```

### Tag

!!! Warning

**Accessibility alert**

While, by default, the component renders a `<div>`, we invite consumers to consider which semantic HTML tag is the correct one for the context in which the text is used to meet WCAG Success Criterion [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html) as the visual experience should match what is presented to the user with assistive technology.

!!!

To specify the HTML tag used to render the grid container and/or item(s), use the `@tag` argument.

```handlebars{data-execute=false}
<Hds::Layout::Grid @tag="ul" as |LG|>
  <li>{{! some content here }}</li>
  <LG.Item @tag="li">
    {{! some other content here }}
  </LG.Item>
  <li>{{! more content here }}</li>
</Hds::Layout::Grid>
```
### Spacing

!!! Warning

**Important**

The **pre-defined value(s)** passed to the `@gap` argument **must be string(s)**, not numbers!

!!!

To control the spacing between grid items, use the `@gap` argument.

Pass a single value to set equal spacing between columns & rows.

```handlebars
<Hds::Layout::Grid @columnMinWidth="50%" @gap="16">
  <Doc::Placeholder @height="40px" @text="Item 1" @background="#e4c5f3" />
  <Doc::Placeholder @height="40px" @text="Item 2" @background="#e5ffd2" />
  <Doc::Placeholder @height="40px" @text="Item 3" @background="#d2f4ff" />
  <Doc::Placeholder @height="40px" @text="Item 4" @background="#fff8d2" />
</Hds::Layout::Grid>
```

To differentiate the vertical and horizontal spacing between items when they wrap on multiple rows, provide an array of two values to the `@gap` argument.

```handlebars
<Hds::Layout::Grid @columnMinWidth="50%" @gap={{array "16" "48"}}>
  <Doc::Placeholder @height="40px" @text="Item 1" @background="#e4c5f3" />
  <Doc::Placeholder @height="40px" @text="Item 2" @background="#e5ffd2" />
  <Doc::Placeholder @height="40px" @text="Item 3" @background="#d2f4ff" />
  <Doc::Placeholder @height="40px" @text="Item 4" @background="#fff8d2" />
</Hds::Layout::Grid>
```

The first value in the array refers to the vertical gap between “rows” of items (`row-gap` in CSS), the second one to the horizontal spacing between “columns” of items (`column-gap` in CSS).

The `@gap` argument accepts only **pre-defined values**, it can’t be used to provide custom spacing values. Refer to the [Component API](#component-api) section for details on which values are accepted.

If you need to provide custom spacing values, see below how you can use a special escape hatch for this.

#### Non-standard gap values

If you absolutely have to use non-standard spacing value(s) for the grid `gap`, you can use the internal `--hds-layout-grid-row-gap` and `--hds-layout-grid-column-gap` CSS variables and pass custom values to them (e.g., via a local CSS variable or an inline style).

```handlebars{data-execute=false}
<Hds::Layout::Grid class="doc-grid-demo-custom-grid-column-gap">
  {{!
    // example of CSS code associated with the demo class:
    .doc-grid-demo-custom-grid-column-gap {
      --hds-layout-grid-column-gap: 13px;
    }
  }}
  {{!
    multiple grid items here, with a non-standard gap between them
  }}
</Hds::Layout::Grid>
```

In this case we’re overwriting only the “column” gap value via the custom CSS class.

If the grid items are wrapping on multiple lines, you have to overwrite both the “row” and “column” gap values.

```handlebars{data-execute=false}
<Hds::Layout::Grid
  {{style --hds-layout-grid-row-gap="10px" --hds-layout-grid-column-gap="0.625rem"}}
>
  {{!
    multiple grid items appearing on multiple rows
    with a vertical gap of 10px and a horizontal one of 0.625rem
  }}
</Hds::Layout::Grid>
```

## Column width management

There are two options for controlling the widths of columns within the `Grid`, `@columnMinWidth` and `@columnWidth`.

Using `@columnMinWidth` creates a semi-fluid layout. This means that if there are fewer items than fit in a single row, the columns will automatically adjust so that their combined widths add up to 100%.

If you instead want to create a more “fixed” layout, in which the column widths remain consistent no matter how few items are in a single row, use `@columnWidth` instead.

### Column min width

<!-- !!! Info

Using `@columnMinWidth` creates a semi-fluid layout. This means that if there are fewer items than fit in a single row, the columns will automatically adjust so that their combined widths add up to 100%.

If you instead want to create a more “fixed” layout, in which the column widths remain consistent no matter how few items are in a single row, use `@columnWidth` instead.

!!! -->

Specify a `columnMinWidth` size to exercise control over the maximum number of columns to occupy a row. If the total widths of the columns add up to more than 100% of the parent, they will automatically wrap to the next row as necessary to fit.

Note: The `gap` size will be automatically subtracted from the `columnMinWidth`, so take this into account when specifying a column min width.

#### Using percentage values

Column min-widths specified as a percentage value will maintain the same size ratio in all browser screen widths.

```handlebars
<Hds::Layout::Grid @columnMinWidth="33.33%" @gap="16">
  <Doc::Placeholder @height="40px" @text="Item 1" @background="#e4c5f3" />
  <Doc::Placeholder @height="40px" @text="Item 2" @background="#e5ffd2" />
  <Doc::Placeholder @height="40px" @text="Item 3" @background="#d2f4ff" />
  <Doc::Placeholder @height="40px" @text="Item 4" @background="#fff8d2" />
</Hds::Layout::Grid>
```

#### Semi-fluid width behavior

Column-width will automatically adjust to maintain a combined width of 100%.

```handlebars
<Hds::Text::Display>With 2 items</Hds::Text::Display>
<Hds::Layout::Grid @columnMinWidth="33.33%" @gap="16">
  <Doc::Placeholder @height="40px" @text="Item 1" @background="#e4c5f3" />
  <Doc::Placeholder @height="40px" @text="Item 2" @background="#e5ffd2" />
</Hds::Layout::Grid>

<hr />

<Hds::Text::Display>With 1 item</Hds::Text::Display>
<Hds::Layout::Grid @columnMinWidth="33.33%" @gap="16">
  <Doc::Placeholder @height="40px" @text="Item 1" @background="#e4c5f3" />
</Hds::Layout::Grid>
```

#### Using fixed unit values

Column min-widths specified using pixels or other fixed units, allows you to create layouts which are “automatically” responsive.

##### Grid within a wider view

Narrow your browser window to see the responsive behavior.

```handlebars
<Hds::Layout::Grid @columnMinWidth="160px" @gap="16">
  <Doc::Placeholder @height="40px" @text="Item 1" @background="#e4c5f3" />
  <Doc::Placeholder @height="40px" @text="Item 2" @background="#e5ffd2" />
  <Doc::Placeholder @height="40px" @text="Item 3" @background="#d2f4ff" />
  <Doc::Placeholder @height="40px" @text="Item 4" @background="#fff8d2" />
</Hds::Layout::Grid>
```

##### The same grid within a narrower view

At the specified column min width, columns are forced to stack in this narrower view.

```handlebars
<div class="doc-grid-mobile-view">
  <Hds::Layout::Grid @columnMinWidth="160px" @gap="16">
    <Doc::Placeholder @height="40px" @text="Item 1" @background="#e4c5f3" />
    <Doc::Placeholder @height="40px" @text="Item 2" @background="#e5ffd2" />
    <Doc::Placeholder @height="40px" @text="Item 3" @background="#d2f4ff" />
    <Doc::Placeholder @height="40px" @text="Item 4" @background="#fff8d2" />
  </Hds::Layout::Grid>
</div>
```

### Column width

To create column layouts that are more “fixed” vs. fluid, use `columnWidth` to specify a width for the columns.

```handlebars
<Hds::Text::Display>With 4 items</Hds::Text::Display>
<Hds::Layout::Grid @columnWidth="33.33%" @gap="16">
  <Doc::Placeholder @height="40px" @text="Item 1" @background="#e4c5f3" />
  <Doc::Placeholder @height="40px" @text="Item 2" @background="#e5ffd2" />
  <Doc::Placeholder @height="40px" @text="Item 3" @background="#d2f4ff" />
  <Doc::Placeholder @height="40px" @text="Item 4" @background="#fff8d2" />
</Hds::Layout::Grid>

<hr />

<Hds::Text::Display>With 2 items</Hds::Text::Display>
<Hds::Layout::Grid @columnWidth="33.33%" @gap="16">
  <Doc::Placeholder @height="40px" @text="Item 1" @background="#e4c5f3" />
  <Doc::Placeholder @height="40px" @text="Item 2" @background="#e5ffd2" />
</Hds::Layout::Grid>

<hr />

<Hds::Text::Display>With 1 item</Hds::Text::Display>
<Hds::Layout::Grid @columnWidth="33.33%" @gap="16">
  <Doc::Placeholder @height="40px" @text="Item 1" @background="#e4c5f3" />
</Hds::Layout::Grid>
```

### Responsive columns

!!! Info

We use a mobile-first layout approach, so widths defined for smaller views are inherited if not overridden by larger views. Therefore, it is not necessary to pass in values for all supported responsive views. However, if you do not pass in a value for the `sm` view, columns in this view and views inheriting from it will _never wrap_ as demonstrated in the [Basic usage example](/layouts/grid#basic-usage).

!!!

Optionally, you can pass in an object to the `columnWidth` argument defining responsive column widths for each of five supported views which are based on the [HDS breakpoint values](/foundations/breakpoints#the-ranges).

#### Supported responsive views

* `sm` view = mobile first approach (mobile devices)
* `md` view = 768px and above (tablets and small laptops)
* `lg` view = 1088px and above (large laptops and desktops)
* `xl` = 1440px and above (extra large desktops)
* `xxl` = 1920px and above (extra extra large desktops)

#### With all views defined

```handlebars
<Hds::Layout::Grid @columnWidth={{hash sm="100%" md="50%" lg="33.33%" xl="25%" xxl="20%"}} @gap="16">
  <Doc::Placeholder @height="40px" @text="Item 1" @background="#e4c5f3" />
  <Doc::Placeholder @height="40px" @text="Item 2" @background="#e5ffd2" />
  <Doc::Placeholder @height="40px" @text="Item 3" @background="#d2f4ff" />
  <Doc::Placeholder @height="40px" @text="Item 4" @background="#fff8d2" />
  <Doc::Placeholder @height="40px" @text="Item 5" @background="#f3d9c5" />
</Hds::Layout::Grid>
```

#### With only `sm` & `lg` views defined

```handlebars
<Hds::Layout::Grid @columnWidth={{hash sm="50%" lg="33.33%"}} @gap="16">
  <Doc::Placeholder @height="40px" @text="Item 1" @background="#e4c5f3" />
  <Doc::Placeholder @height="40px" @text="Item 2" @background="#e5ffd2" />
  <Doc::Placeholder @height="40px" @text="Item 3" @background="#d2f4ff" />
  <Doc::Placeholder @height="40px" @text="Item 4" @background="#fff8d2" />
  <Doc::Placeholder @height="40px" @text="Item 5" @background="#f3d9c5" />
</Hds::Layout::Grid>
```

### Align

Use the `@align` argument to align grid items to the "start", "end", "center" or "stretch" them within the grid parent.

Note: The `Grid` parent will need a height set for the effect to be visible.

```handlebars
<div class="doc-grid-mobile-view">
  <Hds::Layout::Grid @columnMinWidth="50px" @gap="16" @align="center" {{style height="100%"}}>
    <Doc::Placeholder @height="40px" @text="Item 1" @background="#e4c5f3" />
  <Doc::Placeholder @height="40px" @text="Item 2" @background="#e5ffd2" />
  <Doc::Placeholder @height="40px" @text="Item 3" @background="#d2f4ff" />
  <Doc::Placeholder @height="40px" @text="Item 4" @background="#fff8d2" />
  </Hds::Layout::Grid>
</div>
```

### Colspan & rowspan

Use the `colspan` and `rowspan` arguments of the `Grid::Item` component to set the number of columns or rows an item should occupy.

The following example has an underlying 4-column grid specified by setting a `columnMinWidth` of “25%”. It uses `colspan` and `rowspan` to create a flexible layout roughly resembling a typical web page layout.

Note: By default, if a height is set on the `Grid` parent, grid row heights will stretch proportionally to fill the `Grid`. To instead make a row conform to the minimum height of its content, you can pass an inline style as shown in the example.

```handlebars
<div {{style height="400px" border="1px solid"}}>
  <Hds::Layout::Grid 
    @columnMinWidth="25%" 
    @gap="12"
    {{style height="100%" grid-template-rows="min-content"}}
    as |LG|
  >
    <LG.Item @colspan={{4}}>
      <Doc::Placeholder @text="Item 1" @background="#e4c5f3" {{style padding="1em"}} />
    </LG.Item>

    <LG.Item @rowspan={{3}}>
      <Doc::Placeholder @height="100%" @text="Item 2" @background="#e5ffd2" />
    </LG.Item>

    <LG.Item @colspan={{3}}>
      <Doc::Placeholder @height="100%" @text="Item 3" @background="#d2f4ff" />
    </LG.Item>

    <LG.Item @colspan={{3}} @rowspan={{2}}>
      <Doc::Placeholder @height="100%" @text="Item 4" @background="#fff8d2" />
    </LG.Item>
  </Hds::Layout::Grid>
</div>
```

---

## Common layout patterns

!!! Warning

**Important**

The examples below are meant to show how one _could_ use the `Layout::Grid` component to implement certain common/standard UI patterns. They're **not** meant to be taken literally as they are and be used in production code. 

!!!

Below are examples of common layout patterns that can be achieved using the `Layout::Grid` component in combination with other HDS components.

### Card layouts

The following example makes use of nested `Grid` and [Flex](/layouts/flex) components to achieve its layout. This may be overkill in actual practice but demonstrates the possibilities for achieving layouts with just these layout components alone.

A responsive layout is used so that the cards stack in the smallest view while being laid out into three columns in all other views.

#### Basic 3-column layout

```handlebars
<Hds::Layout::Grid
  @columnWidth={{hash sm="100%" md="33.33%"}}
  @gap="32"
>
  <Hds::Card::Container @level="mid" @hasBorder={{true}} {{style padding="24px"}}>
    <Hds::Layout::Grid @columnMinWidth="100%" @gap="16">
      <Hds::Layout::Flex @align="center" @gap="8">
        <Hds::IconTile @icon="cloud" @size="small" />
        <Hds::Text::Display @tag="h2" @size="300">
          Active resources
        </Hds::Text::Display>
      </Hds::Layout::Flex>
      <Hds::Layout::Grid @columnMinWidth="100%" @gap="8" as |LG|>
          <LG.Item>
            <Hds::Badge
              @text="5 active resources"
              @color="success"
              @icon="check-circle"
            />
          </LG.Item>
          <Hds::Text::Body @tag="p">
            There are 5 active resources inside this project.
          </Hds::Text::Body>
      </Hds::Layout::Grid>
      <Hds::Link::Standalone
        @icon="arrow-right"
        @iconPosition="trailing"
        @text="View active resources"
        @href="#"
      />
    </Hds::Layout::Grid>
  </Hds::Card::Container>

  <Hds::Card::Container @level="mid" @hasBorder={{true}} {{style padding="24px"}}>
    <Hds::Text::Display @tag="h2" @size="300">Card #2</Hds::Text::Display>
  </Hds::Card::Container>

  <Hds::Card::Container @level="mid" @hasBorder={{true}} {{style padding="24px"}}>
    <Hds::Text::Display @tag="h2" @size="300">Card #3</Hds::Text::Display>
  </Hds::Card::Container>
</Hds::Layout::Grid>
```

#### More complex layout

Wrap content with a `Grid::Item` as needed to achieve more complex layouts.

##### How this layout works

We first establish an underlying grid structure of three columns by setting the `columnWidth` of the `Grid` parent to `33.33%`. The `@colspan` option of the `GridItem` children is then used to make some of them span two of the underlying grid columns creating a more complex layout.

```handlebars
<Hds::Layout::Grid @columnWidth="33.33%" @gap="24" as |LG|>
  <LG.Item @colspan={{2}}>
    <Hds::Card::Container @level="mid" @hasBorder={{true}} {{style padding="24px"}} {{style background="radial-gradient(151.34% 168.34% at 0 0,#f6f9ff 0,#ebf2ff 100%)" }}>
      <Hds::Layout::Grid @columnWidth="100%" @gap="16" as |LG|>
        <LG.Item>
          <Hds::Badge @text="In Preview" @type="outlined" @color="highlight" />
        </LG.Item>
        <Hds::Text::Display @tag="h2" @size="300" @weight="bold">Better together</Hds::Text::Display>

        <Hds::Text::Body @tag="p" @weight="semibold">
          HCP Terraform now works together with HCP Vault Secrets.
        </Hds::Text::Body>
        <Hds::Text::Body @tag="p">
          The combined solution enables your team to provision infrastructure with a scalable and least-privilege security approach for your secrets.
        </Hds::Text::Body>
      </Hds::Layout::Grid>
    </Hds::Card::Container>
  </LG.Item>

  <Hds::Card::Container @level="mid" @hasBorder={{true}} {{style padding="24px"}}>
    <Hds::Text::Display @tag="h2" @size="300">content</Hds::Text::Display>
  </Hds::Card::Container>

  <Hds::Card::Container @level="mid" @hasBorder={{true}} {{style padding="24px"}}>
    <Hds::Text::Display @tag="h2" @size="300">content</Hds::Text::Display>
  </Hds::Card::Container>

  <LG.Item @colspan={{2}}>
    <Hds::Card::Container @level="mid" @hasBorder={{true}} {{style padding="24px"}}>
      <Hds::Layout::Grid @columnMinWidth="100%" @gap="16">
        <Hds::Text::Display @tag="h2" @size="300">HCP Terraform Provider Resources</Hds::Text::Display>
        <Hds::Layout::Grid @columnMinWidth="50%" @gap="24" @tag="ul" class="doc-grid-plain-list">
          <Hds::Layout::Grid @columnMinWidth="100%" @gap="8" @tag="li">
            <Hds::Text::Body @tag="p" @weight="semibold">Deploy HCP Vault</Hds::Text::Body>
            <Hds::Text::Body @tag="p">
              Integrate HCP Vault into your environment faster.
            </Hds::Text::Body>
          </Hds::Layout::Grid>
          <Hds::Layout::Grid @columnMinWidth="100%" @gap="8" @tag="li">
            <Hds::Text::Body @tag="p" @weight="semibold">Deploy HCP Consul</Hds::Text::Body>
            <Hds::Text::Body @tag="p">
              Manage your provisions and snapshot.
            </Hds::Text::Body>
          </Hds::Layout::Grid>
        </Hds::Layout::Grid>
      </Hds::Layout::Grid>
    </Hds::Card::Container>
  </LG.Item>
</Hds::Layout::Grid>
```
