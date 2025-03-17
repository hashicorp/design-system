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

Align grid items to the "start", "end", "center" or "stretch" them within the grid parent.

Note: The `Grid` parent will need a height set for the affect to be visible.

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

The `Grid::Item` component can optionally be used to wrap `Grid` content if more control is needed over the grid layout.

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

---

## Common layout patterns

Below are examples of common layout patterns that can be achieved using the `Layout::Grid` component in combination with other HDS components.

!!! Warning

**Important**

The examples below are meant to show how one _could_ use the `Layout::Grid` component to implement certain common/standard UI patterns. They're **not** meant to be taken literally as they are and be used in production code. Also, some of these patterns are already implemented directly in HDS components that are ready to use.

!!!

### Card layouts

Note: The following example makes use of nested `Grid` and `Flex` components to achieve its layout. This may be overkill in actual practice but demonstrates the possibilities for achieving layouts with just these layout components alone.

#### Basic layout

**TODO: In HCP, mobile view shows only one column instead of 3, consider adding responsive layout feature to Grid**

```handlebars
<Hds::Layout::Grid @columnMinWidth="33.33%" @gap="32">
  <Hds::Card::Container @level="mid" @hasBorder={{true}} {{style padding="24px"}}>
    <Hds::Layout::Grid @columnMinWidth="100%" @gap="16">
      <Hds::Layout::Flex @align="center" @gap="8">
        <Hds::IconTile @icon="cloud" @size="small" />
        <Hds::Text::Display @tag="h2" @size="300">
          Active resources
        </Hds::Text::Display>
      </Hds::Layout::Flex>
      <Hds::Layout::Grid @columnMinWidth="100%" @gap="8">
          <Hds::Badge
            @text="5 active resources"
            @color="success"
            @icon="check-circle"
            @size="medium"
          />
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

#### Fancy layout

Wrap content with a `Grid::Item` as needed to achieve more complex layouts.

```handlebars
<Hds::Layout::Grid @columnMinWidth="33.33%" @gap="24" as |LG|>
  <LG.Item @colSpan="2">
    <Hds::Card::Container @level="mid" @hasBorder={{true}} {{style padding="24px"}} {{style background="radial-gradient(151.34% 168.34% at 0 0,#f6f9ff 0,#ebf2ff 100%)" }}>
      <Hds::Layout::Grid @columnMinWidth="100%" @gap="16">
        <div>
          <Hds::Badge @text="In Preview" @type="outlined" @color="highlight" />
          <Hds::Text::Display @tag="h2" @size="300" @weight="bold">Better together</Hds::Text::Display>
        </div>
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

  <LG.Item @colSpan="2">
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
