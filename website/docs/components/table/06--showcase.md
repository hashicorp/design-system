---
title: Table
category: components
component: table
section: showcase
---


<section data-test-percy data-section="showcase">
  
  <h4 class="dummy-h4">States of the sortable table header (buttons)</h4>
  <Hds::Table>
    <:head>
      <Hds::Table::Tr>
        {{#each @model.STATES as |state|}}
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
  <Hds::Table @model={{this.model.data}}>
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
    Static table with density set to "short"
  </h4>
  <Hds::Table @model={{this.model.data}} @density="short">
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
    Static table with density set to "tall"
  </h4>
  <Hds::Table @model={{this.model.data}} @density="tall">
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
    Static table with no model defined
  </h4>
  <Hds::Table @caption="a custom table with no model defined">
    <:head as |H|>
      <H.Tr>
        <H.Th>Cell Header</H.Th>
        <H.Th>Cell Header</H.Th>
        <H.Th>Cell Header</H.Th>
      </H.Tr>
    </:head>
    <:body as |B|>
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
      <B.Tr>
        <B.Td>Cell Content</B.Td>
        <B.Td>Cell Content</B.Td>
        <B.Td>Cell Content</B.Td>
      </B.Tr>
    </:body>
  </Hds::Table>
  <h4 class="dummy-h4">
    Static table with no striping
  </h4>
  <Hds::Table @model={{this.model.data}} @isStriped={{false}} @caption="Static table with no striping">
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
  <Hds::Table @model={{this.model.data}} @columns={{take 3 this.model.columns}}>
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
  <Hds::Table @model={{this.model.data}} @columns={{take 3 this.model.columns}} @sortingKeys={{array "artist" "album"}}>
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
    @columns={{take 3 this.model.columns}}
    @sortingKeys={{array "artist" "album"}}
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
    Sortable table, some columns sortable, artist column pre-sorted in descending order.
  </h4>
  <Hds::Table
    @model={{this.model.data}}
    @columns={{union (take 3 this.model.columns) (hash key="other" label="Other")}}
    @sortingKeys={{array "artist" "album"}}
    @sortBy="artist"
    @sortOrder="desc"
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
  <h4 class="dummy-h4">Table with a custom-width column and right-aligned text column</h4>
  <Hds::Table @model={{this.model.data}} @isStriped={{false}}>
    <:head as |H|>
      <H.Tr>
        <H.Th>Artist</H.Th>
        <H.Th>Album</H.Th>
        <H.Th class="db-table-w1-7">Release Year</H.Th>
        <H.Th class="db-table-text-right">Current Vinyl Cost (USD)</H.Th>
      </H.Tr>
    </:head>
    <:body as |B|>
      <B.Tr>
        <B.Td>{{B.data.artist}}</B.Td>
        <B.Td>{{B.data.album}}</B.Td>
        <B.Td class="db-table-w1-7">{{B.data.year}}</B.Td>
        <B.Td class="db-table-text-right">{{B.data.vinyl-cost}}</B.Td>
      </B.Tr>
    </:body>
  </Hds::Table>
  <h4 class="dummy-h4">Table with different types of cell content (no striping because badges are used)</h4>
  <Hds::Table @model={{this.model.data}} @isStriped={{false}}>
    <:head as |H|>
      <H.Tr>
        <H.Th>Artist</H.Th>
        <H.Th>Album</H.Th>
        <H.Th>Release Year</H.Th>
        <H.Th>Additional Actions As Buttons</H.Th>
      </H.Tr>
    </:head>
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
  <Hds::Table @model={{this.model.data}} @caption="table with multi-line content">
    <:head as |H|>
      <H.Tr>
        <H.Th>Artist</H.Th>
        <H.Th>Album</H.Th>
        <H.Th>Related Quote about the artist</H.Th>
      </H.Tr>
    </:head>
    <:body as |B|>
      <B.Tr>
        <B.Td>{{B.data.artist}}</B.Td>
        <B.Td>{{B.data.album}}</B.Td>
        <B.Td>&ldquo;{{B.data.quote}}&rdquo;</B.Td>
      </B.Tr>
    </:body>
  </Hds::Table>
</section>
