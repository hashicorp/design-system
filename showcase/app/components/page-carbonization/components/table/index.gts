/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { pageTitle } from 'ember-page-title';
import { array, hash } from '@ember/helper';

import ShwTextH1 from 'showcase/components/shw/text/h1';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';
import ShwCarbonizationComparisonGrid from 'showcase/components/shw/carbonization/comparison-grid';

import MUSIC from 'showcase/mocks/folk-music-data';

import Information16 from '@carbon/icons/es/information/16.js';

import setCdsIcon from 'showcase/modifiers/set-cds-icon';

import { HdsTable } from '@hashicorp/design-system-components/components';

const TableCarbonizationIndex: TemplateOnlyComponent = <template>
  {{pageTitle "Table - Carbonization"}}

  <ShwTextH1>Table - Carbonization</ShwTextH1>

  <ShwTextH2>Basic</ShwTextH2>

  <section>
    <ShwCarbonizationComparisonGrid @layout="side-by-side">
      <:theming>
        <HdsTable>
          <:head as |H|>
            <H.Tr>
              <H.Th>Cell Header</H.Th>
              <H.Th>Cell Header</H.Th>
              <H.Th>Cell Header</H.Th>
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
        </HdsTable>
      </:theming>
      <:reference>
        <cds-table>
          <cds-table-head>
            <cds-table-header-row>
              <cds-table-header-cell>Cell Header</cds-table-header-cell>
              <cds-table-header-cell>Cell Header</cds-table-header-cell>
              <cds-table-header-cell>Cell Header</cds-table-header-cell>
            </cds-table-header-row>
          </cds-table-head>
          <cds-table-body>
            <cds-table-row>
              <cds-table-cell>Scope Row</cds-table-cell>
              <cds-table-cell>Cell Content</cds-table-cell>
              <cds-table-cell>Cell Content</cds-table-cell>
            </cds-table-row>
            <cds-table-row>
              <cds-table-cell>Cell Content</cds-table-cell>
              <cds-table-cell>Cell Content</cds-table-cell>
              <cds-table-cell>Cell Content</cds-table-cell>
            </cds-table-row>
            <cds-table-row>
              <cds-table-cell>Cell Content</cds-table-cell>
              <cds-table-cell>Cell Content</cds-table-cell>
              <cds-table-cell>Cell Content</cds-table-cell>
            </cds-table-row>
          </cds-table-body>
        </cds-table>
      </:reference>
    </ShwCarbonizationComparisonGrid>
  </section>

  <ShwTextH2>With Striping</ShwTextH2>

  <section>
    <ShwCarbonizationComparisonGrid @layout="side-by-side">
      <:theming>
        <HdsTable @isStriped={{true}}>
          <:head as |H|>
            <H.Tr>
              <H.Th>Cell Header</H.Th>
              <H.Th>Cell Header</H.Th>
              <H.Th>Cell Header</H.Th>
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
        </HdsTable>
      </:theming>
      <:reference>
        <cds-table use-zebra-styles>
          <cds-table-head>
            <cds-table-header-row>
              <cds-table-header-cell>Cell Header</cds-table-header-cell>
              <cds-table-header-cell>Cell Header</cds-table-header-cell>
              <cds-table-header-cell>Cell Header</cds-table-header-cell>
            </cds-table-header-row>
          </cds-table-head>
          <cds-table-body>
            <cds-table-row>
              <cds-table-cell>Scope Row</cds-table-cell>
              <cds-table-cell>Cell Content</cds-table-cell>
              <cds-table-cell>Cell Content</cds-table-cell>
            </cds-table-row>
            <cds-table-row>
              <cds-table-cell>Cell Content</cds-table-cell>
              <cds-table-cell>Cell Content</cds-table-cell>
              <cds-table-cell>Cell Content</cds-table-cell>
            </cds-table-row>
            <cds-table-row>
              <cds-table-cell>Cell Content</cds-table-cell>
              <cds-table-cell>Cell Content</cds-table-cell>
              <cds-table-cell>Cell Content</cds-table-cell>
            </cds-table-row>
          </cds-table-body>
        </cds-table>
      </:reference>
    </ShwCarbonizationComparisonGrid>
  </section>

  <ShwTextH2>Density</ShwTextH2>

  <section>
    <ShwTextH3>Short</ShwTextH3>
    <ShwCarbonizationComparisonGrid @layout="side-by-side">
      <:theming>
        <HdsTable @density="short">
          <:head as |H|>
            <H.Tr>
              <H.Th>Cell Header</H.Th>
              <H.Th>Cell Header</H.Th>
              <H.Th>Cell Header</H.Th>
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
        </HdsTable>
      </:theming>
      <:reference>
        <cds-table size="sm">
          <cds-table-head>
            <cds-table-header-row>
              <cds-table-header-cell>Cell Header</cds-table-header-cell>
              <cds-table-header-cell>Cell Header</cds-table-header-cell>
              <cds-table-header-cell>Cell Header</cds-table-header-cell>
            </cds-table-header-row>
          </cds-table-head>
          <cds-table-body>
            <cds-table-row>
              <cds-table-cell>Scope Row</cds-table-cell>
              <cds-table-cell>Cell Content</cds-table-cell>
              <cds-table-cell>Cell Content</cds-table-cell>
            </cds-table-row>
            <cds-table-row>
              <cds-table-cell>Cell Content</cds-table-cell>
              <cds-table-cell>Cell Content</cds-table-cell>
              <cds-table-cell>Cell Content</cds-table-cell>
            </cds-table-row>
            <cds-table-row>
              <cds-table-cell>Cell Content</cds-table-cell>
              <cds-table-cell>Cell Content</cds-table-cell>
              <cds-table-cell>Cell Content</cds-table-cell>
            </cds-table-row>
          </cds-table-body>
        </cds-table>
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwTextH3>Medium</ShwTextH3>

    <ShwCarbonizationComparisonGrid @layout="side-by-side">
      <:theming>
        <HdsTable @density="medium">
          <:head as |H|>
            <H.Tr>
              <H.Th>Cell Header</H.Th>
              <H.Th>Cell Header</H.Th>
              <H.Th>Cell Header</H.Th>
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
        </HdsTable>
      </:theming>
      <:reference>
        <cds-table size="md">
          <cds-table-head>
            <cds-table-header-row>
              <cds-table-header-cell>Cell Header</cds-table-header-cell>
              <cds-table-header-cell>Cell Header</cds-table-header-cell>
              <cds-table-header-cell>Cell Header</cds-table-header-cell>
            </cds-table-header-row>
          </cds-table-head>
          <cds-table-body>
            <cds-table-row>
              <cds-table-cell>Scope Row</cds-table-cell>
              <cds-table-cell>Cell Content</cds-table-cell>
              <cds-table-cell>Cell Content</cds-table-cell>
            </cds-table-row>
            <cds-table-row>
              <cds-table-cell>Cell Content</cds-table-cell>
              <cds-table-cell>Cell Content</cds-table-cell>
              <cds-table-cell>Cell Content</cds-table-cell>
            </cds-table-row>
            <cds-table-row>
              <cds-table-cell>Cell Content</cds-table-cell>
              <cds-table-cell>Cell Content</cds-table-cell>
              <cds-table-cell>Cell Content</cds-table-cell>
            </cds-table-row>
          </cds-table-body>
        </cds-table>
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwTextH3>Tall</ShwTextH3>

    <ShwCarbonizationComparisonGrid @layout="side-by-side">
      <:theming>
        <HdsTable @density="tall">
          <:head as |H|>
            <H.Tr>
              <H.Th>Cell Header</H.Th>
              <H.Th>Cell Header</H.Th>
              <H.Th>Cell Header</H.Th>
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
        </HdsTable>
      </:theming>
      <:reference>
        <cds-table size="lg">
          <cds-table-head>
            <cds-table-header-row>
              <cds-table-header-cell>Cell Header</cds-table-header-cell>
              <cds-table-header-cell>Cell Header</cds-table-header-cell>
              <cds-table-header-cell>Cell Header</cds-table-header-cell>
            </cds-table-header-row>
          </cds-table-head>
          <cds-table-body>
            <cds-table-row>
              <cds-table-cell>Scope Row</cds-table-cell>
              <cds-table-cell>Cell Content</cds-table-cell>
              <cds-table-cell>Cell Content</cds-table-cell>
            </cds-table-row>
            <cds-table-row>
              <cds-table-cell>Cell Content</cds-table-cell>
              <cds-table-cell>Cell Content</cds-table-cell>
              <cds-table-cell>Cell Content</cds-table-cell>
            </cds-table-row>
            <cds-table-row>
              <cds-table-cell>Cell Content</cds-table-cell>
              <cds-table-cell>Cell Content</cds-table-cell>
              <cds-table-cell>Cell Content</cds-table-cell>
            </cds-table-row>
          </cds-table-body>
        </cds-table>
      </:reference>
    </ShwCarbonizationComparisonGrid>
  </section>

  <ShwTextH2>With Tooltip</ShwTextH2>

  <section>
    <ShwCarbonizationComparisonGrid @layout="side-by-side">
      <:theming>
        <HdsTable
          @model={{MUSIC}}
          @columns={{array
            (hash key="artist" label="Artist" tooltip="Tooltip")
            (hash key="album" label="Album" tooltip="Tooltip")
            (hash key="year" label="Release Year" tooltip="Tooltip")
          }}
        >
          <:body as |B|>
            <B.Tr>
              <B.Td>{{B.data.artist}}</B.Td>
              <B.Td>{{B.data.album}}</B.Td>
              <B.Td>{{B.data.year}}</B.Td>
            </B.Tr>
          </:body>
        </HdsTable>
      </:theming>
      <:reference>
        <cds-table is-sortable>
          <cds-table-head>
            <cds-table-header-row>
              <cds-table-header-cell>
                <div>
                  Artist
                  <cds-tooltip autoalign>
                    <cds-tag class="sb-tooltip-trigger">
                      <cds-icon
                        slot="icon"
                        {{setCdsIcon Information16}}
                      /></cds-tag>
                    <cds-tooltip-content
                      id="content-0"
                    >Tooltip</cds-tooltip-content>
                  </cds-tooltip>
                </div>
              </cds-table-header-cell>
              <cds-table-header-cell>
                <div>
                  Album
                  <cds-tooltip autoalign>
                    <cds-tag class="sb-tooltip-trigger">
                      <cds-icon
                        slot="icon"
                        {{setCdsIcon Information16}}
                      /></cds-tag>
                    <cds-tooltip-content
                      id="content-1"
                    >Tooltip</cds-tooltip-content>
                  </cds-tooltip>
                </div>
              </cds-table-header-cell>
              <cds-table-header-cell>
                <div>
                  Release Year
                  <cds-tooltip autoalign>
                    <cds-tag class="sb-tooltip-trigger">
                      <cds-icon
                        slot="icon"
                        {{setCdsIcon Information16}}
                      /></cds-tag>
                    <cds-tooltip-content
                      id="content-2"
                    >Tooltip</cds-tooltip-content>
                  </cds-tooltip>
                </div>
              </cds-table-header-cell>
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

  <ShwTextH2>With Sorting</ShwTextH2>

  <section>
    <ShwCarbonizationComparisonGrid @layout="side-by-side">
      <:theming>
        <HdsTable
          @model={{MUSIC}}
          @columns={{array
            (hash key="artist" label="Artist" isSortable=true)
            (hash key="album" label="Album" isSortable=true)
            (hash key="year" label="Release Year" isSortable=true)
          }}
        >
          <:body as |B|>
            <B.Tr>
              <B.Td>{{B.data.artist}}</B.Td>
              <B.Td>{{B.data.album}}</B.Td>
              <B.Td>{{B.data.year}}</B.Td>
            </B.Tr>
          </:body>
        </HdsTable>
      </:theming>
      <:reference>
        <cds-table is-sortable>
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

  <ShwTextH2>With Select</ShwTextH2>

  <section>
    <ShwCarbonizationComparisonGrid @layout="side-by-side">
      <:theming>
        <HdsTable @isSelectable={{true}}>
          <:head as |H|>
            <H.Tr>
              <H.Th>Cell Header</H.Th>
              <H.Th>Cell Header</H.Th>
              <H.Th>Cell Header</H.Th>
            </H.Tr>
          </:head>
          <:body as |B|>
            <B.Tr @selectionKey="row1">
              <B.Th>Scope Row</B.Th>
              <B.Td>Cell Content</B.Td>
              <B.Td>Cell Content</B.Td>
            </B.Tr>
            <B.Tr @selectionKey="row2" @isSelected={{true}}>
              <B.Td>Cell Content</B.Td>
              <B.Td>Cell Content</B.Td>
              <B.Td>Cell Content</B.Td>
            </B.Tr>
            <B.Tr @selectionKey="row3">
              <B.Td>Cell Content</B.Td>
              <B.Td>Cell Content</B.Td>
              <B.Td>Cell Content</B.Td>
            </B.Tr>
          </:body>
        </HdsTable>
      </:theming>
      <:reference>
        <cds-table is-selectable>
          <cds-table-head>
            <cds-table-header-row selection-name="header">
              <cds-table-header-cell>Cell Header</cds-table-header-cell>
              <cds-table-header-cell>Cell Header</cds-table-header-cell>
              <cds-table-header-cell>Cell Header</cds-table-header-cell>
            </cds-table-header-row>
          </cds-table-head>
          <cds-table-body>
            <cds-table-row selection-name="0">
              <cds-table-cell>Scope Row</cds-table-cell>
              <cds-table-cell>Cell Content</cds-table-cell>
              <cds-table-cell>Cell Content</cds-table-cell>
            </cds-table-row>
            <cds-table-row selection-name="1" selected>
              <cds-table-cell>Cell Content</cds-table-cell>
              <cds-table-cell>Cell Content</cds-table-cell>
              <cds-table-cell>Cell Content</cds-table-cell>
            </cds-table-row>
            <cds-table-row selection-name="2">
              <cds-table-cell>Cell Content</cds-table-cell>
              <cds-table-cell>Cell Content</cds-table-cell>
              <cds-table-cell>Cell Content</cds-table-cell>
            </cds-table-row>
          </cds-table-body>
        </cds-table>
      </:reference>
    </ShwCarbonizationComparisonGrid>
  </section>
</template>;

export default TableCarbonizationIndex;
