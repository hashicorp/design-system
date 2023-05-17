## How to use this component

### Table with no model defined

If you want to use the component but have no model defined (e.g., there are only a few pieces of data but it’s still tabular data), you can manually add each row, or use an `each` to loop over the data (e.g., an array of objects defined in the route) to render the rows.

#### Manual row implementation

```handlebars
<Hds::Table @caption="your custom, meaningful caption goes here">
  <:head as |H|>
    <H.Tr>
      <H.Th>Column Header One</H.Th>
      <H.Th>Column Header Two</H.Th>
      <H.Th>Column Header Three</H.Th>
    </H.Tr>
  </:head>
  <:body as |B|>
    <B.Tr>
      <B.Td>Cell one A</B.Td>
      <B.Td>Cell two A</B.Td>
      <B.Td>Cell three A</B.Td>
    </B.Tr>
    <B.Tr>
      <B.Td>Cell one B</B.Td>
      <B.Td>Cell two B</B.Td>
      <B.Td>Cell three B</B.Td>
    </B.Tr>
  </:body>
</Hds::Table>
```

#### Using `each` to loop over records to create rows

```handlebars
<Hds::Table @caption="Influential Folk Musicians">
  <:head as |H|>
    <H.Tr>
      <H.Th>Product</H.Th>
      <H.Th>Brand Color</H.Th>
      <H.Th>Uses Helios</H.Th>
    </H.Tr>
  </:head>
  <:body as |B|>
    {{#each this.myDataItems as |item|}}
      <B.Tr>
        <B.Td>{{item.product}}</B.Td>
        <B.Td>{{item.brandColor}}</B.Td>
        <B.Td>{{item.usesHelios}}</B.Td>
      </B.Tr>
    {{/each}}
  </:body>
</Hds::Table>
```

### Non-sortable table with model defined

To use a table with a model, first define the data model in your route or model:

```javascript
import Route from '@ember/routing/route';

export default class ComponentsTableRoute extends Route {
  async model() {
    // example of data retrieved:
    //[
    //  {
    //    id: '1',
    //    attributes: {
    //      artist: 'Nick Drake',
    //      album: 'Pink Moon',
    //      year: '1972'
    //    },
    //  },
    //  {
    //    id: '2',
    //    attributes: {
    //      artist: 'The Beatles',
    //      album: 'Abbey Road',
    //      year: '1969'
    //    },
    //  },
    // ...
    let response = await fetch('/api/demo.json');
    let { data } = await response.json();
    return { myDemoData: data };
  }
}
```

For documentation purposes, we’re imitating fetching data from an API and working with that as data model. Depending on your context and needs, you may want to manipulate and adapt the structure of your data to better suit your needs in the template code.

You can insert your own content into the `:body` block and the component will take care of looping over the `@model` provided:

```handlebars
<Hds::Table
  @model={{this.model.myDemoData}}
  @columns={{array (hash label="Artist") (hash label="Album") (hash label="Year")}}
>
  <:body as |B|>
    <B.Tr>
      <B.Td>{{B.data.artist}}</B.Td>
      <B.Td>{{B.data.album}}</B.Td>
      <B.Td>{{B.data.year}}</B.Td>
    </B.Tr>
  </:body>
</Hds::Table>
```

!!! Info

**Important**

For clarity, there are a couple of important points to note here:

- provide a `@columns` argument (see [Component API](#component-api) for details about its shape)
- use the `.data` key to access the `@model` record content (it’s yielded as `data`)

!!!

### Sortable Table

!!! Info

This component takes advantage of the `sort-by` helper provided by [ember-composable-helpers](https://github.com/DockYard/ember-composable-helpers).

!!!

Add `isSortable=true` to the hash for each column that should be sortable.

```handlebars
<Hds::Table
  @model={{this.model.myDemoData}}
  @columns={{array
    (hash key="artist" label="Artist" isSortable=true)
    (hash key="album" label="Album" isSortable=true)
    (hash key="year" label="Release Year")
  }}
>
  <:body as |B|>
    <B.Tr>
      <B.Td>{{B.data.artist}}</B.Td>
      <B.Td>{{B.data.album}}</B.Td>
      <B.Td>{{B.data.year}}</B.Td>
    </B.Tr>
  </:body>
</Hds::Table>
```

#### Pre-sorting columns

To indicate that a specific column should be pre-sorted, add `@sortBy`, where the value is the column's key.

```handlebars
<Hds::Table
  @model={{this.model.myDemoData}}
  @columns={{array
    (hash key="artist" label="Artist" isSortable=true)
    (hash key="album" label="Album" isSortable=true)
    (hash key="year" label="Release Year")
  }}
  @sortBy="artist"
>
  <:body as |B|>
    <B.Tr>
      <B.Td>{{B.data.artist}}</B.Td>
      <B.Td>{{B.data.album}}</B.Td>
      <B.Td>{{B.data.year}}</B.Td>
    </B.Tr>
  </:body>
</Hds::Table>
```

##### Pre-sorting direction

By default, the sort order is set to ascending. To indicate that the column defined in `@sortBy` should be pre-sorted in descending order, pass in `@sortOrder="desc"`.

```handlebars
<Hds::Table
  @model={{this.model.myDemoData}}
  @columns={{array
    (hash key="artist" label="Artist" isSortable=true)
    (hash key="album" label="Album" isSortable=true)
    (hash key="year" label="Release Year")
  }}
  @sortBy="artist"
  @sortOrder="desc"
>
  <:body as |B|>
    <B.Tr>
      <B.Td>{{B.data.artist}}</B.Td>
      <B.Td>{{B.data.album}}</B.Td>
      <B.Td>{{B.data.year}}</B.Td>
    </B.Tr>
  </:body>
</Hds::Table>
```

#### Custom sort callback

To implement a custom sort callback on a column:

1. add a custom function as the value for `sortingFunction` in the column hash,
2. include a custom `onSort` action in your table invocation to track the sorting order and use it in the custom sorting function.

This is useful for cases where the key might not be A-Z or 0-9 sortable by default, e.g., status, and you’re otherwise unable to influence the shape of the data in the model.

_The code has been truncated for clarity._

```handlebars{data-execute=false}
<Hds::Table
  @model={{this.model.myDemoData}}
  @columns={{array
      (hash
        key='status'
        label='Status'
        isSortable=true
        sortingFunction=this.myCustomSortingFunction
      )
      (hash key='album' label='Album')
      (hash key='year' label='Year')
    }}
  @onSort={{this.myCustomOnSort}}
>
  <!-- <:body> here -->
</Hds::Table>
```

Here’s an example of what a custom sort function could look like. In this example, we are indicating that we want to sort on a status, which takes its order based on the position in the array:

```javascript
// we use an array to declare the custom sorting order for the "status" column
const customSortingCriteriaArray = [
  'failing',
  'active',
  'establishing',
  'pending',
];

// we track the sorting order, so it can be used in the custom sorting function
@tracked customSortOrderForStatus = 'asc';


// we define a "getter" that returns a custom sorting function ("s1" and "s2" are data records)
get customSortingMethodForStatus() {
  return (s1, s2) => {
    const index1 = customSortingCriteriaArray.indexOf(s1['status']);
    const index2 = customSortingCriteriaArray.indexOf(s2['status']);
    if (index1 < index2) {
      return this.customSortOrderForStatus === 'asc' ? -1 : 1;
    } else if (index1 > index2) {
      return this.customSortOrderForStatus === 'asc' ? 1 : -1;
    } else {
      return 0;
    }
  };
}

// we define a callback function that listens to the `onSort` event in the table,
// and updates the tracked sort order values accordingly
@action
customOnSort(_sortBy, sortOrder) {
  this.customSortOrderForStatus = sortOrder;
}
```

### Density

To create a condensed or spacious table, add `@density` to the table's invocation. Note that it only affects the table body, not the table header.

```handlebars
<Hds::Table
  @model={{this.model.myDemoData}}
  @columns={{array
    (hash key="artist" label="Artist" isSortable=true)
    (hash key="album" label="Album" isSortable=true)
    (hash key="year" label="Release Year")
  }}
  @density="short"
>
  <:body as |B|>
    <B.Tr>
      <B.Td>{{B.data.artist}}</B.Td>
      <B.Td>{{B.data.album}}</B.Td>
      <B.Td>{{B.data.year}}</B.Td>
    </B.Tr>
  </:body>
</Hds::Table>
```

### Alignment

#### Vertical alignment

To indicate that the table's content should have a middle vertical-align, use `@valign` in the table's invocation.

```handlebars
<Hds::Table
  @model={{this.model.myDemoData}}
  @columns={{array
    (hash key="artist" label="Artist" isSortable=true)
    (hash key="album" label="Album" isSortable=true)
    (hash key="year" label="Release Year")
  }}
  @valign="middle"
>
  <:body as |B|>
    <B.Tr>
      <B.Td>{{B.data.artist}}</B.Td>
      <B.Td>{{B.data.album}}</B.Td>
      <B.Td>{{B.data.year}}</B.Td>
    </B.Tr>
  </:body>
</Hds::Table>
```

#### Vertical alignment with additional cell content

!!! Info

Note that vertical-align only applies to inline, inline-block and table-cell elements: you can't use it to vertically align block-level elements ([see MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/vertical-align)).

If you have more than just text content in the table cell, you'll want to wrap that content in a flex box and style accordingly.

!!!

```handlebars
<Hds::Table
  @model={{this.model.myDemoData}}
  @columns={{array
    (hash key="artist" label="Artist" isSortable=true)
    (hash key="album" label="Album" isSortable=true)
    (hash key="year" label="Release Year")
  }}
  @valign="middle"
>
  <:body as |B|>
    <B.Tr>
      <B.Td>
        <div class="doc-table-valign-demo">
          <FlightIcon @name="headphones" /> {{B.data.artist}}
        </div>
      </B.Td>
      <B.Td>{{B.data.album}}</B.Td>
      <B.Td>{{B.data.year}}</B.Td>
    </B.Tr>
  </:body>
</Hds::Table>
```

#### Horizontal alignment

To create a column that has right-aligned content, set `@align` to `right` on both the column's header and cell (the cell's horizontal content alignment should be the same as the column's horizontal content alignment).

```handlebars
<Hds::Table
  @model={{this.model.myDemoData}}
  @columns={{array
    (hash key="artist" label="Artist" isSortable=true)
    (hash key="album" label="Album" isSortable=true)
    (hash label="Actions" align="right")
  }}
>
  <:body as |B|>
    <B.Tr>
      <B.Td>{{B.data.artist}}</B.Td>
      <B.Td>{{B.data.album}}</B.Td>
      <B.Td @align="right">
        <Hds::Dropdown @isInline={{true}} as |dd|>
          <dd.ToggleIcon @icon="more-horizontal" @text="Overflow Options" @hasChevron={{false}} @size="small" />
          <dd.Interactive @route="components" @text="Create" />
          <dd.Interactive @route="components" @text="Read" />
          <dd.Interactive @route="components" @text="Update" />
          <dd.Separator />
          <dd.Interactive @route="components" @text="Delete" @color="critical" @icon="trash" />
        </Hds::Dropdown>
      </B.Td>
    </B.Tr>
  </:body>
</Hds::Table>
```

### More examples

#### Internationalized column headers, overflow menu dropdown

Here’s a table implementation that uses an array hash with localized strings for the column headers, indicates which columns should be sortable, and adds an overflow menu.

```handlebars{data-execute=false}
<Hds::Table
  @model={{this.model.myDemoData}}
  @columns={{array
      (hash key='artist' label=(t 'components.table.headers.artist') isSortable=true)
      (hash key='album' label=(t 'components.table.headers.album') isSortable=true)
      (hash key='year' label=(t 'components.table.headers.year') isSortable=true)
      (hash key='other' label=(t 'global.titles.other'))
    }}
>
  <:body as |B|>
    <B.Tr>
      <B.Td>{{B.data.artist}}</B.Td>
      <B.Td>{{B.data.album}}</B.Td>
      <B.Td>{{B.data.year}}</B.Td>
      <B.Td>
          <Hds::Dropdown as |dd|>
            <dd.ToggleIcon
              @icon='more-horizontal'
              @text='Overflow Options'
              @hasChevron={{false}}
              @size='small'
            />
            <dd.Interactive @route='components.table' @text='Create' />
            <dd.Interactive @route='components.table' @text='Read' />
            <dd.Interactive @route='components.table' @text='Update' />
            <dd.Separator />
            <dd.Interactive
              @route='components.table'
              @text='Delete'
              @color='critical'
              @icon='trash'
            />
          </Hds::Dropdown>
        </B.Td>
    </B.Tr>
  </:body>
</Hds::Table>
```
