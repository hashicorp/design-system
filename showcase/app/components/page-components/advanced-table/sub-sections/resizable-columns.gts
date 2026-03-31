/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { array, hash } from '@ember/helper';
import { eq } from 'ember-truth-helpers';

import ShwDivider from 'showcase/components/shw/divider';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH4 from 'showcase/components/shw/text/h4';
import MUSIC from 'showcase/mocks/folk-music-data';

import {
  HdsAdvancedTable,
  HdsBadge,
  HdsButton,
  HdsButtonSet,
  HdsIcon,
  HdsLinkInline,
} from '@hashicorp/design-system-components/components';

const BASE_COLUMNS = [
  {
    key: 'artist',
    label: 'Artist',
    tooltip: 'More information.',
  },
  {
    key: 'album',
    label: 'Album',
    tooltip: 'More information.',
    width: '350px',
  },
  {
    key: 'year',
    label: 'Release Year',
    tooltip: 'More information.',
  },
  {
    key: 'other',
    label: 'Additional Actions',
  },
];

const SORTABLE_COLUMNS = BASE_COLUMNS.map((column, index) => {
  return {
    ...column,
    // last column is not sortable
    isSortable: index !== BASE_COLUMNS.length - 1,
  };
});

const SubSectionResizableColumns: TemplateOnlyComponent = <template>
  <ShwTextH2>Resizable columns</ShwTextH2>

  <HdsAdvancedTable
    {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
    @model={{MUSIC}}
    @columns={{BASE_COLUMNS}}
    @hasResizableColumns={{true}}
  >
    <:body as |B|>
      <B.Tr>
        <B.Th @scope="row"><HdsLinkInline @href="#showcase">
            {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
            {{B.data.artist}}
          </HdsLinkInline></B.Th>
        <B.Td>
          <div class="shw-component-advanced-table-cell-content-div">
            {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
            <HdsIcon @name={{B.data.icon}} @isInline={{true}} />
            {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
            {{B.data.album}}
          </div>
        </B.Td>
        <B.Td>
          <HdsBadge
            {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
            @text={{B.data.year}}
            @type="outlined"
            {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
            @color={{B.data.badge-color}}
          />
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
  </HdsAdvancedTable>

  <ShwTextH4 @tag="h3">Resizable columns with sorting</ShwTextH4>

  <HdsAdvancedTable
    {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
    @model={{MUSIC}}
    @columns={{SORTABLE_COLUMNS}}
    @hasResizableColumns={{true}}
  >
    <:body as |B|>
      <B.Tr>
        <B.Th @scope="row"><HdsLinkInline @href="#showcase">
            {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
            {{B.data.artist}}
          </HdsLinkInline></B.Th>
        <B.Td>
          <div class="shw-component-advanced-table-cell-content-div">
            {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
            <HdsIcon @name={{B.data.icon}} @isInline={{true}} />
            {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
            {{B.data.album}}
          </div>
        </B.Td>
        <B.Td>
          <HdsBadge
            {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
            @text={{B.data.year}}
            @type="outlined"
            {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
            @color={{B.data.badge-color}}
          />
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
  </HdsAdvancedTable>

  <ShwTextH4 @tag="h3">Resizable columns with truncated cell content</ShwTextH4>

  <HdsAdvancedTable
    {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
    @model={{MUSIC}}
    @columns={{array
      (hash key="artist" label="Artist")
      (hash key="album" label="Album")
      (hash key="quote" label="Quote" width="400px")
    }}
    @hasResizableColumns={{true}}
  >
    <:body as |B|>
      <B.Tr>
        <B.Th @scope="row"><HdsLinkInline @href="#showcase">
            {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
            {{B.data.artist}}
          </HdsLinkInline></B.Th>
        <B.Td>
          <div class="shw-component-advanced-table-cell-content-div">
            {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
            <HdsIcon @name={{B.data.icon}} @isInline={{true}} />
            <span class="shw-component-advanced-table-text-truncate">
              {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
              {{B.data.album}}
            </span>
          </div>
        </B.Td>
        <B.Td>
          <span class="shw-component-advanced-table-text-truncate">
            {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
            {{B.data.quote}}
          </span>
        </B.Td>
      </B.Tr>
    </:body>
  </HdsAdvancedTable>

  <ShwTextH4 @tag="h3">Resizable and reorderable columns</ShwTextH4>

  <HdsAdvancedTable
    {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
    @model={{MUSIC}}
    @columns={{BASE_COLUMNS}}
    @hasResizableColumns={{true}}
    @hasReorderableColumns={{true}}
  >
    <:body as |B|>
      {{! @glint-expect-error - this argument shouldn't be required, will be fixed by https://hashicorp.atlassian.net/browse/HDS-5167}}
      <B.Tr @selectionKey="{{B.data.id}}" as |R|>
        {{#each R.orderedCells as |C|}}
          {{#if (eq C.columnKey "artist")}}
            <B.Th @scope="row"><HdsLinkInline @href="#showcase">
                {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
                {{B.data.artist}}
              </HdsLinkInline></B.Th>
          {{else}}
            <B.Td>
              {{#if (eq C.columnKey "album")}}
                <div class="shw-component-advanced-table-cell-content-div">
                  {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
                  <HdsIcon @name={{B.data.icon}} @isInline={{true}} />
                  {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
                  {{B.data.album}}
                </div>
              {{else if (eq C.columnKey "year")}}
                <HdsBadge
                  {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
                  @text={{B.data.year}}
                  @type="outlined"
                  {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
                  @color={{B.data.badge-color}}
                />
              {{else}}
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
              {{/if}}
            </B.Td>
          {{/if}}
        {{/each}}
      </B.Tr>
    </:body>
  </HdsAdvancedTable>

  <ShwDivider />
</template>;

export default SubSectionResizableColumns;
