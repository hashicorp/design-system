There are several ways to implement the table component. These examples will be in order of increasing complexity. Additional implementation examples are in the Showcase section.

#### Static Table (non-sortable)

If you have your own content and don't want to use a model, you can still benefit from the components themselves. Here is an example of such an invocation in a template:

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

#### Simple Table with model defined (non-sortable)

In this invocation of the table component, you would define the data model and insert your own content into the `:head` and `:body` blocks. Here is an example of such an invocation in a template:

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

For documentation purposes, we imitated fetching data from an API and working with that as our data model.

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

#### Sortable Table

For the sortable table, the invocation and use is a little bit different:

1\. Shape the data model for use; in this example we've placed it in the page's route. In this example, we're identifying the column headers (keys) and also capitalizing them. Each column object has two pieces: a `key`\-- used for the model, the `sortingKeys` and `sortBy`; and the `label`\-- used in the table header cells.

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

2\. Invoke the Hds::Table component in your template file.

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