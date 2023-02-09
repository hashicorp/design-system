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

Add `isSortable=true` to the hash for each column that should be sortable.

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

You can optionally indicate that a specific column should be pre-sorted by adding `@sortBy` where the value is the key of the column.

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

You can optionally also indicate that the column defined in `@sortBy` should be pre-sorted in a descending order, rather than the default ascending order by passing in `@sortOrder='desc'`.

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

#### More Examples: internationalized column headers, overflow menu dropdown

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

#### More Examples: replacing components as a pre-adoption step

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
