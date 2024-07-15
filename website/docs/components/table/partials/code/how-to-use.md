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
<Hds::Table @caption="Products that use Helios">
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

### Non-sortable Table with model defined

To use a Table with a model, first define the data model in your route or model:

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

### Sortable table

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

To indicate that a specific column should be pre-sorted, add `@sortBy`, where the value is the column’s key.

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
2. include a custom `onSort` action in your Table invocation to track the sorting order and use it in the custom sorting function.

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

#### Custom sorting using the yielded sorting arguments/functions

!!! Warning

This is a pretty advanced example, intended to cover some edge cases that we encountered. We strongly suggest using one of the sorting methods described above, or speaking with the [Design Systems Team](/about/support) before using this approach to make sure there are no better alternatives.

!!!


The `Hds::Table` exposes (via yielding) some of its internal properties and methods, to allow extremely customized sorting functionalities:

- `setSortBy` is the internal function used to set the `sortBy` and `sortOrder` tracked values
- `sortBy` is the "key" of the column used for sorting (when the table is sorted)
- `sortOrder` is the sorting direction (ascending or descending)

For more details about these properties refer to the [Component API](#component-api) section below.

Below you can see an example of a Table that renders a list of clusters, in which the sorting is based on a custom function that depends on the sorting column (`sortBy`) and direction (`sortOrder`):

_The code has been simplified for clarity._

```handlebars{data-execute=false}
<Hds::Table>
  <:head as |H|>
    <H.Tr>
      <H.ThSort @onClickSort={{fn H.setSortBy "peer-name"}} @sortOrder={{if (eq "peer-name" H.sortBy) H.sortOrder}}>Peer Name</H.ThSort>
      <H.ThSort @onClickSort={{fn H.setSortBy "status"}} @sortOrder={{if (eq "status" H.sortBy) H.sortOrder}}>Status</H.ThSort>
      <H.ThSort @onClickSort={{fn H.setSortBy "partition"}} @sortOrder={{if (eq "partition" H.sortBy) H.sortOrder}}>Partition</H.ThSort>
      <H.Th>Description</H.Th>
    </H.Tr>
  </:head>
  <:body as |B|>
    {{#each (call (fn this.myDemoCustomSortingFunction B.sortBy B.sortOrder)) as |cluster|}}
      <B.Tr>
        <B.Td>{{cluster.peer-name}}</B.Td>
        <B.Td><ClusterStatusBadge @status={{cluster.status}} /></B.Td>
        <B.Td>{{cluster.cluster-partition}}</B.Td>
        <B.Td>{{cluster.description}}</B.Td>
      </B.Tr>
    {{/each}}
  </:body>
</Hds::Table>
```

In the `<:head>` the `setSortBy` function is invoked when the `<ThSort>` element is clicked to set the values of `sortBy` and `sortOrder` in the table; in turn these values are then used by the `<ThSort>` element to assign the sorting icon via the `@sortOrder` argument.

In the `<:body>` the values of `sortBy` and `sortOrder` are provided instead as arguments to a consumer-side function that takes care of custom sorting the model/data.

_Notice: in this case for the example we're using the [`call` helper](https://github.com/DockYard/ember-composable-helpers#call) from [ember-composable-helpers](https://github.com/DockYard/ember-composable-helpers)._

The sorting function in the backing class code will look something like this (the actual implementation will depend on the consumer-side/business-logic context):

_The code has been simplified for clarity._

```javascript
myDemoCustomSortingFunction = (sortBy, sortOrder) => {
  // here goes the logic for the custom sorting of the `model` or `data` array
  // based on the `sortBy/sortOrder` arguments
  if (sortBy === 'peer-name') {
    myDemoDataArray.sort((s1, s2) => {
      // logic for sorting by `peer-name` goes here
    });
  } else if (sortBy === 'status') {
    myDemoDataArray.sort((s1, s2) => {
      // logic for sorting by `status` goes here
    });
  //
  // same for all the other conditions/columns
  // ...
  }
  return myDemoDataArray;
};

```

### Density

To create a condensed or spacious Table, add `@density` to the Table’s invocation. Note that it only affects the Table body, not the Table header.

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

To indicate that the table’s content should have a middle vertical-align, use `@valign` in the table’s invocation.

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

Note that vertical-align only applies to inline, inline-block and table-cell elements: you can’t use it to vertically align block-level elements ([see MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/vertical-align)).

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

To create a column that has right-aligned content, set `@align` to `right` on both the column’s header and cell (the cell’s horizontal content alignment should be the same as the column’s horizontal content alignment).

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

### Tooltip

[Table headers](/components/table#headers) should be clear, concise, and straightforward whenever possible. However, there could be cases where the label is insufficient by itself and extra information is required. In this case, it’s possible to show a tooltip next to the label in the header:

```handlebars
<Hds::Table
  @model={{this.model.myDemoData}}
  @columns={{array
    (hash key="artist" label="Artist")
    (hash key="album" label="Album" tooltip="Title of the album (in its first release)")
    (hash key="vinyl-cost" label="Vinyl Cost (USD)" isSortable=true tooltip="Cost of the vinyl (adjusted for inflation)" align="right")
  }}
>
  <:body as |B|>
    <B.Tr>
      <B.Td>{{B.data.artist}}</B.Td>
      <B.Td>{{B.data.album}}</B.Td>
      <B.Td @align="right">{{B.data.vinyl-cost}}</B.Td>
    </B.Tr>
  </:body>
</Hds::Table>
```

### Scrollable table

Consuming a large amount of data in a tabular format can lead to an intense cognitive load for the user. As a general principle, care should be taken to simplify the information within a table as much as possible.

We recommend using functionalities like [pagination](/components/pagination), [sorting](/components/table?tab=code#sortable-table), and [filtering](/patterns/filter-patterns) to reduce this load.

That said, there may be cases when it’s necessary to show a table with a large number of columns and allow the user to scroll horizontally. In this case the consumer can use different approaches, depending on their context, needs and design specs.

Below we show a couple of examples of how a scrollable table could be implemented: use them as starting point (your mileage may vary).

#### Using a container with `overflow: auto`

In most cases, wrapping the table with a container that has `overflow: auto` does the trick.

The default table layout is `auto` which means the browser will try to optimize the width of the columns to fit their different content. In some cases, this will mean the content may wrap (see the `Phone` column as an example) in which case you may want to apply a `width` to [suggest to the browser](https://www.w3.org/TR/WD-CSS2-971104/tables.html#h-17.2) to apply a specific width to a column (see the `Biography` column).


```handlebars
<!-- this is an element with "overflow: auto" -->
<div class="doc-table-scrollable-wrapper">
  <Hds::Table
    @model={{this.demoDataWithLargeNumberOfColumns}}
    @columns={{array
      (hash key="first_name" label="First Name" isSortable=true)
      (hash key="last_name" label="Last Name" isSortable=true)
      (hash key="age" label="Age" isSortable=true)
      (hash key="email" label="Email")
      (hash key="phone" label="Phone")
      (hash key="bio" label="Biography" width="350px")
      (hash key="education" label="Education Degree")
      (hash key="occupation" label="Occupation")
    }}
  >
    <:body as |B|>
      <B.Tr>
        <B.Td>{{B.data.first_name}}</B.Td>
        <B.Td>{{B.data.last_name}}</B.Td>
        <B.Td>{{B.data.age}}</B.Td>
        <B.Td>{{B.data.email}}</B.Td>
        <B.Td>{{B.data.phone}}</B.Td>
        <B.Td>{{B.data.bio}}</B.Td>
        <B.Td>{{B.data.education}}</B.Td>
        <B.Td>{{B.data.occupation}}</B.Td>
      </B.Tr>
    </:body>
  </Hds::Table>
</div>
```

#### Using a container with `overflow: auto` and a sub-container with `width: max-content`

If you have specified the width of some of the columns, leaving the others to adapt to their content automatically, and you want to avoid the wrapping of content within the cells, you need to introduce a secondary wrapping element around the table with its `width` set to ` max-content`.

In this case the table layout is still set to `auto` (default). If instead you want to set it to `fixed` (using the `@isFixedLayout` argument) you will have to specify the width for **every** column or the table will explode horizontally.


```handlebars
<!-- this is an element with "overflow: auto" -->
<div class="doc-table-scrollable-wrapper">
  <!-- this is an element with "width: max-content" -->
  <div class="doc-table-max-content-width">
    <Hds::Table
      @model={{this.demoDataWithLargeNumberOfColumns}}
      @columns={{array
        (hash key="first_name" label="First Name" isSortable=true width="200px")
        (hash key="last_name" label="Last Name" isSortable=true width="200px")
        (hash key="age" label="Age" isSortable=true)
        (hash key="email" label="Email")
        (hash key="phone" label="Phone")
        (hash key="bio" label="Biography" width="350px")
        (hash key="education" label="Education Degree")
        (hash key="occupation" label="Occupation")
      }}
    >
      <:body as |B|>
        <B.Tr>
          <B.Td>{{B.data.first_name}}</B.Td>
          <B.Td>{{B.data.last_name}}</B.Td>
          <B.Td>{{B.data.age}}</B.Td>
          <B.Td>{{B.data.email}}</B.Td>
          <B.Td>{{B.data.phone}}</B.Td>
          <B.Td>{{B.data.bio}}</B.Td>
          <B.Td>{{B.data.education}}</B.Td>
          <B.Td>{{B.data.occupation}}</B.Td>
        </B.Tr>
      </:body>
    </Hds::Table>
  </div>
</div>
```

### Multi-select table

A multi-select table includes checkboxes enabling users to select multiple rows in a table for purposes of performing bulk operations. Checking or unchecking the checkbox in the table header either selects or deselects the checkboxes on each row in the table body. Individual checkboxes in the rows can also be selected or deselected.

Add `isSelectable=true` to create a multi-select table. The `onSelectionChange` argument can be used to pass a callback function to receive selection keys when the selected table rows change. You must also pass a `selectionKey` to each row which gets passed back through the `onSelectionChange` callback which maps the row selection on the table to an item in your data model.

#### Multi-select table using a model

This is a simple example of a table with multi-selection. Notice the `@selectionKey` argument provided to the rows, used by the `@onSelectionChange` callback to provide the list of selected/deselected rows as argument(s) for the invoked function:

```handlebars
<Hds::Table
  @isSelectable={{true}}
  @onSelectionChange={{this.demoOnSelectionChange}}
  @model={{this.model.myDemoData}}
  @columns={{array
    (hash key="artist" label="Artist")
    (hash key="album" label="Album")
    (hash key="year" label="Year")
  }}
>
  <:body as |B|>
    <B.Tr @selectionKey={{B.data.id}} @selectionAriaLabelSuffix="row {{B.data.artist}} / {{B.data.album}}">
      <B.Td>{{B.data.artist}}</B.Td>
      <B.Td>{{B.data.album}}</B.Td>
      <B.Td>{{B.data.year}}</B.Td>
    </B.Tr>
  </:body>
</Hds::Table>
```

!!! Warning

**Important**

To make the table correctly accessible, each checkbox used for the selection needs to have a distinct `aria-label`. For this reason, you need to provide a `@selectionAriaLabelSuffix` value (possibly unique) to the rows in the table’s `tbody`.

!!!

Here’s an example of what a `@onSelectionChange` callback function could look like.

```javascript
@action
demoOnSelectionChange({
  selectionKey, // the `selectionKey` value for the selected row or "all" if the "select all" has been toggled
  selectionCheckboxElement, // the checkbox DOM element toggled by the user
  selectableRowsStates, // an array of objects describing each displayed "row" state (its `selectionKey` value and its `isSelected` state)
  selectedRowsKeys // an array of all the `selectionKey` values of the currently selected rows
}) {
  // here we use the `selectedRowsKeys` to execute some action on each of the data records associated (via the `@selectionKey` argument) to the selected rows
  selectedRowsKeys.forEach((rowSelectionKey) => {
    // do something using the row’s `selectionKey` value
    // ...
    // ...
    // ...
  });
}
```

For details about the arguments provided to the `@onSelectionChange` callback function, refer to the [Component API](#component-api) section.


!!! Info

**Multi-select table without a model**

While it’s technically possible to use the multi-select feature in a table implemented without using a model, we strongly suggest converting the code to provide a `@model` to the table using a local dataset (created using the information/data you need to display).

!!!

#### Multi-select table with pagination and persisted selection status

This is a more complex example, where a table with multi-selection is associated with a [Pagination](/components/pagination) element (a similar use case would apply if a [filter](/patterns/filter-patterns) is applied to the data used to populate the table). In this case, a **subset of rows** is displayed on screen.

When a user selects a row, if the displayed rows are replaced with other ones (e.g., when the user clicks on the “next” button or on a different page number) there’s the question of what happens to the previous selection: is it persisted in the data/model underlying the table? Or is it lost?

In the demo below, we are persisting the selection in the data/model, so that when navigating to different pages, the row selections persist across table re-renderings.

```handlebars
<div class="doc-table-multiselect-with-pagination-demo">
  <Hds::Table
    @isSelectable={{true}}
    @onSelectionChange={{this.demoOnSelectionChangeWithPagination}}
    @model={{this.demoPaginatedData}}
    @columns={{array
      (hash key="artist" label="Artist")
      (hash key="album" label="Album")
      (hash key="year" label="Year")
    }}
  >
    <:body as |B|>
      <B.Tr @selectionKey={{B.data.id}} @isSelected={{B.data.isSelected}} @selectionAriaLabelSuffix="row {{B.data.artist}} / {{B.data.album}}">
        <B.Td>{{B.data.artist}}</B.Td>
        <B.Td>{{B.data.album}}</B.Td>
        <B.Td>{{B.data.year}}</B.Td>
      </B.Tr>
    </:body>
  </Hds::Table>
  <Hds::Pagination::Numbered
    @totalItems={{this.demoTotalItems}}
    @currentPage={{this.demoCurrentPage}}
    @pageSizes={{array 2 4}}
    @currentPageSize={{this.demoCurrentPageSize}}
    @onPageChange={{this.demoOnPageChange}}
    @onPageSizeChange={{this.demoOnPageSizeChange}}
    @ariaLabel="Pagination for multi-select table"
  />
</div>
```

Depending on the expected behavior, you will need to implement the consumer-side logic that handles the persistence (or not) using the `@onSelectionChange` callback function. For the example above, something like this:

```javascript
@action
demoOnSelectionChangeWithPagination({ selectableRowsStates }) {
  // we loop over all the displayed table rows (a subset of the dataset)
  selectableRowsStates.forEach((row) => {
    // we find the record in the dataset corresponding to the current row
    const recordToUpdate = this.demoSourceData.find(
      (modelRow) => modelRow.id === row.selectionKey
    );
    if (recordToUpdate) {
      // we update the record `isSelected` state based on the row (checkbox) state
      recordToUpdate.isSelected = row.isSelected;
    }
  });
}

```

For details about the arguments provided to the `@onSelectionChange` callback function, refer to the [Component API](#component-api) section.


#### Usability and accessibility considerations

Since the “selected” state of a row is communicated visually via the checkbox selection and for screen-reader users via the `aria-label` applied to the checkbox, there are some important considerations to keep in mind when implementing a multi-select table.

If the selection status of the rows is persisted even when a row is not displayed in the UI, consider what the expectations of the user might be: how are they made aware that the action they are going to perform may involve rows that were previously selected but not displayed in the current view?

Even more complex is the case of the “Select all” checkbox in the table header. While the expected behavior might seem straightforward when all rows are displayed in the table, it may not be obvious what the expected behavior is when the table rows are paginated or have been filtered.

Consider the experience of a user intending to select all or a subset of all possible rows:

If a user interacts with a “Select all” function or button, is the expectation that only displayed rows are selected (what happens in the example above), or that all of the rows in the data set/model are selected, even if not displayed in the current view?

In the first scenario, the “Select all” state changes depending on what rows are in view and can be confusing.

In the second scenario it might not be obvious that all of the rows have been selected and may result in the user unintentionally performing a destructive action under the assumption that they have only selected the rows in the current view.

Whatever functionality you decide to implement, be mindful of all these possible subtleties and complexities.

At a bare minimum we recommend clearly communicating to the user if they have selected rows outside of their current view and how many out of the total data set are selected. We're working to document these scenarios as they arise, in the meantime [contact the HDS team](/about/support) for assistance.

### More examples

#### Visually hidden table headers

Labels within the table header are intended to provide contextual information about the column’s content to the end user. There may be special cases in which that label is redundant from a visual perspective, because the kind of content can be inferred by looking at it (eg. a contextual dropdown).

In this example we’re visually hiding the label in the last column by passing `isVisuallyHidden=true` to it:

```handlebars
<Hds::Table
  @model={{this.model.myDemoData}}
  @columns={{array
    (hash key="artist" label="Artist" isSortable=true)
    (hash key="album" label="Album" isSortable=true)
    (hash key="year" label="Year" isSortable=true)
    (hash key="other" label="Select an action from the menu" isVisuallyHidden=true width="60px")
  }}
>
  <:body as |B|>
    <B.Tr>
      <B.Td>{{B.data.artist}}</B.Td>
      <B.Td>{{B.data.album}}</B.Td>
      <B.Td>{{B.data.year}}</B.Td>
      <B.Td>
          <Hds::Dropdown as |D|>
            <D.ToggleIcon
              @icon="more-horizontal"
              @text="Overflow Options"
              @hasChevron={{false}}
              @size="small"
            />
            <D.Interactive
              @href="#"
              @text="Delete"
              @color="critical"
              @icon="trash"
            />
          </Hds::Dropdown>
        </B.Td>
    </B.Tr>
  </:body>
</Hds::Table>
```

_Notice: only non-sortable headers can be visually hidden._

#### Internationalized column headers, overflow menu dropdown

Here’s a Table implementation that uses an array hash with localized strings for the column headers, indicates which columns should be sortable, and adds an overflow menu.

```handlebars{data-execute=false}
<Hds::Table
  @model={{this.model.myDemoData}}
  @columns={{array
      (hash key="artist" label=(t "components.table.headers.artist") isSortable=true)
      (hash key="album" label=(t "components.table.headers.album") isSortable=true)
      (hash key="year" label=(t "components.table.headers.year") isSortable=true)
      (hash key="other" label=(t "global.titles.other"))
    }}
>
  <:body as |B|>
    <B.Tr>
      <B.Td>{{B.data.artist}}</B.Td>
      <B.Td>{{B.data.album}}</B.Td>
      <B.Td>{{B.data.year}}</B.Td>
      <B.Td>
          <Hds::Dropdown as |D|>
            <D.ToggleIcon
              @icon="more-horizontal"
              @text="Overflow Options"
              @hasChevron={{false}}
              @size="small"
            />
            <D.Interactive @href="#" @text="Create" />
            <D.Interactive @href="#" @text="Read" />
            <D.Interactive @href="#" @text="Update" />
            <D.Separator />
            <D.Interactive
              @href="#"
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
