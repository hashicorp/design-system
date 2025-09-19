/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { array, hash, get } from '@ember/helper';
import { eq, or } from 'ember-truth-helpers';
import { formatDate } from 'ember-intl';

import ShwDivider from 'showcase/components/shw/divider';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH4 from 'showcase/components/shw/text/h4';
import MUSIC from 'showcase/mocks/folk-music-data';
import INFRASTRUCTURE_RESOURCES from 'showcase/mocks/infrastructure-data';

import CodeFragmentWithMultiSelect from 'showcase/components/page-components/advanced-table/code-fragments/with-multi-select';

import {
  HdsAdvancedTable,
  HdsBadge,
  HdsButton,
  HdsButtonSet,
  HdsIcon,
  HdsLayoutFlex,
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

const SubSectionReorderableColumns: TemplateOnlyComponent = <template>
  <ShwTextH2>Reorderable columns</ShwTextH2>

  <HdsAdvancedTable
    {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
    @model={{MUSIC}}
    @columns={{BASE_COLUMNS}}
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

  <ShwTextH4 @tag="h3">Reorderable columns with sorting</ShwTextH4>

  <HdsAdvancedTable
    {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
    @model={{MUSIC}}
    @columns={{SORTABLE_COLUMNS}}
    @hasReorderableColumns={{true}}
  >
    <:body as |B|>
      <B.Tr as |R|>
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

  <ShwTextH4 @tag="h3">Reorderable columns with sticky header</ShwTextH4>

  <HdsAdvancedTable
    {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
    @model={{MUSIC}}
    @columns={{SORTABLE_COLUMNS}}
    @hasReorderableColumns={{true}}
    @hasStickyHeader={{true}}
    @maxHeight="200px"
  >
    <:body as |B|>
      <B.Tr as |R|>
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

  <ShwTextH4 @tag="h3">Reorderable columns with horizontal overflow</ShwTextH4>

  <div>
    <HdsAdvancedTable
      @isSelectable={{true}}
      {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
      @model={{INFRASTRUCTURE_RESOURCES}}
      @columns={{array
        (hash key="resource_id" label="Resource ID" width="350px")
        (hash key="status" label="Current Status" width="175px")
        (hash key="namespace" label="Namespace")
        (hash key="provider_name" label="Provider Name" width="175px")
        (hash key="created_at" label="Created At" width="175px")
        (hash key="last_run_time" label="Last Run" width="175px")
        (hash key="lease_duration" label="Lease Duration" width="175px")
        (hash key="workspace" label="Workspace")
        (hash key="datacenter" label="Datacenter")
        (hash key="job_spec_version" label="Job Spec Version" width="200px")
        (hash key="attached_policies" label="Attached Policies" width="200px")
        (hash key="target_endpoint" label="Target Endpoint")
        (hash key="audit_device_path" label="Audit Device Path")
        (hash key="tags" label="Tags")
      }}
      @hasReorderableColumns={{true}}
    >
      <:body as |B|>
        <B.Tr
          {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
          @selectionKey="{{B.data.id}}"
          {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
          @isSelected={{B.data.isSelected}}
          {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
          @selectionAriaLabelSuffix="row #{{B.data.lorem}}"
          as |R|
        >
          {{#each R.orderedCells as |C|}}
            <B.Td>
              {{#if (eq C.columnKey "status")}}
                {{#if (eq (get B.data "status") "failing")}}
                  <HdsBadge
                    @text="Failing"
                    @color="critical"
                    @icon="x"
                    @type="outlined"
                  />
                {{else if (eq (get B.data "status") "active")}}
                  <HdsBadge
                    @text="Active"
                    @color="success"
                    @icon="check"
                    @type="outlined"
                  />
                {{else if (eq (get B.data "status") "pending")}}
                  <HdsBadge
                    @text="Pending"
                    @color="neutral"
                    @icon="loading"
                    @type="outlined"
                  />
                {{else if (eq (get B.data "status") "establishing")}}
                  <HdsBadge
                    @text="Establishing"
                    @color="highlight"
                    @icon="loading"
                    @type="outlined"
                  />
                {{/if}}
              {{else if
                (or
                  (eq C.columnKey "created_at") (eq C.columnKey "last_run_time")
                )
              }}
                {{#if (eq C.columnKey "created_at")}}
                  {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
                  {{formatDate (get B.data "created_at")}}
                {{else}}
                  {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
                  {{formatDate (get B.data "last_run_time")}}
                {{/if}}
              {{else if
                (or
                  (eq C.columnKey "attached_policies") (eq C.columnKey "tags")
                )
              }}
                <HdsLayoutFlex @align="center" @gap="4">
                  {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
                  {{#each C.content as |content|}}
                    <HdsBadge
                      @text={{content}}
                      @type="outlined"
                      @color="neutral"
                    />
                  {{/each}}
                </HdsLayoutFlex>
              {{else}}
                {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
                {{C.content}}
              {{/if}}
            </B.Td>
          {{/each}}
        </B.Tr>
      </:body>
    </HdsAdvancedTable>
  </div>

  <ShwTextH4 @tag="h3">Reorderable columns with selectable rows</ShwTextH4>

  <div>
    <CodeFragmentWithMultiSelect
      @columns={{array
        (hash key="lorem" label="Row #" isSortable=true)
        (hash key="ipsum" label="Ipsum")
        (hash key="dolor" label="Dolor")
      }}
      @hasReorderableColumns={{true}}
    />
  </div>

  <ShwDivider @level={{2}} />
</template>;

export default SubSectionReorderableColumns;
