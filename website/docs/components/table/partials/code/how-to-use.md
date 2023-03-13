## How to use this component

!!! Info

This component takes advantage of the `sort-by` helper provided by [ember-composable-helpers](https://github.com/DockYard/ember-composable-helpers).

!!!

### Table with no model defined

```handlebars{data-execute=false}
<Hds::Table @caption="your custom, meaningful caption goes here">
  <:head as |H|>
    <H.Tr>
      <H.Th>Column Header</H.Th>
      <H.Th>Column Header</H.Th>
      <H.Th>Column Header</H.Th>
    </H.Tr>
  </:head>
  <:body as |B|>
    <B.Tr>
      <B.Td>Cell Content</B.Td>
      <B.Td>Cell Content</B.Td>
      <B.Td>Cell Content</B.Td>
    </B.Tr>
  </:body>
</Hds::Table>
```

### Non-sortable table with model defined

To use a table with a model, first of all you need to define the data model (in your route or model):

```javascript
import Route from '@ember/routing/route';

export default class ComponentsTableRoute extends Route {
  async model() {
    // example of data retrieved:
    // [
    //   {
    //     "id": 1,
    //     "name": "Burnaby Kuscha",
    //     "email": "1_bkuscha0@tiny.cc",
    //     "role": "Owner"
    //   },
    //   {
    //     "id": 2,
    //     "name": "Barton Penley",
    //     "email": "2_bpenley1@miibeian.gov.cn",
    //     "role": "Admin"
    //   },
    //   ...
    let response = await fetch('/api/demo.json');
    let { data } = await response.json();
    return { myDemoData: data };
  }
}
```

For documentation purposes, we’re imitating fetching data from an API and working with that as data model. Depending on your context and needs, you may want to manipulate and adapt the structure of your data to better suit your needs in the template code.

You can insert your own content into the and `:body` block and the component will take care of looping over the `@model` provided:

```handlebars{data-execute=false}
<Hds::Table
  @model={{this.model.myDemoData}}
  @columns={{array (hash label="Name") (hash label="Email") (hash label="Role")}}
>
  <:body as |B|>
    <B.Tr>
      <B.Td>{{B.data.name}}</B.Td>
      <B.Td>{{B.data.email}}</B.Td>
      <B.Td>{{B.data.role}}</B.Td>
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

Add `isSortable=true` to the hash for each column that should be sortable.

```handlebars{data-execute=false}
<Hds::Table
  @model={{this.model.data}}
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

You can optionally indicate that a specific column should be pre-sorted by adding `@sortBy` where the value is the key of the column.

```handlebars{data-execute=false}
<Hds::Table
  @model={{this.model.data}}
  @columns={{array
    (hash key="artist" label="Artist" isSortable=true)
    (hash key="album" label="Album" isSortable=true)
    (hash key="year" label="Release Year")
  }}
  @sortBy='artist'
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

You can optionally also indicate that the column defined in `@sortBy` should be pre-sorted in a descending order, rather than the default ascending order by passing in `@sortOrder='desc'`.

```handlebars{data-execute=false}
<Hds::Table
  @model={{this.model.data}}
  @columns={{array
    (hash key="artist" label="Artist" isSortable=true)
    (hash key="album" label="Album" isSortable=true)
    (hash key="year" label="Release Year")
  }}
  @sortBy='artist'
  @sortOrder='desc'
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

To implement a custom sort callback on a columns, (1) add a custom function as the value for `sortingFunction` in the column hash, and (2) include a custom `onSort` action in your table invocation to track the sorting order and use it in the custom sorting function. This is useful for cases where the key might not be A-Z or 0-9 sortable by default, i.e., status, and you’re otherwise unable to influence the shape of the data in the model. Here is an example, code truncated for clarity:

```handlebars{data-execute=false}
<Hds::Table
  @model={{this.model.data}}
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

// we define a callback function that listens to the `onSort` event in the table, and updates the tracked sort order values accordingly
@action
customOnSort(_sortBy, sortOrder) {
  this.customSortOrderForStatus = sortOrder;
}
```

### Density

To create a condensed or spacious table, add `@density` to the table's invocation. Note that it only affects the table body, not the table header.

```handlebars{data-execute=false}
<Hds::Table
  @model={{this.model.data}}
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

#### Vertical Alignment

To indicate that the table's content should have a middle vertical-align, use `@valign` in the table's invocation.

!!! Info

Note that vertical-align only applies to inline, inline-block and table-cell elements: you can't use it to vertically align block-level elements ([see MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/vertical-align)).

If you have more than just text content in the table cell, you'll want to wrap that content in a flex box and style accordingly.

!!!

```handlebars{data-execute=false}
<Hds::Table
  @model={{this.model.data}}
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

#### Text Alignment

To create a column that has right-aligned content, set `@align` to `right` on both the column's header and cell.

```handlebars{data-execute=false}
<Hds::Table
  @model={{this.model.data}}
  @columns={{array
    (hash key="artist" label="Artist" isSortable=true)
    (hash key="album" label="Album" isSortable=true)
    (hash key="year" label="Release Year" align=right)
  }}
>
  <:body as |B|>
    <B.Tr>
      <B.Td>{{B.data.artist}}</B.Td>
      <B.Td>{{B.data.album}}</B.Td>
      <B.Td @align="right">{{B.data.year}}</B.Td>
    </B.Tr>
  </:body>
</Hds::Table>
```

### More Examples

#### Internationalized column headers, overflow menu dropdown

Here’s a table implementation that uses an array hash with localized strings for the column headers, indicates which columns should be sortable, and adds an overflow menu.

```handlebars{data-execute=false}
<Hds::Table
  @model={{this.model.data}}
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
