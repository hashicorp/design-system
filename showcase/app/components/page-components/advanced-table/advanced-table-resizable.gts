/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';

import {
  HdsAdvancedTable,
  HdsLinkInline,
  HdsButtonSet,
  HdsButton,
  HdsIcon,
  HdsBadge,
} from '@hashicorp/design-system-components/components';

import folkMusic from 'showcase/mocks/folk-data';

export interface AdvancedTableResizableSignature {
  Args: {
    hasSorting?: boolean;
    hasCellTruncation?: boolean;
  };
  Element: HTMLDivElement;
}

export default class AdvancedTableResizable extends Component<AdvancedTableResizableSignature> {
  model = folkMusic;

  columns = [
    {
      key: 'artist',
      label: 'Artist',
      tooltip: 'More information.',
      isSortable: this.args.hasSorting ? true : false,
    },
    {
      key: 'album',
      label: 'Album',
      tooltip: 'More information.',
      width: '350px',
      isSortable: this.args.hasSorting ? true : false,
    },
    {
      key: 'year',
      label: 'Release Year',
      tooltip: 'More information.',
      isSortable: this.args.hasSorting ? true : false,
    },
    {
      key: 'quote',
      label: 'Quote',
      tooltip: 'More information.',
      isSortable: this.args.hasSorting ? true : false,
      width: '400px',
    },
    {
      key: 'other',
      label: 'Additional Actions',
    },
  ];

  <template>
    <HdsAdvancedTable
      {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
      @model={{this.model}}
      @columns={{this.columns}}
      @hasResizableColumns={{true}}
    >
      <:body as |B|>
        {{! @glint-expect-error - this argument shouldn't be required, will be fixed by https://hashicorp.atlassian.net/browse/HDS-5167}}
        <B.Tr @selectionKey="{{B.data.id}}">
          <B.Th @scope="row">
            {{#if @hasCellTruncation}}
              <span class="shw-component-advanced-table-text-truncate">
                <HdsLinkInline @href="#showcase">
                  {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
                  {{B.data.artist}}
                </HdsLinkInline>
              </span>
            {{else}}
              <HdsLinkInline @href="#showcase">
                {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
                {{B.data.artist}}
              </HdsLinkInline>
            {{/if}}
          </B.Th>
          <B.Td>
            <div
              class="{{if
                  @hasCellTruncation
                  'shw-component-advanced-table-text-truncate'
                  'shw-component-advanced-table-cell-content-div'
                }}"
            >
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
              {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
              @type={{B.data.badge-type}}
              {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
              @color={{B.data.badge-color.name}}
            />
          </B.Td>
          <B.Td>
            {{#if @hasCellTruncation}}
              <span class="shw-component-advanced-table-text-truncate">
                {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
                {{B.data.quote}}
              </span>
            {{else}}
              {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
              {{B.data.quote}}
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
    </HdsAdvancedTable>
  </template>
}
