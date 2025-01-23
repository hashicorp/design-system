## How to use this component

The Advanced Table is a component meant to display tabular data to overcome limitations with the HTML `<table>` elements and increase the accessibility for complex features, like [nested rows](#nested-rows) and [a sticky header](#vertical-scrolling).

Instead of using the `<table>` elements, the Advanced Table uses `<div>`s with explicitly set roles (for example, instead of `<tr>`, it uses `<div role="row">`). This allows the Advanced Table to use [CSS Grid](https://developer.mozilla.org/en-US/docs/Web/CSS/grid) for styling.

### Basic Advanced Table

To use an Advanced Table, first define the data model in your route or model:

```javascript
import Route from '@ember/routing/route';

export default class ComponentsAdvancedTableRoute extends Route {
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
<Hds::AdvancedTable
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
</Hds::AdvancedTable>
```

!!! Info

**Important**

For clarity, there are a couple of important points to note here:

- provide a `@columns` argument (see [Component API](#component-api) for details about its shape)
- use the `.data` key to access the `@model` record content (it’s yielded as `data`)

!!!

### Nested rows
For complex data sets where there is a parent row with several children, you can render them as nested rows. By default, the Advanced Table uses the `children` key on the `@model` argument to render the nested rows. To change the key used, set the `@childrenKey` argument on the Advanced Table.

To ensure the Advanced Table is accessible, the columns in the nested rows **must** match the columns of the parent rows. Otherwise the relationship between the parent and nested rows will not be clear to users.

```javascript
  // example of data retrieved for the model:
  [
    {
      id: '1',
      name: 'Policy set 1',
      status: 'PASS',
      children: [
        {
          name: 'test-advisory-pass.sentinel',
          status: 'PASS',
          description: 'Sample description for this thing.'
        },
        {
          name: 'test-hard-mandatory-pass.sentinel',
          status: 'PASS',
          description: 'Sample description for this thing.'
        }
      ]
    },
    {
      id: '2',
      name: 'Policy set 2',
      status: 'FAIL',
      children: [
        {
          name: 'test-advisory-pass.sentinel',
          status: 'PASS',
          description: 'Sample description for this thing.'
        },
        // ...
      ]
    },
  ]
```

!!! Warning

It is not currently supported to have `@isStriped`, multi-select, or sortable columns with nested rows. If your use case requires any of these features, please [contact the Design Systems Team](/about/support).

!!!

Similar to the basic Advanced Table, you can insert your own content into the `:body` block and the component will take care of looping over the `@model` provided for the parent and nested rows. The component adds the expand/collapse button to the `[B].Th` component in each row that has children.


```handlebars
<Hds::AdvancedTable
  @model={{this.demoDataWithNestedRows}}
  @columns={{array
    (hash key="name" label="Name")
    (hash key="status" label="Status")
    (hash key="description" label="Description")
  }}
>
  <:body as |B|>
    <B.Tr>
      <B.Th>{{B.data.name}}</B.Th>
      <B.Td>
        {{#if (eq B.data.status "FAIL")}}
          <Hds::Badge @text="Fail" @color="critical" @icon="x" />
        {{else}}
          <Hds::Badge @text="Pass" @color="success" @icon="check" />
        {{/if}}
      </B.Td>
      <B.Td>{{B.data.description}}</B.Td>
    </B.Tr>
  </:body>
</Hds::AdvancedTable>
```


### Sortable Advanced Table

!!! Info

This component takes advantage of the `sort-by` helper provided by [ember-composable-helpers](https://github.com/DockYard/ember-composable-helpers).

!!!

Add `isSortable=true` to the hash for each column that should be sortable. 

```handlebars
<Hds::AdvancedTable
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
</Hds::AdvancedTable>
```

!!! Warning

At this time, the Advanced Table does not support sortable nested rows. If this is a use case you require, please [contact the Design Systems Team](/about/support).

!!!

#### Pre-sorting columns

To indicate that a specific column should be pre-sorted, add `@sortBy`, where the value is the column’s key.

```handlebars
<Hds::AdvancedTable
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
</Hds::AdvancedTable>
```

##### Pre-sorting direction

By default, the sort order is set to ascending. To indicate that the column defined in `@sortBy` should be pre-sorted in descending order, pass in `@sortOrder="desc"`.

```handlebars
<Hds::AdvancedTable
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
</Hds::AdvancedTable>
```

#### Custom sort callback

To implement a custom sort callback on a column:

1. add a custom function as the value for `sortingFunction` in the column hash.
2. include a custom `onSort` action in your Table invocation to track the sorting order and use it in the custom sorting function.

This is useful for cases where the key might not be A-Z or 0-9 sortable by default, e.g., status, and you’re otherwise unable to influence the shape of the data in the model.

_The code has been truncated for clarity._

```handlebars{data-execute=false}
<Hds::AdvancedTable
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
</Hds::AdvancedTable>
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

To create a condensed or spacious Advanced Table, add `@density` to the Advanced Table’s invocation. Note that it only affects the table body, not the table header.

```handlebars
<Hds::AdvancedTable
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
</Hds::AdvancedTable>
```

#### Horizontal alignment

To create a column that has right-aligned content, set `@align` to `right` on both the column’s header and cell (the cell’s horizontal content alignment should be the same as the column’s horizontal content alignment).

```handlebars
<Hds::AdvancedTable
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
          <dd.Interactive @route="components">Create</dd.Interactive>
          <dd.Interactive @route="components">Read</dd.Interactive>
          <dd.Interactive @route="components">Update</dd.Interactive>
          <dd.Separator />
          <dd.Interactive @route="components" @color="critical" @icon="trash">Delete</dd.Interactive>
        </Hds::Dropdown>
      </B.Td>
    </B.Tr>
  </:body>
</Hds::AdvancedTable>
```

### Tooltip

[Header cells](/components/table/advanced-table#headers) should be clear, concise, and straightforward whenever possible. However, there could be cases where the label is insufficient by itself and extra information is required. In this case, it’s possible to show a tooltip next to the label in the header:

```handlebars
<Hds::AdvancedTable
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
</Hds::AdvancedTable>
```
### Scrollable table

Consuming a large amount of data in a tabular format can lead to an intense cognitive load for the user. As a general principle, care should be taken to simplify the information within a table as much as possible.

We recommend using functionalities like [pagination](/components/pagination), [sorting](/components/table/advanced-table?tab=code#sortable-advanced-table), and [filtering](/patterns/filter-patterns) to reduce this load.

#### Vertical scrolling

For situations where the default number of rows visible may be high, it can be difficult for users to track which column is which once they scroll. In this case, the `hasStickyHeader` argument can be used to make the column headers persist as the user scrolls.

```handlebars
<!-- this is an element with "overflow: auto" and "max-height: 500px" -->
<div class="doc-advanced-table-vertical-scrollable-wrapper">
  <Hds::AdvancedTable
    @model={{this.demoDataWithLargeNumberOfRows}}
    @columns={{array
      (hash key="id" label="ID")
      (hash key="name" label="Name" isSortable=true)
      (hash key="email" label="Email")
      (hash key="role" label="Role" isSortable=true)
    }}
    @hasStickyHeader={{true}}
  >
    <:body as |B|>
      <B.Tr>
        <B.Td>{{B.data.id}}</B.Td>
        <B.Td>{{B.data.name}}</B.Td>
        <B.Td>{{B.data.email}}</B.Td>
        <B.Td>{{B.data.role}}</B.Td>
      </B.Tr>
    </:body>
  </Hds::AdvancedTable>
</div>
```

#### Horizontal scrolling

There may be cases when it’s necessary to show an Advanced Table with a large number of columns and allow the user to scroll horizontally. In this case the consumer can place the Advanced Table inside a container with `overflow: auto`.

```handlebars
<!-- this is an element with "overflow: auto" -->
<div class="doc-advanced-table-scrollable-wrapper">
  <Hds::AdvancedTable
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
  </Hds::AdvancedTable>
</div>
```

### Multi-select Advanced Table

A multi-select Advanced Table includes checkboxes enabling users to select multiple rows for purposes of performing bulk operations. Checking or unchecking the checkbox in the Advanced Table header either selects or deselects the checkboxes on each row in the body. Individual checkboxes in the rows can also be selected or deselected.

Add `isSelectable=true` to create a multi-select Advanced Table. The `onSelectionChange` argument can be used to pass a callback function to receive selection keys when the selected rows change. You must also pass a `selectionKey` to each row which gets passed back through the `onSelectionChange` callback which maps the row selection on the Advanced Table to an item in your data model.

!!! Warning

At this time, the Advanced Table does not support multi-select nested rows. If this is a use case you require, please [contact the Design Systems Team](/about/support).

!!!

#### Simple multi-select

This is a simple example of an Advanced Table with multi-selection. Notice the `@selectionKey` argument provided to the rows, used by the `@onSelectionChange` callback to provide the list of selected/deselected rows as argument(s) for the invoked function:

```handlebars
<Hds::AdvancedTable
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
</Hds::AdvancedTable>
```

!!! Warning

**Important**

To make the Advanced Table accessible, each checkbox used for the selection needs to have a distinct `aria-label`. For this reason, you need to provide a `@selectionAriaLabelSuffix` value (possibly unique) to the rows in the Advanced Table's body.

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

#### Multi-select with sorting by selection state

To enable sorting by selected rows in an Advanced Table, you need to set `@selectableColumnKey` to the key in each row that tracks its selection state. This allows you to sort based on whether rows are selected or not.

In the demo below, we set up a multi-select Advanced Table that can be sorted based on the selection state of its rows.

```handlebars
<Hds::AdvancedTable
  @isSelectable={{true}}
  @selectableColumnKey="isSelected"
  @onSelectionChange={{this.demoOnSelectionChangeSortBySelected}}
  @model={{this.demoSortBySelectedData}}
  @columns={{array
    (hash key="artist" label="Artist" isSortable=true)
    (hash key="album" label="Album" isSortable=true)
    (hash key="year" label="Year" isSortable=true)
    (hash key="selection" label="Selected" isSortable=true)
  }}
  @sortBy="isSelected"
  @sortOrder="desc"
>
  <:body as |B|>
    <B.Tr
      @selectionKey={{B.data.id}}
      @isSelected={{B.data.isSelected}}
      @selectionAriaLabelSuffix="row {{B.data.artist}} / {{B.data.album}}"
    >
      <B.Td>{{B.data.artist}}</B.Td>
      <B.Td>{{B.data.album}}</B.Td>
      <B.Td>{{B.data.year}}</B.Td>
      <B.Td>{{if B.data.isSelected "Yes" "No"}}</B.Td>
    </B.Tr>
  </:body>
</Hds::AdvancedTable>
```

#### Multi-select with pagination and persisted selection status

This is a more complex example, where an Advanced Table with multi-selection is associated with a [Pagination](/components/pagination) element (a similar use case would apply if a [filter](/patterns/filter-patterns) is applied to the data used to populate the Advanced Table). In this case, a **subset of rows** is displayed on screen.

When a user selects a row, if the displayed rows are replaced with other ones (e.g., when the user clicks on the “next” button or on a different page number) there’s the question of what happens to the previous selection: is it persisted in the data/model underlying the table? Or is it lost?

In the demo below, we are persisting the selection in the data/model, so that when navigating to different pages, the row selections persist across table re-renderings.

```handlebars
<div class="doc-advanced-table-multiselect-with-pagination-demo">
  <Hds::AdvancedTable
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
  </Hds::AdvancedTable>
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

Since the “selected” state of a row is communicated with the checkbox selection, there are some important considerations to keep in mind when implementing a multi-select Advanced Table.

If the selection status of the rows is persisted even when a row is not displayed in the UI, consider what the expectations of the user might be: how are they made aware that the action they are going to perform may involve rows that were previously selected but not displayed in the current view?

Even more complex is the case of the “Select all” checkbox in the Advanced Table header. While the expected behavior might seem straightforward when all rows are displayed, it may not be obvious what the expected behavior is when the rows are paginated or have been filtered.

Consider the experience of a user intending to select all or a subset of all possible rows:

If a user interacts with a “Select all” function or button, is the expectation that only displayed rows are selected (what happens in the example above), or that all of the rows in the data set/model are selected, even if not displayed in the current view?

In the first scenario, the “Select all” state changes depending on what rows are in view and can be confusing.

In the second scenario it might not be obvious that all of the rows have been selected and may result in the user unintentionally performing a destructive action under the assumption that they have only selected the rows in the current view.

Whatever functionality you decide to implement, be mindful of all these possible subtleties and complexities.

At a bare minimum we recommend clearly communicating to the user if they have selected rows outside of their current view and how many out of the total data set are selected. We're working to document these scenarios as they arise, in the meantime [contact the Design Systems Team](/about/support) for assistance.

### More examples

#### Visually hidden headers

Labels within the header cells are intended to provide contextual information about the column’s content to the end user. There may be special cases in which that label is redundant from a visual perspective, because the kind of content can be inferred by looking at it (eg. a contextual dropdown).

In this example we’re visually hiding the label in the last column by passing `isVisuallyHidden=true` to it:

```handlebars
<Hds::AdvancedTable
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
              @color="critical"
              @icon="trash"
            >Delete</D.Interactive>
          </Hds::Dropdown>
        </B.Td>
    </B.Tr>
  </:body>
</Hds::AdvancedTable>
```

_Notice: only non-sortable headers can be visually hidden._

#### Internationalized column headers, overflow menu dropdown

Here’s an Advanced Table implementation that uses an array hash with localized strings for the column headers. It indicates which columns should be sortable, and adds an overflow menu.

```handlebars{data-execute=false}
<Hds::AdvancedTable
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
            <D.Interactive @href="#">Create</D.Interactive>
            <D.Interactive @href="#">Read</D.Interactive>
            <D.Interactive @href="#">Update</D.Interactive>
            <D.Separator />
            <D.Interactive @href="#" @color="critical" @icon="trash">Delete</D.Interactive>
          </Hds::Dropdown>
        </B.Td>
    </B.Tr>
  </:body>
</Hds::AdvancedTable>
```

