## How to use this component

!!! Insight

While it’s not necessary to be familiar with CSS3 grid specifications to use this component, some knowledge may be helpful in achieving more complex layouts.

A helpful reference with clear examples: [CSS Tricks: Complete grid layout guide](https://css-tricks.com/snippets/css/complete-guide-grid/).

!!!

The `Layout::Grid` and optional `Layout::Grid::Item` components provide a way to quickly build out flexible grid-based layouts of components or elements without needing to write a lot of custom CSS code or understand all the intricacies of CSS grid styles.

### Basic usage

The parent `Grid` component creates a layout of equal width “columns” by default. Other components and HTML elements can be passed in directly.

```handlebars
<Hds::Layout::Grid class="doc-grid-outline-children">
  <Doc::Placeholder @height="40px" @text="Item 1" @background="#e4e4e4" />
  <Doc::Placeholder @height="40px" @text="Item 2" @background="#e4e4e4" />
  <Doc::Placeholder @height="40px" @text="Item 3" @background="#e4e4e4" />
  <Doc::Placeholder @height="40px" @text="Item 4" @background="#e4e4e4" />
</Hds::Layout::Grid>
```

### Tag

To specify the HTML tag used to render the grid container and/or item(s), use the `@tag` argument:

```handlebars{data-execute=false}
<Hds::Layout::Grid @tag="ul" as |LG|>
  <li>{{! some content here }}</li>
  <LG.Item @tag="li">
    {{! some other content here }}
  </LG.Item>
  <li>{{! more content here }}</li>
</Hds::Layout::Grid>
```

### Gap

Specify either a single gap size or an array of 2 row and column gap size values to space apart items.

```handlebars
<Hds::Layout::Grid @gap="16">
  <Doc::Placeholder @height="40px" @text="Item 1" @background="#e4e4e4" />
  <Doc::Placeholder @height="40px" @text="Item 2" @background="#e4e4e4" />
  <Doc::Placeholder @height="40px" @text="Item 3" @background="#e4e4e4" />
  <Doc::Placeholder @height="40px" @text="Item 4" @background="#e4e4e4" />
</Hds::Layout::Grid>
```

### Column min width

Specify a `columnMinWidth` size to exercise control over how many columns occupy a row. If the total widths of the columns add up to more than 100% of the parent they will automatically wrap to the next row as necessary to fit.

Note: The `gap` size will be subtracted from the `columnMinWidth`, so take this into account when specifying a column min width.

#### Using percentage values

Column min-widths specified as a percentage value will maintain the same size ratio in all browser screen widths.

```handlebars
<Hds::Layout::Grid @columnMinWidth="33.33%" @gap="16">
  <Doc::Placeholder @height="40px" @text="Item 1" @background="#e4e4e4" />
  <Doc::Placeholder @height="40px" @text="Item 2" @background="#e4e4e4" />
  <Doc::Placeholder @height="40px" @text="Item 3" @background="#e4e4e4" />
  <Doc::Placeholder @height="40px" @text="Item 4" @background="#e4e4e4" />
</Hds::Layout::Grid>
```

#### Using fixed values

Column min-widths specified using pixels or other fixed units, allows you to create layouts which are “automatically” responsive.

##### Grid within a wider view

Narrow your browser window to see the responsive behavior.

```handlebars
<Hds::Layout::Grid @columnMinWidth="160px" @gap="16">
  <Doc::Placeholder @height="40px" @text="Item 1" @background="#e4e4e4" />
  <Doc::Placeholder @height="40px" @text="Item 2" @background="#e4e4e4" />
  <Doc::Placeholder @height="40px" @text="Item 3" @background="#e4e4e4" />
  <Doc::Placeholder @height="40px" @text="Item 4" @background="#e4e4e4" />
</Hds::Layout::Grid>
```

##### The same grid within a narrower view

At the specified column min width, columns are forced to stack in this narrower view.

```handlebars
<div class="doc-grid-iphone-se-view">
  <Hds::Layout::Grid @columnMinWidth="160px" @gap="16">
    <Doc::Placeholder @height="40px" @text="Item 1" @background="#e4e4e4" />
    <Doc::Placeholder @height="40px" @text="Item 2" @background="#e4e4e4" />
    <Doc::Placeholder @height="40px" @text="Item 3" @background="#e4e4e4" />
    <Doc::Placeholder @height="40px" @text="Item 4" @background="#e4e4e4" />
  </Hds::Layout::Grid>
</div>
```

### Align

**TODO: This feature is confusing & needs more thought/experimentation**

Align grid items to the "start", "end", "center" or "stretch" them within the grid parent.

```handlebars
<div class="doc-grid-iphone-se-view">
  <Hds::Layout::Grid @columnMinWidth="50px" @gap="16" @align="center" {{style height="100%"}}>
    <Doc::Placeholder @height="40px" @text="Item 1" @background="#e4e4e4" />
    <Doc::Placeholder @height="40px" @text="Item 2" @background="#e4e4e4" />
    <Doc::Placeholder @height="40px" @text="Item 3" @background="#e4e4e4" />
    <Doc::Placeholder @height="40px" @text="Item 4" @background="#e4e4e4" />
  </Hds::Layout::Grid>
</div>
```

### isInline

To change the default display from `grid` to `inline-grid`, set `@isInline` to `true`.

```handlebars
Text before the inline grid.
<Hds::Layout::Grid  @isInline={{true}} @tag="span" @gap="8">
  <Doc::Placeholder @height="1.2em" @text="Item 1" @background="#e4e4e4" />
  <Doc::Placeholder @height="1.2em" @text="Item 2" @background="#e4e4e4" />
  <Doc::Placeholder @height="1.2em" @text="Item 3" @background="#e4e4e4" />
  <Doc::Placeholder @height="1.2sem" @text="Item 4" @background="#e4e4e4" />
</Hds::Layout::Grid>
Text after the inline grid.
```

### Grid::Item

For more control over the resulting grid layout, use `Grid::Item` child components to wrap `Grid` content.

### colSpan & rowSpan

Use the `colSpan` and `rowSpan` options of `Grid::Item` components to set the number of columns or rows an item should occupy.

**TODO: Experiment with grid-template-rows="min-content", perhaps it should be added by default or an option should be added**

```handlebars
<div {{style height="400px" border="1px solid"}}>
  <Hds::Layout::Grid @columnMinWidth="25%" @gap="12" {{style height="100%" grid-template-rows="min-content"}} as |LG|>
    <LG.Item @colSpan="4">
      <Doc::Placeholder @height="100%" @text="Item 1" @background="#e4e4e4" {{style padding="1em"}} />
    </LG.Item>

    <LG.Item @rowSpan="2">
      <Doc::Placeholder @height="100%" @text="Item 2" @background="#e4e4e4" />
    </LG.Item>

    <LG.Item @colSpan="3" @rowSpan="2">
      <Doc::Placeholder @height="100%" @text="Item 3" @background="#e4e4e4" />
    </LG.Item>
  </Hds::Layout::Grid>
</div>
```
