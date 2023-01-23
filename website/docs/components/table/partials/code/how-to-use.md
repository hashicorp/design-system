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

To use a table with a model, define the data model and insert your own content into the `:head` and `:body` blocks.

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
      <B.Td>{{B.data.artist}}</B.Td>
      <B.Td>{{B.data.album}}</B.Td>
      <B.Td>{{B.data.year}}</B.Td>
    </B.Tr>
  </:body>
</Hds::Table>
```

For documentation purposes, we‘ve imitated fetching data from an API and are working with that as our data model.

```javascript
import Route from '@ember/routing/route';

export default class ComponentsTableRoute extends Route {
  async model() {
    let response = await fetch('/api/folk.json');
    let { data } = await response.json();

    return data.map((model) => {
      let { attributes } = model;
      return { ...attributes };
    });
  }
}
```

### Sortable Table

For the sortable table, the invocation and use is a little bit different:

1. Shape the data model for use; we've placed it in the page‘s route.

    - In this example, we're identifying the column headers (keys) and also capitalizing them. 
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

Here's a table implementation that uses an array hash with localized strings for the column headers, indicates which columns should be sortable, and adds an overflow menu.

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
