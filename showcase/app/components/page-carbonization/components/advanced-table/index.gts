/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { array, hash, get } from '@ember/helper';
import { eq } from 'ember-truth-helpers';
import { pageTitle } from 'ember-page-title';
import { capitalize } from '@ember/string';
import style from 'ember-style-modifier';

import ShwCarbonizationComparisonGrid from 'showcase/components/shw/carbonization/comparison-grid';
import ShwDivider from 'showcase/components/shw/divider';
import ShwTextH1 from 'showcase/components/shw/text/h1';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';
import ShwFlex from 'showcase/components/shw/flex';
import MUSIC from 'showcase/mocks/folk-music-data';
import POLICIES from 'showcase/mocks/policy-data';
import type { FolkMusic } from 'showcase/mocks/folk-music-data';
import NOOP from 'showcase/utils/noop';
import type Owner from '@ember/owner';

import {
  HdsAdvancedTable,
  HdsAdvancedTableThButtonSort,
  HdsAdvancedTableThButtonTooltip,
  HdsAdvancedTableThSelectable,
  HdsAdvancedTableTd,
  HdsAdvancedTableTh,
  HdsAdvancedTableThButtonExpand,
  HdsDropdownToggleIcon,
  HdsLayoutFlex,
} from '@hashicorp/design-system-components/components';
import type {
  HdsAdvancedTableNormalizedColumn,
  // HdsAdvancedTableModel,
} from '@hashicorp/design-system-components/components/hds/advanced-table/types';
import HdsAdvancedTableThReorderHandle from '@hashicorp/design-system-components/components/hds/advanced-table/th-reorder-handle';
import HdsAdvancedTableThResizeHandle from '@hashicorp/design-system-components/components/hds/advanced-table/th-resize-handle';

const EMPTY_DATA: FolkMusic[] = [];
const STATES = ['default', 'hover', 'active', 'focus'];

export default class AdvancedTableCarbonizationIndex extends Component {
  sortStateColumns: HdsAdvancedTableNormalizedColumn[];
  columns: HdsAdvancedTableNormalizedColumn[];

  constructor(owner: Owner, args: Record<string, never>) {
    super(owner, args);

    this.columns = [
      {
        label: 'Label',
        isVisuallyHidden: true,
        key: 'label',
        width: '200px',
      },
      {
        label: 'Status',
        key: 'status',
        width: '200px',
      },
    ];

    this.sortStateColumns = [
      {
        label: 'Unsorted',
        key: 'unsorted',
        isSortable: true,
      },
      {
        label: 'Ascending',
        key: 'ascending',
        isSortable: true,
      },
      {
        label: 'Descending',
        key: 'descending',
        isSortable: true,
      },
    ];
  }

  returnString = () => '';

  returnUndefined = () => undefined;

  <template>
    {{pageTitle "AdvancedTable - Carbonization"}}

    <ShwTextH1>AdvancedTable - Carbonization</ShwTextH1>

    <ShwTextH2>Density</ShwTextH2>

    <section>
      <ShwTextH3>Short</ShwTextH3>
      <ShwCarbonizationComparisonGrid @layout="side-by-side">
        <:theming>
          <HdsAdvancedTable
            @density="short"
            @columns={{array
              (hash key="artist" label="Artist")
              (hash key="album" label="Album")
              (hash key="year" label="Release Year")
            }}
            @model={{MUSIC}}
          >
            <:body as |B|>
              <B.Tr>
                <B.Th>{{B.data.artist}}</B.Th>
                <B.Td>{{B.data.album}}</B.Td>
                <B.Td>{{B.data.year}}</B.Td>
              </B.Tr>
            </:body>
          </HdsAdvancedTable>
        </:theming>
        <:reference>
          <cds-table size="sm">
            <cds-table-head>
              <cds-table-header-row>
                <cds-table-header-cell>Artist</cds-table-header-cell>
                <cds-table-header-cell>Album</cds-table-header-cell>
                <cds-table-header-cell>Release Year</cds-table-header-cell>
              </cds-table-header-row>
            </cds-table-head>
            <cds-table-body>
              {{#each MUSIC as |row|}}
                <cds-table-row>
                  <cds-table-cell>{{row.artist}}</cds-table-cell>
                  <cds-table-cell>{{row.album}}</cds-table-cell>
                  <cds-table-cell>{{row.year}}</cds-table-cell>
                </cds-table-row>
              {{/each}}
            </cds-table-body>
          </cds-table>
        </:reference>
      </ShwCarbonizationComparisonGrid>

      <ShwTextH3>Medium</ShwTextH3>

      <ShwCarbonizationComparisonGrid @layout="side-by-side">
        <:theming>
          <HdsAdvancedTable
            @density="medium"
            @columns={{array
              (hash key="artist" label="Artist")
              (hash key="album" label="Album")
              (hash key="year" label="Release Year")
            }}
            @model={{MUSIC}}
          >
            <:body as |B|>
              <B.Tr>
                <B.Th>{{B.data.artist}}</B.Th>
                <B.Td>{{B.data.album}}</B.Td>
                <B.Td>{{B.data.year}}</B.Td>
              </B.Tr>
            </:body>
          </HdsAdvancedTable>
        </:theming>
        <:reference>
          <cds-table size="md">
            <cds-table-head>
              <cds-table-header-row>
                <cds-table-header-cell>Artist</cds-table-header-cell>
                <cds-table-header-cell>Album</cds-table-header-cell>
                <cds-table-header-cell>Release Year</cds-table-header-cell>
              </cds-table-header-row>
            </cds-table-head>
            <cds-table-body>
              {{#each MUSIC as |row|}}
                <cds-table-row>
                  <cds-table-cell>{{row.artist}}</cds-table-cell>
                  <cds-table-cell>{{row.album}}</cds-table-cell>
                  <cds-table-cell>{{row.year}}</cds-table-cell>
                </cds-table-row>
              {{/each}}
            </cds-table-body>
          </cds-table>
        </:reference>
      </ShwCarbonizationComparisonGrid>

      <ShwTextH3>Tall</ShwTextH3>

      <ShwCarbonizationComparisonGrid @layout="side-by-side">
        <:theming>
          <HdsAdvancedTable
            @density="tall"
            @columns={{array
              (hash key="artist" label="Artist")
              (hash key="album" label="Album")
              (hash key="year" label="Release Year")
            }}
            @model={{MUSIC}}
          >
            <:body as |B|>
              <B.Tr>
                <B.Th>{{B.data.artist}}</B.Th>
                <B.Td>{{B.data.album}}</B.Td>
                <B.Td>{{B.data.year}}</B.Td>
              </B.Tr>
            </:body>
          </HdsAdvancedTable>
        </:theming>
        <:reference>
          <cds-table size="lg">
            <cds-table-head>
              <cds-table-header-row>
                <cds-table-header-cell>Artist</cds-table-header-cell>
                <cds-table-header-cell>Album</cds-table-header-cell>
                <cds-table-header-cell>Release Year</cds-table-header-cell>
              </cds-table-header-row>
            </cds-table-head>
            <cds-table-body>
              {{#each MUSIC as |row|}}
                <cds-table-row>
                  <cds-table-cell>{{row.artist}}</cds-table-cell>
                  <cds-table-cell>{{row.album}}</cds-table-cell>
                  <cds-table-cell>{{row.year}}</cds-table-cell>
                </cds-table-row>
              {{/each}}
            </cds-table-body>
          </cds-table>
        </:reference>
      </ShwCarbonizationComparisonGrid>
    </section>

    <ShwDivider />

    <ShwTextH2>With Striping</ShwTextH2>

    <section>
      <ShwCarbonizationComparisonGrid @layout="side-by-side">
        <:theming>
          <HdsAdvancedTable
            @columns={{array
              (hash key="artist" label="Artist")
              (hash key="album" label="Album")
              (hash key="year" label="Release Year")
            }}
            @model={{MUSIC}}
            @isStriped={{true}}
          >
            <:body as |B|>
              <B.Tr>
                <B.Th>{{B.data.artist}}</B.Th>
                <B.Td>{{B.data.album}}</B.Td>
                <B.Td>{{B.data.year}}</B.Td>
              </B.Tr>
            </:body>
          </HdsAdvancedTable>
        </:theming>
        <:reference>
          <cds-table use-zebra-styles size="md">
            <cds-table-head>
              <cds-table-header-row>
                <cds-table-header-cell>Artist</cds-table-header-cell>
                <cds-table-header-cell>Album</cds-table-header-cell>
                <cds-table-header-cell>Release Year</cds-table-header-cell>
              </cds-table-header-row>
            </cds-table-head>
            <cds-table-body>
              {{#each MUSIC as |row|}}
                <cds-table-row>
                  <cds-table-cell>{{row.artist}}</cds-table-cell>
                  <cds-table-cell>{{row.album}}</cds-table-cell>
                  <cds-table-cell>{{row.year}}</cds-table-cell>
                </cds-table-row>
              {{/each}}
            </cds-table-body>
          </cds-table>
        </:reference>
      </ShwCarbonizationComparisonGrid>

      <ShwTextH2>With Striping + Selection</ShwTextH2>

      <ShwCarbonizationComparisonGrid @layout="side-by-side">
        <:theming>
          <HdsAdvancedTable
            @model={{MUSIC}}
            @isStriped={{true}}
            @isSelectable={{true}}
            @columns={{array
              (hash
                key="artist" label="Artist" isSortable=true tooltip="Tooltip"
              )
              (hash key="album" label="Album" isSortable=true)
              (hash key="year" label="Release Year" isSortable=true)
            }}
          >
            <:body as |B|>
              <B.Tr
                @selectionKey={{B.data.id}}
                @isSelected={{eq B.data.id "2"}}
              >
                <B.Td>{{B.data.artist}}</B.Td>
                <B.Td>{{B.data.album}}</B.Td>
                <B.Td>{{B.data.year}}</B.Td>
              </B.Tr>
            </:body>
          </HdsAdvancedTable>
        </:theming>
        <:reference>
          <cds-table is-selectable use-zebra-styles size="md">
            <cds-table-head>
              <cds-table-header-row selection-name="header">
                <cds-table-header-cell>Artist</cds-table-header-cell>
                <cds-table-header-cell>Album</cds-table-header-cell>
                <cds-table-header-cell>Release Year</cds-table-header-cell>
              </cds-table-header-row>
            </cds-table-head>
            <cds-table-body>
              {{#each MUSIC as |row|}}
                <cds-table-row
                  selection-name="{{row.id}}"
                  selected={{eq row.id "2"}}
                >
                  <cds-table-cell>{{row.artist}}</cds-table-cell>
                  <cds-table-cell>{{row.album}}</cds-table-cell>
                  <cds-table-cell>{{row.year}}</cds-table-cell>
                </cds-table-row>
              {{/each}}
            </cds-table-body>
          </cds-table>
        </:reference>
      </ShwCarbonizationComparisonGrid>

    </section>

    <ShwDivider />

    <ShwTextH2>With Selection + Sort + Tooltip</ShwTextH2>

    <section>
      <ShwCarbonizationComparisonGrid @layout="side-by-side">
        <:theming>
          <HdsAdvancedTable
            @model={{MUSIC}}
            @isSelectable={{true}}
            @columns={{array
              (hash
                key="artist" label="Artist" isSortable=true tooltip="Tooltip"
              )
              (hash key="album" label="Album" isSortable=true)
              (hash key="year" label="Release Year" isSortable=true)
            }}
          >
            <:body as |B|>
              <B.Tr
                @selectionKey={{B.data.id}}
                @isSelected={{eq B.data.id "2"}}
              >
                <B.Td>{{B.data.artist}}</B.Td>
                <B.Td>{{B.data.album}}</B.Td>
                <B.Td>{{B.data.year}}</B.Td>
              </B.Tr>
            </:body>
          </HdsAdvancedTable>
        </:theming>
        <:reference>
          <cds-table is-sortable is-selectable size="md">
            <cds-table-head>
              <cds-table-header-row selection-name="header">
                <cds-table-header-cell>Artist</cds-table-header-cell>
                <cds-table-header-cell>Album</cds-table-header-cell>
                <cds-table-header-cell>Release Year</cds-table-header-cell>
              </cds-table-header-row>
            </cds-table-head>
            <cds-table-body>
              {{#each MUSIC as |row|}}
                <cds-table-row
                  selection-name="{{row.id}}"
                  selected={{eq row.id "2"}}
                >
                  <cds-table-cell>{{row.artist}}</cds-table-cell>
                  <cds-table-cell>{{row.album}}</cds-table-cell>
                  <cds-table-cell>{{row.year}}</cds-table-cell>
                </cds-table-row>
              {{/each}}
            </cds-table-body>
          </cds-table>
        </:reference>
      </ShwCarbonizationComparisonGrid>
    </section>

    <ShwDivider />

    <ShwTextH2>With sticky columns + header</ShwTextH2>

    <section>
      <ShwCarbonizationComparisonGrid @layout="row">
        <:theming>
          <HdsAdvancedTable
            @model={{MUSIC}}
            @columns={{array
              (hash key="artist" label="Artist" width="auto")
              (hash key="album" label="Album")
              (hash key="quote" label="Quote")
            }}
            @hasStickyFirstColumn={{true}}
            @hasStickyHeader={{true}}
            @maxHeight="220px"
          >
            <:body as |B|>
              <B.Tr>
                <B.Th>{{B.data.artist}}</B.Th>
                <B.Td>{{B.data.album}}</B.Td>
                <B.Td>{{B.data.quote}}</B.Td>
              </B.Tr>
            </:body>
          </HdsAdvancedTable>
        </:theming>
        {{!-- <:reference as |R|>
        <R.NoEquivalent @isCompact={{true}} />
      </:reference> --}}
      </ShwCarbonizationComparisonGrid>
    </section>

    <ShwDivider />

    <ShwTextH2>With column reordering + resizing</ShwTextH2>

    <section>
      <ShwCarbonizationComparisonGrid @layout="column">
        <:theming>
          <HdsAdvancedTable
            @model={{MUSIC}}
            @columns={{array
              (hash key="artist" label="Artist" isSortable=true width="auto")
              (hash key="album" label="Album" isSortable=true)
              (hash key="year" label="Release Year" isSortable=true)
            }}
            @hasReorderableColumns={{true}}
            @hasResizableColumns={{true}}
          >
            <:body as |B|>
              <B.Tr as |R|>
                {{#each R.orderedCells as |C|}}
                  {{#if (eq C.columnKey "artist")}}
                    <B.Th>{{B.data.artist}}</B.Th>
                  {{else if (eq C.columnKey "album")}}
                    <B.Td>{{B.data.album}}</B.Td>
                  {{else}}
                    <B.Td>{{B.data.year}}</B.Td>
                  {{/if}}
                {{/each}}
              </B.Tr>
            </:body>
          </HdsAdvancedTable>
        </:theming>
        {{!-- <:reference as |R|>
        <R.NoEquivalent @isCompact={{true}} />
      </:reference> --}}
      </ShwCarbonizationComparisonGrid>
    </section>

    <ShwDivider />

    <ShwTextH2>With nested rows</ShwTextH2>

    <section>
      <ShwTextH3>HDS nested rows + Carbon expandable rows</ShwTextH3>
      <ShwCarbonizationComparisonGrid @layout="side-by-side">
        <:theming>
          <HdsAdvancedTable
            @model={{POLICIES}}
            @columns={{array
              (hash key="name" label="Policy" width="250px")
              (hash key="status" label="Status")
              (hash key="description" label="Description")
            }}
          >
            <:body as |B|>
              <B.Tr>
                <B.Th>{{B.data.name}}</B.Th>
                <B.Td>{{B.data.status}}</B.Td>
                <B.Td>{{B.data.description}}</B.Td>
              </B.Tr>
            </:body>
          </HdsAdvancedTable>
        </:theming>
        <:reference>
          <cds-table expandable size="md">
            <cds-table-head>
              <cds-table-header-row>
                <cds-table-expand-header-cell />
                <cds-table-header-cell>Policy</cds-table-header-cell>
                <cds-table-header-cell>Status</cds-table-header-cell>
                <cds-table-header-cell>Description</cds-table-header-cell>
              </cds-table-header-row>
            </cds-table-head>
            <cds-table-body>
              <cds-table-row expandable>
                <cds-table-cell>Policy set 1</cds-table-cell>
                <cds-table-cell>PASS</cds-table-cell>
                <cds-table-cell>Description</cds-table-cell>
              </cds-table-row>
              <cds-table-expanded-row colspan="4">
                test-advisory-pass.sentinel; test-hard-mandatory-pass.sentinel
              </cds-table-expanded-row>
              <cds-table-row expandable>
                <cds-table-cell>Policy set 2</cds-table-cell>
                <cds-table-cell>FAIL</cds-table-cell>
                <cds-table-cell />
              </cds-table-row>
              <cds-table-expanded-row colspan="4">
                test-advisory-pass.sentinel; test-hard-mandatory-pass.sentinel
              </cds-table-expanded-row>
            </cds-table-body>
          </cds-table>
        </:reference>
      </ShwCarbonizationComparisonGrid>
    </section>

    <ShwDivider />

    <ShwTextH2>Empty state</ShwTextH2>

    <section>
      <ShwCarbonizationComparisonGrid @layout="column">
        <:theming>
          <HdsAdvancedTable
            @model={{EMPTY_DATA}}
            @columns={{array
              (hash
                key="artist" label="Artist" isSortable=true tooltip="Tooltip"
              )
              (hash key="album" label="Album" isSortable=true)
              (hash key="year" label="Release Year" isSortable=true)
            }}
          >
            <:body as |B|>
              <B.Tr>
                <B.Th>{{B.data.artist}}</B.Th>
                <B.Td>{{B.data.album}}</B.Td>
                <B.Td>{{B.data.year}}</B.Td>
              </B.Tr>
            </:body>
          </HdsAdvancedTable>
        </:theming>
      </ShwCarbonizationComparisonGrid>
    </section>

    <ShwDivider />

    <ShwTextH2>Base Elements</ShwTextH2>

    <ShwTextH3>Th</ShwTextH3>

    {{#each STATES as |state|}}
      <ShwCarbonizationComparisonGrid
        @layout="column"
        @label={{capitalize state}}
      >
        <:theming>
          <div
            class="hds-advanced-table"
            role="grid"
            {{style gridTemplateColumns="repeat(3, 1fr)"}}
          >
            <div class="hds-advanced-table__thead" role="rowgroup">
              <div class="hds-advanced-table__tr" role="row">
                <HdsAdvancedTableTh
                  mock-state-value={{state}}
                  mock-state-selector="button"
                  @column={{get this.sortStateColumns 0}}
                  @tooltip="Here is more information"
                >
                  Unsorted ({{state}})
                </HdsAdvancedTableTh>
                <HdsAdvancedTableTh
                  @column={{get this.sortStateColumns 1}}
                  @sortOrder="asc"
                  mock-state-value={{state}}
                  mock-state-selector="button"
                >
                  Ascending
                </HdsAdvancedTableTh>
                <HdsAdvancedTableTh
                  @column={{get this.sortStateColumns 2}}
                  @sortOrder="desc"
                  mock-state-value={{state}}
                  mock-state-selector="button"
                >
                  Descending
                </HdsAdvancedTableTh>
              </div>
            </div>
          </div>
        </:theming>
      </ShwCarbonizationComparisonGrid>
    {{/each}}

    {{#each STATES as |state|}}
      <ShwCarbonizationComparisonGrid
        @layout="column"
        @label={{capitalize state}}
      >
        <:theming>
          <div
            class="hds-advanced-table hds-advanced-table--density-medium"
            role="grid"
            {{style gridTemplateColumns="repeat(4, 1fr)"}}
          >
            <div
              class="hds-advanced-table__thead hds-advanced-table__thead--has-resizable-columns"
              role="rowgroup"
            >
              <div class="hds-advanced-table__tr" role="row">
                <HdsAdvancedTableTh
                  @isExpandable={{true}}
                  @tooltip="Here is more information"
                  @column={{get this.columns 1}}
                  @hasResizableColumns={{true}}
                  mock-state-value={{state}}
                  mock-state-selector="button"
                >Left</HdsAdvancedTableTh>
                <HdsAdvancedTableTh
                  @align="center"
                  @isExpandable={{true}}
                  @tooltip="Here is more information"
                  @column={{get this.columns 1}}
                  @hasResizableColumns={{true}}
                  mock-state-value={{state}}
                  mock-state-selector="button"
                >Center</HdsAdvancedTableTh>
                <HdsAdvancedTableTh
                  @align="right"
                  @isExpandable={{true}}
                  @tooltip="Here is more information"
                  @column={{get this.columns 1}}
                  @hasResizableColumns={{true}}
                  mock-state-value={{state}}
                  mock-state-selector="button"
                >Right</HdsAdvancedTableTh>
                {{! Note: need a last column to avoid a scrollbar}}
                <HdsAdvancedTableTh>Last column</HdsAdvancedTableTh>
              </div>
            </div>
            <div class="hds-advanced-table__tbody" role="rowgroup">
              <div class="hds-advanced-table__tr" role="row">
                <HdsAdvancedTableTh
                  @isExpandable={{true}}
                  @tooltip="Here is more information"
                >Left</HdsAdvancedTableTh>
                <HdsAdvancedTableTh
                  @align="center"
                  @isExpandable={{true}}
                  @tooltip="Here is more information"
                >Center</HdsAdvancedTableTh>
                <HdsAdvancedTableTh
                  @align="right"
                  @isExpandable={{true}}
                  @tooltip="Here is more information"
                >Right</HdsAdvancedTableTh>
                {{! Note: need a last column to avoid a scrollbar}}
                <HdsAdvancedTableTh>Last column</HdsAdvancedTableTh>
              </div>
            </div>
          </div>
        </:theming>
      </ShwCarbonizationComparisonGrid>
    {{/each}}

    <ShwTextH3>ThSelectable</ShwTextH3>

    <ShwCarbonizationComparisonGrid>
      <:theming>
        {{#let (array false true) as |booleans|}}
          {{#each booleans as |bool1|}}
            {{#each booleans as |bool2|}}
              <div
                class="hds-advanced-table hds-advanced-table--density-medium"
                role="grid"
                {{style gridTemplateColumns="auto 1fr"}}
              >
                <div class="hds-advanced-table__thead" role="rowgroup">
                  <div class="hds-advanced-table__tr" role="row">
                    <HdsAdvancedTableThSelectable
                      @selectionScope="col"
                      @isSelected={{bool1}}
                      @onClickSortBySelected={{if bool2 NOOP}}
                    />
                    <HdsAdvancedTableTh>Lorem</HdsAdvancedTableTh>
                  </div>
                </div>
                <div class="hds-advanced-table__tbody" role="rowgroup">
                  <div class="hds-advanced-table__tr" role="row">
                    <HdsAdvancedTableThSelectable
                      @selectionScope="row"
                      @isSelected={{bool1}}
                    />
                    <HdsAdvancedTableTd>Ipsum</HdsAdvancedTableTd>
                  </div>
                </div>
              </div>
              <br />

              <div
                class="hds-advanced-table hds-advanced-table--density-medium"
                role="grid"
                {{style gridTemplateColumns="auto 1fr"}}
              >
                <div class="hds-advanced-table__thead" role="rowgroup">
                  <div class="hds-advanced-table__tr" role="row">
                    <HdsAdvancedTableThSelectable
                      @selectionScope="col"
                      @isSelected={{bool1}}
                      @onClickSortBySelected={{if bool2 NOOP}}
                      mock-state-value="focus"
                      mock-state-selector="input"
                    />
                    <HdsAdvancedTableTh>Lorem</HdsAdvancedTableTh>
                  </div>
                </div>
                <div class="hds-advanced-table__tbody" role="rowgroup">
                  <div class="hds-advanced-table__tr" role="row">
                    <HdsAdvancedTableThSelectable
                      @selectionScope="row"
                      @isSelected={{bool1}}
                      mock-state-value="focus"
                      mock-state-selector="input"
                    />
                    <HdsAdvancedTableTd>Ipsum</HdsAdvancedTableTd>
                  </div>
                </div>
              </div>
              <br />
            {{/each}}
          {{/each}}
        {{/let}}
      </:theming>
    </ShwCarbonizationComparisonGrid>

    <ShwTextH3>ThButtonTooltip</ShwTextH3>

    <ShwCarbonizationComparisonGrid>
      <:theming>
        {{#each STATES as |state|}}
          <HdsAdvancedTableThButtonTooltip
            @tooltip="Here is more information"
            mock-state-value={{state}}
          />
          <br />
        {{/each}}
      </:theming>
    </ShwCarbonizationComparisonGrid>

    <ShwTextH3>ThButtonSort</ShwTextH3>

    <ShwCarbonizationComparisonGrid>
      <:theming>
        {{#each STATES as |state|}}
          <ShwFlex @direction="row" as |SF|>
            <SF.Item>
              <HdsAdvancedTableThButtonSort mock-state-value={{state}} />
            </SF.Item>
            <SF.Item>
              <HdsAdvancedTableThButtonSort
                @sortOrder="asc"
                mock-state-value={{state}}
              />
            </SF.Item>
            <SF.Item>
              <HdsAdvancedTableThButtonSort
                @sortOrder="desc"
                mock-state-value={{state}}
              />
            </SF.Item>
          </ShwFlex>
        {{/each}}
      </:theming>
    </ShwCarbonizationComparisonGrid>

    <ShwTextH3>ThButtonExpand</ShwTextH3>

    <ShwCarbonizationComparisonGrid>
      <:theming>
        {{#each STATES as |state|}}
          <ShwFlex @direction="row" as |SF|>
            <SF.Item>
              <HdsAdvancedTableThButtonExpand mock-state-value={{state}} />
            </SF.Item>
            <SF.Item>
              <HdsAdvancedTableThButtonExpand
                @isExpanded={{true}}
                mock-state-value={{state}}
              />
            </SF.Item>
          </ShwFlex>
        {{/each}}
      </:theming>
    </ShwCarbonizationComparisonGrid>

    <ShwTextH3>ThContextMenu</ShwTextH3>

    <ShwCarbonizationComparisonGrid>
      <:theming>
        {{#each STATES as |state|}}
          <ShwFlex @direction="row" as |SF|>
            <SF.Item>
              <div class="hds-advanced-table__th-context-menu">
                <HdsDropdownToggleIcon
                  @icon="more-vertical"
                  @text="Context menu"
                  @hasChevron={{false}}
                  @size="small"
                  mock-state-value={{state}}
                />
              </div>
            </SF.Item>
          </ShwFlex>
        {{/each}}
      </:theming>
    </ShwCarbonizationComparisonGrid>

    <ShwTextH3>ThResizeHandle</ShwTextH3>

    <ShwCarbonizationComparisonGrid @layout="column">
      <:theming>
        <div
          class="hds-advanced-table hds-advanced-table--density-medium"
          role="grid"
          {{style gridTemplateColumns="200px 200px 200px 200px 1fr"}}
        >
          <div class="hds-advanced-table__thead" role="rowgroup">
            <div class="hds-advanced-table__tr" role="row">
              {{#each STATES as |state|}}
                <div
                  class="hds-advanced-table__th hds-advanced-table__th--is-resizable"
                  role="columnheader"
                >
                  <HdsLayoutFlex
                    @justify="space-between"
                    @align="center"
                    @gap="8"
                  >
                    <div class="hds-advanced-table__th-content">
                      <span
                        class="hds-advanced-table__th-content-text hds-typography-body-200 hds-font-weight-semibold"
                      >
                        {{capitalize state}}
                      </span>
                    </div>
                    <HdsAdvancedTableThResizeHandle
                      mock-state-value={{state}}
                      @column={{get this.columns 0}}
                      @onApplyTransientWidth={{NOOP}}
                      @onGetAppliedWidth={{this.returnString}}
                      @onGetColumnByKey={{this.returnUndefined}}
                      @onSetTransientColumnWidth={{NOOP}}
                      @onSetTransientColumnWidths={{NOOP}}
                      @onResetTransientColumnWidths={{NOOP}}
                      @onUpdateResizeDebt={{NOOP}}
                      aria-valuenow="200"
                    />
                  </HdsLayoutFlex>
                </div>
              {{/each}}
              <HdsAdvancedTableTh>
                Actions
              </HdsAdvancedTableTh>
            </div>
          </div>
        </div>
      </:theming>
    </ShwCarbonizationComparisonGrid>

    <ShwTextH3>ThReorderHandle</ShwTextH3>

    <ShwCarbonizationComparisonGrid @layout="column">
      <:theming>
        <ShwFlex
          @direction="row"
          class="shw-component-advanced-table-reorder-handle-container"
          as |SF|
        >
          {{#each STATES as |state|}}
            <SF.Item
              {{style position="relative" height="50px"}}
              @grow={{true}}
              @label={{capitalize state}}
            >
              <HdsAdvancedTableThReorderHandle
                mock-state-value={{state}}
                @column={{get this.columns 0}}
                @tableHeight={{110}}
                @onFocusReorderHandle={{NOOP}}
                @onSetDraggedColumnKey={{NOOP}}
                @onStepColumn={{NOOP}}
              />
            </SF.Item>
          {{/each}}
        </ShwFlex>
      </:theming>
    </ShwCarbonizationComparisonGrid>

    <ShwTextH3>ThReorderPreview</ShwTextH3>

    <ShwCarbonizationComparisonGrid @layout="row">
      <:theming>
        <div {{style height="250px" width="100%" position="relative"}}>
          <div
            class="hds-advanced-table__th-reorder-drag-preview"
            {{style height="200px" width="40px" top="unset" left="unset"}}
          ></div>
        </div>
      </:theming>
    </ShwCarbonizationComparisonGrid>
  </template>
}
