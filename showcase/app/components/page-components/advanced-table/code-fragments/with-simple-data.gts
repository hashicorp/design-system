/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { get } from '@ember/helper';

import USERS from 'showcase/mocks/user-data';

import { HdsAdvancedTable } from '@hashicorp/design-system-components/components';

import type { HdsAdvancedTableSignature } from '@hashicorp/design-system-components/components/hds/advanced-table/index';

export const DEFAULT_COLUMNS = [
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
  { key: 'role', label: 'Role' },
];

export interface CodeFragmentWithSimpleDataSignature {
  Args: {
    isSelectable?: HdsAdvancedTableSignature['Args']['isSelectable'];
    columns?: HdsAdvancedTableSignature['Args']['columns'];
    density?: HdsAdvancedTableSignature['Args']['density'];
    isStriped?: HdsAdvancedTableSignature['Args']['isStriped'];
    hasTooltips?: boolean;
  };
  Element: HTMLDivElement;
}

export default class CodeFragmentWithSimpleData extends Component<CodeFragmentWithSimpleDataSignature> {
  get columns(): HdsAdvancedTableSignature['Args']['columns'] {
    return this.args.columns ?? DEFAULT_COLUMNS;
  }
  
  model = USERS.slice(0, 4);

  columnsWithTooltips = [
    {
      key: 'id',
      label: 'ID',
      width: 'auto',
      tooltip: 'Unique identifier for the user',
    },
    { key: 'name', label: 'Name', tooltip: 'Full name of the user' },
    { key: 'email', label: 'Email', tooltip: 'User’s email address' },
    { key: 'role', label: 'Role', tooltip: 'User’s role in the system' },
  ];

  <template>
    <HdsAdvancedTable
      @isSelectable={{@isSelectable}}
      @density={{@density}}
      @isStriped={{@isStriped}}
      {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
      @model={{this.model}}
      @columns={{if @hasTooltips this.columnsWithTooltips this.columns}}
    >
      <:body as |B|>
        {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
        <B.Tr @selectionKey="{{B.data.id}}">
          {{#each this.columns as |column|}}
            {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
            <B.Td>{{get B.data column.key}}</B.Td>
          {{/each}}
        </B.Tr>
      </:body>
    </HdsAdvancedTable>
  </template>
}
