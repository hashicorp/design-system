This component takes advantage of the `sort-by` helper provided in [ember-composable-helpers](https://github.com/DockYard/ember-composable-helpers). While some of the examples provided on our documentation use some of the other helpers provided in this addon, they are not required to use Helios. Read the [configuration information](https://github.com/DockYard/ember-composable-helpers#configuration) provided by the addon if you wish to customize which helpers are included in your own app.

## How to use this component

### Static Table (non-sortable)

If you don’t have or want to use a model, a basic invocation could look like:

```handlebars{data-execute=false}
<!-- app/templates/components/table.hbs -->

<Hds::Table>
  <:head as |H|>
    <H.Tr>
      <H.Th>Artist</H.Th>
      <H.Th>Album</H.Th>
      <H.Th>Release Year</H.Th>
    </H.Tr>
  </:head>
  <:body as |B|>
    <B.Tr>
      <B.Td>Custom Cell Content</B.Td>
      <B.Td>{{t 'translated-cell-content-string'}}</B.Td>
      <B.Td>Some other custom cell content</B.Td>
    </B.Tr>
  </:body>
</Hds::Table>
```

### Simple Table with model defined (non-sortable)

To use a table with a model, first of all you need to define the data model (usually in your route):

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

For documentation purposes, we‘re imitating fetching data from an API and working with that as data model. Depending on your context and needs, you may want to manipulate and adapt the structure of your data to better suit your needs in the templating code.

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

To be able to use this `Table` variant, you need to:
- provide a `@columns` argument (see [Component API](#component-api) for details about its shape)
- use the `.data` key to access the `@model` record content (it's yielded as `data`)
!!!


### Sortable Table

For the sortable table, the invocation and use is a little bit different:

1. Shape the data model for use; we’ve placed it in the page‘s route.

    - In this example, we’re identifying the column headers (keys) and also capitalizing them.
    - Each column object has two pieces:

        - a `key`\-- used for the model, the `sortingKeys`, and `sortBy`
        - a `label`\-- used in the table header cells

```javascript
// app/routes/components/table.js

import Route from '@ember/routing/route';
import { capitalize } from '@ember/string';

export default class ComponentsTableRoute extends Route {
  async model() {
    let response = await fetch('/api/folk.json');
    let { data } = await response.json();

    // make sure the variable is declared outside of the loop
    // so we can return it in the model response
    let columns;
    let dataResponse = data.map((model) => {
      let { id, attributes } = model;
      columns = Object.keys(attributes);
      return { id, ...attributes };
    });
    columns = columns.map((column) => {
      return { key: column, label: capitalize(column) };
    });
    return { data: dataResponse, columns };
  }
}
```

2. Invoke `Hds::Table` in your template file.

```handlebars{data-execute=false}
<!-- app/templates/components/table.hbs -->

<Hds::Table
  @model={{this.model.data}}
  @columns={{this.model.columns}}
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

#### Indicate which columns are sortable

If you want, you can indicate that only specific columns should be sortable.

```handlebars{data-execute=false}
<!-- app/templates/components/table.hbs -->

<Hds::Table
  @model={{this.model.data}}
  @columns={{this.model.columns}}
  @sortingKeys={{array 'artist' 'album'}}
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

You can also indicate that a specific column should be pre-sorted.

```handlebars{data-execute=false}
<!-- app/templates/components/table.hbs -->

<Hds::Table
  @model={{this.model.data}}
  @columns={{this.model.columns}}
  @sortingKeys={{array 'artist' 'album'}}
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

You can also indicate that a specific column should be pre-sorted in a specific direction.

```handlebars{data-execute=false}
<!-- app/templates/components/table.hbs -->

<Hds::Table
  @model={{this.model.data}}
  @columns={{this.model.columns}}
  @sortingKeys={{array 'artist' 'album'}}
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

#### Complex sortable Table

Here’s a table implementation that uses an array hash with localized strings for the column headers, indicates which columns should be sortable, and adds an overflow menu.

```handlebars{data-execute=false}
<!-- app/templates/components/table.hbs -->

<Hds::Table
  @model={{this.model.data}}
  @columns={{array
      (hash key='artist' label=(t 'components.table.headers.artist'))
      (hash key='album' label=(t 'components.table.headers.album'))
      (hash key='year' label=(t 'components.table.headers.year'))
      (hash key='other' label=(t 'global.titles.other'))
    }}
  @sortingKeys={{array 'artist' 'album' 'year'}}
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
