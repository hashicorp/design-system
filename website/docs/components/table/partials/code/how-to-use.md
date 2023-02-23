This component takes advantage of the `sort-by` helper provided in [ember-composable-helpers](https://github.com/DockYard/ember-composable-helpers). While some of the examples provided on our documentation use some of the other helpers provided in this addon, they are not required to use Helios. Read the [configuration information](https://github.com/DockYard/ember-composable-helpers#configuration) provided by the addon if you wish to customize which helpers are included in your own app.

## How to use this component

### Non-sortable table with no model defined, caption defined

```handlebars{data-execute=false}
<!-- app/templates/components/table.hbs -->
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
// app/routes/components/table.js

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
<!-- app/templates/components/table.hbs -->

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
<!-- app/templates/components/table.hbs -->
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
<!-- app/templates/components/table.hbs -->
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
<!-- app/templates/components/table.hbs -->
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

To implement a custom sort callback on a columns, (1) add a custom function as the value for `sortingFunction` in the column hash, and (2) include a custom `onSort` action in your table invocation. This is useful for cases where the key might not be A-Z or 0-9 sortable by default, i.e., status, and you’re otherwise unable to influence the shape of the data in the model. Here is an example, code truncated for clarity:

```handlebars{data-execute=false}
<!-- app/templates/components/table.hbs -->
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
import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

// we use an array to declare the custom sorting order for the clusters' status
const customSortingCriteriaArray = [
  'failing',
  'active',
  'establishing',
  'pending',
];

export default class ComponentsTableController extends Controller {
  @tracked customSortOrderForClusterStatus = 'asc';

  get clustersWithExtraData() {
    return this.model.clusters.map((record) => {
      return {
        ...record,
        'status-sort-order': customSortingCriteriaArray.indexOf(
          record['status']
        ),
      };
    });
  }

  get customSortingMethodForClusterStatus() {
    return (s1, s2) => {
      const index1 = customSortingCriteriaArray.indexOf(s1['status']);
      const index2 = customSortingCriteriaArray.indexOf(s2['status']);
      if (index1 < index2) {
        return this.customSortOrderForClusterStatus === 'asc' ? -1 : 1;
      } else if (index1 > index2) {
        return this.customSortOrderForClusterStatus === 'asc' ? 1 : -1;
      } else {
        return 0;
      }
    };
  }

  @action
  customOnSort(_sortBy, sortOrder) {
    this.customSortOrderForClusterStatus = sortOrder;
  }
}
```

### More Examples

#### Internationalized column headers, overflow menu dropdown

Here’s a table implementation that uses an array hash with localized strings for the column headers, indicates which columns should be sortable, and adds an overflow menu.

```handlebars{data-execute=false}
<!-- app/templates/components/table.hbs -->

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

#### Replacing components as a pre-adoption step

If you're not quite ready to replace your existing tables with this component, you can totally try out a pre-adoption spike with just the components themselves. It's a little more typing but it should give you an idea of what will work for you.

```handlebars{data-execute=false}
<!-- app/templates/components/table.hbs -->
<Hds::Table @model={{this.model}}>
  <:head as |H|>
    <H.Tr>
      <H.Th>Artist</H.Th>
      <H.Th>Album</H.Th>
      <H.Th>Release Year</H.Th>
    </H.Tr>
  </:head>
  <:body as |B|>
    <B.Tr>
      <B.Td>{{B.artist}}</B.Td>
      <B.Td>{{B.album}}</B.Td>
      <B.Td>{{B.year}}</B.Td>
    </B.Tr>
  </:body>
</Hds::Table>
```
