/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { pageTitle } from 'ember-page-title';
import { array, hash } from '@ember/helper';
import { capitalize } from '@ember/string';
import { eq } from 'ember-truth-helpers';

import ShwTextH1 from 'showcase/components/shw/text/h1';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';
import ShwCarbonizationComparisonGrid from 'showcase/components/shw/carbonization/comparison-grid';
import ShwDivider from 'showcase/components/shw/divider';
import ShwFlex from 'showcase/components/shw/flex';

import MUSIC from 'showcase/mocks/folk-music-data';
import NOOP from 'showcase/utils/noop';

import {
  HdsTable,
  HdsTableTh,
  HdsTableThSelectable,
  HdsTableThSort,
  HdsTableThButtonSort,
  HdsTableThButtonTooltip,
  HdsTableTr,
} from '@hashicorp/design-system-components/components';

const STATES = ['default', 'hover', 'active', 'focus'];

const TableCarbonizationIndex: TemplateOnlyComponent = <template>
  {{pageTitle "Table - Carbonization"}}

  <ShwTextH1>Table - Carbonization</ShwTextH1>

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

  <ShwDivider />

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
        <cds-table use-zebra-styles size="md">
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

  <ShwDivider />

  <ShwTextH2>With Select + Sort + Tooltip</ShwTextH2>

  <section>
    <ShwCarbonizationComparisonGrid @layout="side-by-side">
      <:theming>
        <HdsTable
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
        </HdsTable>
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

  <ShwTextH2>Base Elements</ShwTextH2>

  <ShwTextH3>ThSort</ShwTextH3>

  {{#each STATES as |state|}}
    <ShwCarbonizationComparisonGrid
      @layout="column-stacked"
      @label={{capitalize state}}
    >
      <:theming>
        <HdsTable>
          <:head>
            <HdsTableTr>
              <HdsTableThSort
                mock-state-value={{state}}
                mock-state-selector="button"
                @tooltip="Here is more information"
              >
                Unsorted ({{state}})
              </HdsTableThSort>
              <HdsTableThSort
                @sortOrder="asc"
                mock-state-value={{state}}
                mock-state-selector="button"
              >
                Ascending
              </HdsTableThSort>
              <HdsTableThSort
                @sortOrder="desc"
                mock-state-value={{state}}
                mock-state-selector="button"
              >
                Descending
              </HdsTableThSort>
            </HdsTableTr>
          </:head>
          <:body as |B|>
            <B.Tr>
              <B.Td colspan="3" />
            </B.Tr>
          </:body>
        </HdsTable>
      </:theming>
    </ShwCarbonizationComparisonGrid>
  {{/each}}

  <ShwTextH3>Th</ShwTextH3>
  <ShwCarbonizationComparisonGrid @layout="column-stacked">
    <:theming>
      <HdsTable>
        <:head>
          <HdsTableTr>
            {{#each STATES as |state|}}
              <HdsTableTh
                @tooltip="Here is more information"
                mock-state-value={{state}}
                mock-state-selector="button"
              >
                {{capitalize state}}
              </HdsTableTh>
            {{/each}}
          </HdsTableTr>
        </:head>
        <:body as |B|>
          <B.Tr>
            <B.Td colspan="4" />
          </B.Tr>
        </:body>
      </HdsTable>
    </:theming>
  </ShwCarbonizationComparisonGrid>

  <ShwTextH3>ThSelectable</ShwTextH3>

  <ShwCarbonizationComparisonGrid>
    <:theming>
      {{#let (array false true) as |booleans|}}
        {{#each booleans as |bool1|}}
          {{#each booleans as |bool2|}}
            <HdsTable>
              <:head as |H|>
                <H.Tr>
                  <HdsTableThSelectable
                    @selectionScope="col"
                    @isSelected={{bool1}}
                    @onClickSortBySelected={{if bool2 NOOP}}
                  />
                  <H.Th>Lorem</H.Th>
                </H.Tr>
              </:head>
              <:body as |B|>
                <B.Tr>
                  <HdsTableThSelectable
                    @selectionScope="row"
                    @isSelected={{bool1}}
                  />
                  <B.Td>Ipsum</B.Td>
                </B.Tr>
              </:body>
            </HdsTable>
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
        <HdsTableThButtonTooltip
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
            <HdsTableThButtonSort mock-state-value={{state}} />
          </SF.Item>
          <SF.Item>
            <HdsTableThButtonSort @sortOrder="asc" mock-state-value={{state}} />
          </SF.Item>
          <SF.Item>
            <HdsTableThButtonSort
              @sortOrder="desc"
              mock-state-value={{state}}
            />
          </SF.Item>
        </ShwFlex>
      {{/each}}
    </:theming>
  </ShwCarbonizationComparisonGrid>
</template>;

export default TableCarbonizationIndex;
