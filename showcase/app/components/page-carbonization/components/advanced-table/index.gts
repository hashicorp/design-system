/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { array, hash } from '@ember/helper';
import { eq } from 'ember-truth-helpers';
import { pageTitle } from 'ember-page-title';

import ShwCarbonizationComparisonGrid from 'showcase/components/shw/carbonization/comparison-grid';
import ShwDivider from 'showcase/components/shw/divider';
import ShwTextH1 from 'showcase/components/shw/text/h1';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';
import MUSIC from 'showcase/mocks/folk-music-data';
import POLICIES from 'showcase/mocks/policy-data';

import { HdsAdvancedTable } from '@hashicorp/design-system-components/components';

const AdvancedTableCarbonizationIndex: TemplateOnlyComponent = <template>
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
            (hash key="artist" label="Artist" isSortable=true tooltip="Tooltip")
            (hash key="album" label="Album" isSortable=true)
            (hash key="year" label="Release Year" isSortable=true)
          }}
        >
          <:body as |B|>
            <B.Tr @selectionKey={{B.data.id}} @isSelected={{eq B.data.id "2"}}>
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
            (hash key="artist" label="Artist" isSortable=true tooltip="Tooltip")
            (hash key="album" label="Album" isSortable=true)
            (hash key="year" label="Release Year" isSortable=true)
          }}
        >
          <:body as |B|>
            <B.Tr @selectionKey={{B.data.id}} @isSelected={{eq B.data.id "2"}}>
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
    <ShwCarbonizationComparisonGrid @layout="side-by-side">
      <:theming>
        <HdsAdvancedTable
          @model={{MUSIC}}
          @columns={{array
            (hash key="artist" label="Artist" width="240px")
            (hash key="album" label="Album" width="320px")
            (hash key="quote" label="Quote" width="520px")
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
      <:reference as |R|>
        <R.NoEquivalent @isCompact={{true}} />
      </:reference>
    </ShwCarbonizationComparisonGrid>
  </section>

  <ShwDivider />

  <ShwTextH2>With column reordering + resizing</ShwTextH2>

  <section>
    <ShwCarbonizationComparisonGrid @layout="side-by-side">
      <:theming>
        <HdsAdvancedTable
          @model={{MUSIC}}
          @columns={{array
            (hash key="artist" label="Artist" isSortable=true)
            (hash key="album" label="Album" isSortable=true width="320px")
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
      <:reference as |R|>
        <R.NoEquivalent @isCompact={{true}} />
      </:reference>
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
            (hash key="name" label="Policy")
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
</template>;

export default AdvancedTableCarbonizationIndex;
