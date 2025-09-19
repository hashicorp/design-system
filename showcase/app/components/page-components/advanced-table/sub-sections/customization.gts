/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { array, hash } from '@ember/helper';
import { capitalize } from '@ember/string';

import ShwDivider from 'showcase/components/shw/divider';
import ShwFlex from 'showcase/components/shw/flex';
import ShwGrid from 'showcase/components/shw/grid';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH4 from 'showcase/components/shw/text/h4';
import MUSIC from 'showcase/mocks/folk-music-data';

import {
  HdsAdvancedTable,
  HdsDropdown,
} from '@hashicorp/design-system-components/components';
import { DENSITIES } from '@hashicorp/design-system-components/components/hds/advanced-table/index';

import CodeFragmentWithSimpleData from 'showcase/components/page-components/advanced-table/code-fragments/with-simple-data';

const SubSectionCustomization: TemplateOnlyComponent = <template>
  <ShwTextH2>Table customization</ShwTextH2>

  <ShwTextH4 @tag="h3">Density</ShwTextH4>

  <ShwFlex @direction="column" @gap="2rem" as |SF|>
    {{#each DENSITIES as |density|}}
      <SF.Item @label={{capitalize density}}>
        <ShwGrid @columns={{2}} @gap="2rem" as |SG|>
          {{#let (array false true) as |booleans|}}
            {{#each booleans as |bool|}}
              <SG.Item>
                <CodeFragmentWithSimpleData
                  @density={{density}}
                  @isSelectable={{bool}}
                />
              </SG.Item>
            {{/each}}
          {{/let}}
        </ShwGrid>
      </SF.Item>
    {{/each}}
  </ShwFlex>

  <ShwDivider @level={{2}} />

  <ShwTextH4 @tag="h3">Striping</ShwTextH4>

  <ShwGrid @columns={{2}} @gap="2rem" as |SG|>
    {{#let (array false true) as |booleans|}}
      {{#each booleans as |bool|}}
        <SG.Item>
          <CodeFragmentWithSimpleData
            @isStriped={{true}}
            @isSelectable={{bool}}
          />
        </SG.Item>
      {{/each}}
    {{/let}}
  </ShwGrid>

  <ShwDivider @level={{2}} />

  <ShwTextH4 @tag="h3">Sortable table, last column not sortable, visually hidden
    and with custom width.</ShwTextH4>

  <HdsAdvancedTable
    {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
    @model={{MUSIC}}
    @columns={{array
      (hash key="artist" label="Artist" isSortable=true)
      (hash key="album" label="Album" isSortable=true)
      (hash key="year" label="Release Year" isSortable=true)
      (hash
        key="other"
        label="Select an action from the menu"
        width="55px"
        isVisuallyHidden=true
      )
    }}
    @valign="middle"
  >
    <:body as |B|>
      <B.Tr>
        {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
        <B.Td>{{B.data.artist}}</B.Td>
        {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
        <B.Td>{{B.data.album}}</B.Td>
        {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
        <B.Td>{{B.data.year}}</B.Td>
        <B.Td @align="right">
          <HdsDropdown @isInline={{true}} as |dd|>
            <dd.ToggleIcon
              @icon="more-horizontal"
              @text="Overflow Options"
              @hasChevron={{false}}
              @size="small"
            />
            <dd.Interactive
              @route="page-components.table"
            >Create</dd.Interactive>
            <dd.Interactive @route="page-components.table">Read</dd.Interactive>
            <dd.Interactive
              @route="page-components.table"
            >Update</dd.Interactive>
            <dd.Separator />
            <dd.Interactive
              @route="page-components.table"
              @color="critical"
              @icon="trash"
            >Delete</dd.Interactive>
          </HdsDropdown>
        </B.Td>
      </B.Tr>
    </:body>
  </HdsAdvancedTable>

  <ShwTextH4 @tag="h3">Table where last column has right-aligned text</ShwTextH4>

  <HdsAdvancedTable
    {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
    @model={{MUSIC}}
    @columns={{array
      (hash key="artist" label="Artist" isSortable=true)
      (hash key="album" label="Album" isSortable=true)
      (hash key="year" label="Release Year" isSortable=true)
      (hash key="vinyl-cost" label="Vinyl Cost (USD)" align="right")
    }}
  >
    <:body as |B|>
      <B.Tr>
        {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
        <B.Td>{{B.data.artist}}</B.Td>
        {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
        <B.Td>{{B.data.album}}</B.Td>
        {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
        <B.Td>{{B.data.year}}</B.Td>
        {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
        <B.Td @align="right">{{B.data.vinyl-cost}}</B.Td>
      </B.Tr>
    </:body>
  </HdsAdvancedTable>

  <ShwTextH4 @tag="h3">Table with multi-line content</ShwTextH4>

  <HdsAdvancedTable
    {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
    @model={{MUSIC}}
    @caption="table with multi-line content"
    @columns={{array
      (hash key="artist" label="Artist")
      (hash key="album" label="Album")
      (hash key="quote" label="Quote" width="50%")
    }}
  >
    <:body as |B|>
      <B.Tr>
        {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
        <B.Td>{{B.data.artist}}</B.Td>
        {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
        <B.Td>{{B.data.album}}</B.Td>
        {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
        <B.Td>&ldquo;{{B.data.quote}}&rdquo;</B.Td>
      </B.Tr>
    </:body>
  </HdsAdvancedTable>

  <ShwDivider />
</template>;

export default SubSectionCustomization;
