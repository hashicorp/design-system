/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsTable } from '@hashicorp/design-system-components/components';
import type { HdsTableSignature } from '@hashicorp/design-system-components/components/hds/table/index';

import type { User } from 'showcase/mocks/user-data';

const COLUMNS = [
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
  { key: 'role', label: 'Role' },
];

const COLUMNS_SORTABLE = [
  { key: 'id', label: 'ID', isSortable: true },
  { key: 'name', label: 'Name', isSortable: true },
  { key: 'email', label: 'Email' },
  { key: 'role', label: 'Role' },
];

interface CodeFragmentWithUserTableSignature {
  Args: {
    model: User[];
    density?: HdsTableSignature['Args']['density'];
    onSort?: HdsTableSignature['Args']['onSort'];
    sortBy?: HdsTableSignature['Args']['sortBy'];
    sortOrder?: HdsTableSignature['Args']['sortOrder'];
  };
}

const CodeFragmentWithUserTable: TemplateOnlyComponent<CodeFragmentWithUserTableSignature> =
  <template>
    <HdsTable
      @model={{@model}}
      @columns={{if @onSort COLUMNS_SORTABLE COLUMNS}}
      @density={{@density}}
      @sortBy={{@sortBy}}
      @sortOrder={{@sortOrder}}
      @onSort={{@onSort}}
    >
      <:body as |B|>
        <B.Tr>
          <B.Td>{{B.data.id}}</B.Td>
          <B.Td>{{B.data.name}}</B.Td>
          <B.Td>{{B.data.email}}</B.Td>
          <B.Td>{{B.data.role}}</B.Td>
        </B.Tr>
      </:body>
    </HdsTable>
  </template>;

export default CodeFragmentWithUserTable;
