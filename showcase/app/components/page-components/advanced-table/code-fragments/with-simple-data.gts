/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';

import USERS from 'showcase/mocks/user-data';

import { HdsAdvancedTable } from '@hashicorp/design-system-components/components';
import type { HdsAdvancedTableSignature } from '@hashicorp/design-system-components/components/hds/advanced-table/index';

export interface CodeFragmentWithSimpleDataSignature {
  Args: {
    isSelectable?: boolean;
    density?: HdsAdvancedTableSignature['Args']['density'];
    isStriped?: boolean;
    hasTooltips?: boolean;
  };
  Element: HTMLDivElement;
}

export default class CodeFragmentWithSimpleData extends Component<CodeFragmentWithSimpleDataSignature> {
  model = USERS.slice(0, 4);

  columns = [
    { key: 'id', label: 'ID', width: 'auto' },
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Role' },
  ];

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
          {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
          <B.Td>{{B.data.id}}</B.Td>
          {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
          <B.Td>{{B.data.name}}</B.Td>
          {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
          <B.Td>{{B.data.email}}</B.Td>
          {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
          <B.Td>{{B.data.role}}</B.Td>
        </B.Tr>
      </:body>
    </HdsAdvancedTable>
  </template>
}
