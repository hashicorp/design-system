## Compact vs Numbered Pagination

There are two different variants of the `Pagination` component (with different ways to invoke them) built to cover different use cases, contexts, and designs you may need them for.

This differentiation is necessary to cover both use cases of pagination for a list with a known number of elements (i.e., "numbered") and one in which this information is not available or is [cursor-based](https://jsonapi.org/profiles/ethanresnick/cursor-pagination/) (i.e., "compact").

In the first one, the user is presented with a list of navigation controls ("prev/next" and "page numbers" to go directly to a specific page) and other optional UI elements; in the second, much simpler one, the user is presented with only the "prev/next" controls (by default).

When pagination is invoked directly using one of these two components, it will **automatically**:

- provide the correct responsive layout for the entire Pagination and its sub-parts.
- manage the "current page" status across the different sub-components it’s made of (based on the arguments provided to it and its children).
- when one of the "navigation controls" is clicked, a callback function (if provided) is called, and a route (if provided) update is triggered.
- when the "page size" is changed via the provided selector, in the "numbered" variant it will automatically recalculate the total number of pages to display to the user.


## Pagination sub-components

If you need more control on the specific Pagination parts, and/or you need to cover a very specific use case, you can use the Pagination sub-elements directly (`Pagination::Info/Nav(*)/SizeSelector`).

In this case, you will have to take care of different things **yourself**

- the organization/layout of the elements on the page.
- the logic to handle the "current page" status.
- the logic connecting the different parts (if using Numbered Pagination).


## Events handling and routing

As described above, the main `Pagination::Numbered` and `Pagination::Compact` components expose an `onPageChange` callback function, invoked whenever a page change occurs. All the "navigation controls" in this cases are `<button>` elements that fire an `onClick` event that calls the `onPageChange` function.

This means that if you need to update the URL when the user changes the "page" in the Pagination (eg. to add/remove/update some query parameters), you have to do it within the `onPageChange` callback you provide to the component.

If instead you need to update the URL directly when the user clicks on one of the "navigation control" elements, you have to provide routing parameters (`route/query/model/etc`) to the component; refer to the "Component API" section below for specifications about these parameters (the APIs are slightly different for the two components).

## How to use Numbered Pagination

The basic invocation of Numbered Pagination requires the `@totalItems` argument to be provided (plus the event/routing handlers, see below):

```handlebars
<Hds::Pagination::Numbered @totalItems={{40}} />
```

By default the Info and SizeSelector sub-components are displayed, and the component takes care of updating the values and the states of the different elements, according to the user interactions with the component.

### Extra arguments

It’s possible to customize the Info, Controls, and SizeSelector components by providing additional arguments to them. For more details about these parameters, refer to the "Component API" section.

Below is an example of some of these extra arguments:

```handlebars
<Hds::Pagination::Numbered
  @totalItems={{40}}
  @showTotalItems={{false}}
  @showSizeSelector={{false}}
  @pageSizes={{array 5 20 60}}
  @currentPageSize={{20}}
/>
```

Example of custom label text for `Pagination::SizeSelector`

```handlebars
<Hds::Pagination::Numbered
  @totalItems={{40}}
  @sizeSelectorLabel="Per page"
/>
```

### Truncation

When there is a large number of items and consequently the number of pages is also large, by default the component automatically "truncates" the number of visible pages (using "ellipses"):

```handlebars
<Hds::Pagination::Numbered
  @totalItems={{120}}
/>
```

If necessary, it’s possible to disable this functionality using the `@isTruncated` argument:

```handlebars
<Hds::Pagination::Numbered
  @totalItems={{120}}
  @isTruncated={{false}}
/>
```

### Events handling

The component exposes two callback functions that can be used to respond to specific events:

```handlebars
<Hds::Pagination::Numbered
  @totalItems={{40}}
  @onPageChange={{this.handlePageChange}}
  @onPageSizeChange={{this.handlePageSizeChange}}
/>
```

The first `onPageChange` function is invoked when a user interacts with a navigation control ("prev/next" or "page number") and so can be used to respond to a "page" change (eg. updating the list of items in the page and/or updating the routing/URL).

The second `onPageSizeChange` function is invoked when a user interacts with the "size selector" and so can be used to respond to a "page size" change (eg. updating the number of items listed in the page, updating the routing/URL, and/or updating other elements in the page).

### Routing/URL updates

If you want the Pagination to change the URL of the page directly (eg. updating the query parameters) you need to pass the routing parameters to the component:

```handlebars
<Hds::Pagination::Numbered
  @totalItems={{this.demoTotalItems}}
  @currentPage={{this.demoCurrentPage}}
  @pageSizes={{this.demoPageSizes}}
  @currentPageSize={{this.demoCurrentPageSize}}
  @route={{this.demoRouteName}}
  @queryFunction={{this.demoQueryFunctionNumbered}}
  @onPageChange={{this.handlePageChange}}
  @onPageSizeChange={{this.handlePageSizeChangeNumbered}}
/>
```

where the `@queryFunction` function will be something like this:

```javascript
get demoQueryFunctionNumbered() {
  return (page, pageSize) => {
    return {
      demoCurrentPage: page,
      demoCurrentPageSize: pageSize,
      demoExtraParam: 'hello',
    };
  };
}
```

When the routing parameters are provided, the "navigation controls" are rendered as links and if the user clicks on one of them the page URL is automatically updated. This means that the component’s state is persisted **outside** of the component and so its whole state **must** be "controlled" by the consumer’s code (otherwise there would be conflicting states).

In this case, the component doesn’t update its internal "state" but the value of the state variables (eg. `currentPage/currentPageSize`) is **always** determined by the consumer’s controller code via the component’s arguments (usually, they are directly connected to the query parameters in the URL).

The reason for using a consumer-side function to determine the `query` argument is because it’s dynamic (it depends on the value of the `page` variable) and gives consumers the ability to specify their own query parameters (which will likely differ case by case).

Even if the Pagination is based on routing, the `onPageChange/onPageSizeChange` callbacks are still available and can be used to respond to the users’ actions (eg. for logging, tracking, etc.).

Below you can find an example of an integration between the sortable [`Table`](/components/table) component and the `Pagination::Numbered` component that uses query parameters in the URL to preserve the UI state:

```handlebars
<div class="doc-pagination-table-demo">
  <Hds::Table
    @model={{this.demoPaginatedDataNumbered}}
    @columns={{array
      (hash key="id" label="ID" isSortable=true)
      (hash key="name" label="Name" isSortable=true)
      (hash key="email" label="Email")
      (hash key="role" label="Role")
    }}
    @sortBy={{this.demoCurrentSortBy}}
    @sortOrder={{this.demoCurrentSortOrder}}
    @onSort={{this.demoOnTableSort}}
    @density={{if (eq this.demoCurrentPageSize 30) "short" "medium"}}
  >
    <:body as |B|>
      <B.Tr>
        <B.Td>{{B.data.id}}</B.Td>
        <B.Td>{{B.data.name}}</B.Td>
        <B.Td>{{B.data.email}}</B.Td>
        <B.Td>{{B.data.role}}</B.Td>
      </B.Tr>
    </:body>
  </Hds::Table>
  <Hds::Pagination::Numbered
    @totalItems={{this.demoTotalItems}}
    @currentPage={{this.demoCurrentPage}}
    @pageSizes={{this.demoPageSizes}}
    @currentPageSize={{this.demoCurrentPageSize}}
    @route={{this.demoRouteName}}
    @queryFunction={{this.demoQueryFunctionNumbered}}
    @onPageChange={{this.handlePageChange}}
    @onPageSizeChange={{this.handlePageSizeChangeNumbered}}
  />
</div>
```

## How to use Compact Pagination

By default, the basic use of the Pagination provides:

The basic invocation of the Compact Pagination doesn’t require any arguments (apart from the event/routing handlers, see below):

```handlebars
<Hds::Pagination::Compact />
```

Renders to:

In this variant, only the "prev" and "next" navigation controls are displayed.

### Extra arguments

If necessary, it’s possible to hide the control labels:

```handlebars
<Hds::Pagination::Compact @showLabels={{false}} />
```

It is also possible to show the SizeSelector (hidden by default):

```handlebars
<Hds::Pagination::Compact @showSizeSelector={{true}} />
```

!!! Warning

**Warning**

When the "page size" is used in the context of a cursor-based pagination, it can lead to increased complexity and potential UX/usability issues (eg. when the cursor is `prev` and the page size is changed, the behaviour may different from what is expected by the user).

**Be mindful of this limitations and implement your code accordingly.**

!!!

### Event handling

The component exposes a callback function that can be used to respond to page changes:

```handlebars
<Hds::Pagination::Compact
  @onPageChange={{this.handlePageChange}}
/>
```

The `onPageChange` function is invoked when a user interacts with a "prev" or "next" navigation control and so can be used to respond to a "page" change (eg. updating the list of items in the page and/or updating the routing/URL).

### Routing/URL updates

If you want the Pagination to change the URL of the page directly (eg. updating the query parameters) you need to pass the routing parameters to the component:

```handlebars
<Hds::Pagination::Compact
  @route={{this.demoRouteName}}
  @queryFunction={{this.demoQueryFunctionCompact}}
  @isDisabledPrev={{this.demoIsDisabledPrev}}
  @isDisabledNext={{this.demoIsDisabledNext}}
/>
```

where the `@queryFunction` function will be something like this:

```javascript
get demoQueryFunctionCompact() {
  return (page) => {
    return {
      demoCurrentToken: page === 'prev' ? this.getPrevToken : this.getNextToken,
      demoExtraParam: 'hello',
    };
  };
}
```

When the routing parameters are provided, the "prev/next" controls are rendered as links and the page URL is automatically updated when the user clicks them. This means that the component’s state is persisted **outside** of the component and so its whole state **must** be "controlled" by the consumer’s code (otherwise there would be conflicting states).

In this case, the component doesn’t update its internal "state" but the value of the state variables is **always** determined by the consumer’s controller code via the component’s arguments (usually, they are directly connected to the query parameters in the URL).

The reason for using a consumer-side function to determine the `query` argument is because it’s dynamic (it depends on the value of the `page/cursor` variable) and gives consumers the ability to specify their own query parameters (which will likely differ case by case).

Even if the Pagination is based on routing, the `onPageChange/onPageSizeChange` callbacks are still available and can be used to respond to the users' actions (eg. for logging, tracking, etc.).

Below you can find an example of an integration between the [`Table`](/components/table) component and the `Pagination::Compact` component that uses query parameters in the URL to preserve the UI state:

```handlebars
<div class="doc-pagination-table-demo">
  <Hds::Table
    @model={{this.demoPaginatedDataCompact}}
    @columns={{array
      (hash key="id" label="ID")
      (hash key="name" label="Name")
      (hash key="email" label="Email")
      (hash key="role" label="Role")
    }}
  >
    <:body as |B|>
      <B.Tr>
        <B.Td>{{B.data.id}}</B.Td>
        <B.Td>{{B.data.name}}</B.Td>
        <B.Td>{{B.data.email}}</B.Td>
        <B.Td>{{B.data.role}}</B.Td>
      </B.Tr>
    </:body>
  </Hds::Table>
  <Hds::Pagination::Compact
    @route={{this.demoRouteName}}
    @queryFunction={{this.demoQueryFunctionCompact}}
    @isDisabledPrev={{this.demoIsDisabledPrev}}
    @isDisabledNext={{this.demoIsDisabledNext}}
  />
</div>
```
