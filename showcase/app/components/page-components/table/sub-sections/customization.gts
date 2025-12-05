/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { array, hash } from '@ember/helper';
import { eq, not } from 'ember-truth-helpers';
import { capitalize } from '@ember/string';

import ShwDivider from 'showcase/components/shw/divider';
import ShwFlex from 'showcase/components/shw/flex';
import ShwGrid from 'showcase/components/shw/grid';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH4 from 'showcase/components/shw/text/h4';
import MUSIC from 'showcase/mocks/folk-music-data';

import { DENSITIES } from '@hashicorp/design-system-components/components/hds/table/index';

import {
  HdsBadge,
  HdsButton,
  HdsButtonSet,
  HdsDropdown,
  HdsIcon,
  HdsLinkInline,
  HdsTable,
} from '@hashicorp/design-system-components/components';

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
                <HdsTable
                  @isSelectable={{bool}}
                  @density={{if (not (eq density "default")) density}}
                >
                  <:head as |H|>
                    <H.Tr>
                      <H.Th>Lorem</H.Th>
                      <H.Th>Ipsum</H.Th>
                      <H.Th>Dolor</H.Th>
                    </H.Tr>
                  </:head>
                  <:body as |B|>
                    <B.Tr @selectionKey="row1">
                      <B.Th>Scope Row</B.Th>
                      <B.Td>Cell Content</B.Td>
                      <B.Td>Cell Content</B.Td>
                    </B.Tr>
                    <B.Tr @selectionKey="row2" @isSelected={{true}}>
                      <B.Th>Scope Row</B.Th>
                      <B.Td>Cell Content</B.Td>
                      <B.Td>Cell Content</B.Td>
                    </B.Tr>
                    <B.Tr @selectionKey="row3">
                      <B.Th>Scope Row</B.Th>
                      <B.Td>Cell Content</B.Td>
                      <B.Td>Cell Content</B.Td>
                    </B.Tr>
                    <B.Tr @selectionKey="row4">
                      <B.Th>Scope Row</B.Th>
                      <B.Td>Cell Content</B.Td>
                      <B.Td>Cell Content</B.Td>
                    </B.Tr>
                  </:body>
                </HdsTable>
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
          <HdsTable @isStriped={{true}} @isSelectable={{bool}}>
            <:head as |H|>
              <H.Tr>
                <H.Th>Lorem</H.Th>
                <H.Th>Ipsum</H.Th>
                <H.Th>Dolor</H.Th>
              </H.Tr>
            </:head>
            <:body as |B|>
              <B.Tr @selectionKey="row1">
                <B.Th>Scope Row</B.Th>
                <B.Td>Cell Content</B.Td>
                <B.Td>Cell Content</B.Td>
              </B.Tr>
              <B.Tr @selectionKey="row2" @isSelected={{true}}>
                <B.Th>Scope Row</B.Th>
                <B.Td>Cell Content</B.Td>
                <B.Td>Cell Content</B.Td>
              </B.Tr>
              <B.Tr @selectionKey="row3">
                <B.Th>Scope Row</B.Th>
                <B.Td>Cell Content</B.Td>
                <B.Td>Cell Content</B.Td>
              </B.Tr>
              <B.Tr @selectionKey="row4">
                <B.Th>Scope Row</B.Th>
                <B.Td>Cell Content</B.Td>
                <B.Td>Cell Content</B.Td>
              </B.Tr>
            </:body>
          </HdsTable>
        </SG.Item>
      {{/each}}
    {{/let}}
  </ShwGrid>

  <ShwDivider @level={{2}} />

  <ShwTextH4 @tag="h3">Sortable table, last column not sortable, visually hidden
    and with custom width.</ShwTextH4>

  <HdsTable
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
        <B.Td>{{B.data.artist}}</B.Td>
        <B.Td>{{B.data.album}}</B.Td>
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
  </HdsTable>

  <ShwTextH4 @tag="h3">Table where last column has right-aligned text</ShwTextH4>

  <HdsTable
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
        <B.Td>{{B.data.artist}}</B.Td>
        <B.Td>{{B.data.album}}</B.Td>
        <B.Td>{{B.data.year}}</B.Td>
        <B.Td @align="right">{{B.data.vinyl-cost}}</B.Td>
      </B.Tr>
    </:body>
  </HdsTable>

  <ShwTextH4 @tag="h3">Table with various cell content</ShwTextH4>

  <HdsTable
    @model={{MUSIC}}
    @columns={{array
      (hash key="artist" label="Artist" isSortable=true)
      (hash key="album" label="Album" isSortable=true)
      (hash key="year" label="Release Year" isSortable=true)
      (hash key="other" label="Additional Actions")
    }}
  >
    <:body as |B|>
      <B.Tr>
        <B.Td>
          <HdsLinkInline @href="#showcase">
            {{B.data.artist}}
          </HdsLinkInline>
        </B.Td>
        <B.Td>
          <div class="shw-component-table-cell-content-div">
            {{#if B.data.icon}}
              <HdsIcon @name={{B.data.icon}} @isInline={{true}} />
            {{/if}}
            {{B.data.album}}
          </div>
        </B.Td>
        <B.Td>
          {{#if B.data.year}}
            <HdsBadge
              @text={{B.data.year}}
              @type="outlined"
              @color={{B.data.badge-color}}
            />
          {{/if}}
        </B.Td>
        <B.Td>
          <HdsButtonSet>
            <HdsButton
              @text="Add"
              @isIconOnly={{true}}
              @icon="plus"
              @size="small"
            />
            <HdsButton
              @text="Edit"
              @isIconOnly={{true}}
              @icon="edit"
              @size="small"
              @color="secondary"
            />
            <HdsButton
              @text="Delete"
              @isIconOnly={{true}}
              @icon="trash"
              @size="small"
              @color="critical"
            />
          </HdsButtonSet>
        </B.Td>
      </B.Tr>
    </:body>
  </HdsTable>

  <ShwTextH4 @tag="h3">Table with multi-line content</ShwTextH4>

  <HdsTable
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
        <B.Td>{{B.data.artist}}</B.Td>
        <B.Td>{{B.data.album}}</B.Td>
        <B.Td>&ldquo;{{B.data.quote}}&rdquo;</B.Td>
      </B.Tr>
    </:body>
  </HdsTable>

  <ShwDivider />
</template>;

export default SubSectionCustomization;
