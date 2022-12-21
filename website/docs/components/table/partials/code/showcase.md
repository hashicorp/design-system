<section data-test-percy data-section="showcase">
  <h4 class="dummy-h4">States of the sortable table header (buttons)</h4>
  <Hds::Table>
    <:head>
      <Hds::Table::Tr>
        {{#each this.STATES as |state|}}
          <Hds::Table::ThSort mock-state-value={{state}} mock-state-selector="button">
            {{capitalize state}}
          </Hds::Table::ThSort>
        {{/each}}
      </Hds::Table::Tr>
    </:head>
  </Hds::Table>
  <h4 class="dummy-h4">
    Static table with model defined
  </h4>
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
  <h4 class="dummy-h4">
    Static table with density set to "short"
  </h4>
  <Hds::Table
    @model={{this.model.data}}
    @density="short"
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
  <h4 class="dummy-h4">
    Static table with density set to "tall"
  </h4>
  <Hds::Table
    @model={{this.model.data}}
    @density="tall"
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
  <h4 class="dummy-h4">
    Static table with no model defined
  </h4>
  <Hds::Table @caption="a custom table with no model defined">
    <:head as |H|>
      <H.Tr>
        <H.Th>Cell Header</H.Th>
        <H.Th>Cell Header</H.Th>
        <H.Th @width="20%">Custom Width</H.Th>
      </H.Tr>
    </:head>
    <:body as |B|>
      <B.Tr>
        <B.Th>Scope Row</B.Th>
        <B.Td>Cell Content</B.Td>
        <B.Td>Cell Content</B.Td>
      </B.Tr>
      <B.Tr>
        <B.Td>Cell Content</B.Td>
        <B.Td>Cell Content</B.Td>
        <B.Td>Cell Content</B.Td>
      </B.Tr>
      <B.Tr>
        <B.Td>Cell Content</B.Td>
        <B.Td>Cell Content</B.Td>
        <B.Td>Cell Content</B.Td>
      </B.Tr>
    </:body>
  </Hds::Table>
  <h4 class="dummy-h4">
    Static table with row striping
  </h4>
  <Hds::Table @model={{this.model.data}} @isStriped={{true}} @caption="Static table with row striping">
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
  <h4 class="dummy-h4">
    Sortable table (all columns sortable)
  </h4>
  <Hds::Table
    @model={{this.model.data}}
    @columns={{array
      (hash key="artist" label="Artist" isSortable="true")
      (hash key="album" label="Album" isSortable="true")
      (hash key="year" label="Release Year" isSortable="true")
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
  <h4 class="dummy-h4">
    Sortable table (only some columns sortable)
  </h4>
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
  <h4 class="dummy-h4">
    Sortable table, some columns sortable, artist column pre-sorted.
  </h4>
  <Hds::Table
    @model={{this.model.data}}
    @columns={{array
      (hash key="artist" label="Artist" isSortable="true")
      (hash key="album" label="Album" isSortable="true")
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
  <h4 class="dummy-h4">
    Sortable table, last column not sortable and has custom width.
  </h4>
  <Hds::Table
    @model={{this.model.data}}
    @columns={{array
      (hash key="artist" label="Artist" isSortable="true")
      (hash key="album" label="Album" isSortable="true")
      (hash key="year" label="Release Year" isSortable="true")
      (hash key="other" label="Other" width="55px")
    }}
    @valign="middle"
  >
    <:body as |B|>
      <B.Tr>
        <B.Td>{{B.data.artist}}</B.Td>
        <B.Td>{{B.data.album}}</B.Td>
        <B.Td>{{B.data.year}}</B.Td>
        <B.Td>
          <Hds::Dropdown as |dd|>
            <dd.ToggleIcon @icon="more-horizontal" @text="Overflow Options" @hasChevron={{false}} @size="small" />
            <dd.Interactive @route="components.table" @text="Create" />
            <dd.Interactive @route="components.table" @text="Read" />
            <dd.Interactive @route="components.table" @text="Update" />
            <dd.Separator />
            <dd.Interactive @route="components.table" @text="Delete" @color="critical" @icon="trash" />
          </Hds::Dropdown>
        </B.Td>
      </B.Tr>
    </:body>
  </Hds::Table>
  <h4 class="dummy-h4">Table where last column has right-aligned text</h4>
  <Hds::Table
    @model={{this.model.data}}
    @columns={{array
      (hash key="artist" label="Artist" isSortable="true")
      (hash key="album" label="Album" isSortable="true")
      (hash key="year" label="Release Year" isSortable="true")
      (hash key="vinyl-cost" label="Vinyl Cost (USD)" align="right")
    }}
  >
    <:body as |B|>
      <B.Tr>
        <B.Td>{{B.data.artist}}</B.Td>
        <B.Td>{{B.data.album}}</B.Td>
        <B.Td>{{B.data.year}}</B.Td>
        <B.Td @align="right">{{B.data.vinyl-cost}}</B.Td>
      </B.Tr>
    </:body>
  </Hds::Table>
  <h4 class="dummy-h4">Table with various cell content</h4>
  <Hds::Table
    @model={{this.model.data}}
    @columns={{array
      (hash key="artist" label="Artist" isSortable="true")
      (hash key="album" label="Album" isSortable="true")
      (hash key="year" label="Release Year" isSortable="true")
      (hash key="other" label="Additional Actions")
    }}
  >
    <:body as |B|>
      <B.Tr>
        <B.Td><Hds::Link::Inline @href="#showcase">{{B.data.artist}}</Hds::Link::Inline></B.Td>
        <B.Td>
          <div class="db-table-cell-content-div">
            <FlightIcon @name={{B.data.icon}} />
            {{B.data.album}}
          </div>
        </B.Td>
        <B.Td>
          <Hds::Badge @text={{B.data.year}} @type={{B.data.badge-type}} @color={{B.data.badge-color}} />
        </B.Td>
        <B.Td>
          <Hds::ButtonSet>
            <Hds::Button @text="Add" @isIconOnly={{true}} @icon="plus" @size="small" />
            <Hds::Button @text="Edit" @isIconOnly={{true}} @icon="edit" @size="small" @color="secondary" />
            <Hds::Button @text="Delete" @isIconOnly={{true}} @icon="trash" @size="small" @color="critical" />
          </Hds::ButtonSet>
        </B.Td>
      </B.Tr>
    </:body>
  </Hds::Table>
  <h4 class="dummy-h4">Table with multi-line content</h4>
  <Hds::Table
    @model={{this.model.data}}
    @caption="table with multi-line content"
    @columns={{array
      (hash key="artist" label="Artist")
      (hash key="album" label="Album")
      (hash key="quote" label="Quote" width="50%")
    }}
  >
    <:body as |B|>
      <B.Tr>
        <B.Td>{{B.data.artist}}</B.Td>
        <B.Td>{{B.data.album}}</B.Td>
        <B.Td>&ldquo;{{B.data.quote}}&rdquo;</B.Td>
      </B.Tr>
    </:body>
  </Hds::Table>
</section>