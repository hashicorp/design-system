This component takes advantage of the `sort-by` helper provided in [ember-composable-helpers](https://github.com/DockYard/ember-composable-helpers). While some of the examples provided on our documentation use some of the other helpers provided in this addon, they are not required to use Helios. Read the [configuration information](https://github.com/DockYard/ember-composable-helpers#configuration) provided by the addon if you wish to customize which helpers are included in your own app.

## How to use this component

### Non-sortable table

```handlebars{data-execute=false}
<!-- app/templates/components/table.hbs -->

<Hds::Table 
  @model={{this.model.data}}
  @columns={{array
    (hash key="artist" label="Artist")
    (hash key="album" label="Album")
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

### Sortable Table

Add `isSortable=true` to each column’s hash that should be sortable.

```handlebars{data-execute=false}
<!-- app/templates/components/table.hbs -->

<Hds::Table
  @model={{this.model.data}}
  @columns={{array
    (hash key="artist" label="Artist" isSortable="true")
    (hash key="album" label="Album" isSortable="true")
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

You can also indicate that a specific column should be pre-sorted.

```handlebars{data-execute=false}
<!-- app/templates/components/table.hbs -->

<Hds::Table
  @model={{this.model.data}}
  @columns={{array
    (hash key="artist" label="Artist" isSortable="true")
    (hash key="album" label="Album" isSortable="true")
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

You can also indicate that a specific column should be pre-sorted in a specific direction.

```handlebars{data-execute=false}
<!-- app/templates/components/table.hbs -->

<Hds::Table
  @model={{this.model.data}}
  @columns={{array
    (hash key="artist" label="Artist" isSortable="true")
    (hash key="album" label="Album" isSortable="true")
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

#### Complex sortable Table

Here’s a table implementation that uses an array hash with localized strings for the column headers, indicates which columns should be sortable, and adds an overflow menu.

```handlebars{data-execute=false}
<!-- app/templates/components/table.hbs -->

<Hds::Table
  @model={{this.model.data}}
  @columns={{array
      (hash key='artist' label=(t 'components.table.headers.artist') isSortable="true")
      (hash key='album' label=(t 'components.table.headers.album') isSortable="true")
      (hash key='year' label=(t 'components.table.headers.year') isSortable="true")
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
