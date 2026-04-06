/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { array, hash } from '@ember/helper';

import { HdsAdvancedTable } from '@hashicorp/design-system-components/components';
import type { HdsAdvancedTableSignature } from '@hashicorp/design-system-components/components/hds/advanced-table/index';
import type { Policy } from 'showcase/mocks/policy-data';

export interface CodeFragmentWithNestedRowsSignature {
  Args: {
    model: Policy[];
    childrenKey?: HdsAdvancedTableSignature['Args']['childrenKey'];
  };
  Element: HTMLDivElement;
}

const CodeFragmentWithNestedRows: TemplateOnlyComponent<CodeFragmentWithNestedRowsSignature> =
  <template>
    <HdsAdvancedTable
      @model={{@model}}
      @childrenKey={{@childrenKey}}
      @columns={{array
        (hash key="name" label="Name" isExpandable=true)
        (hash key="description" label="Description")
        (hash key="status" label="Status" width="auto")
      }}
    >
      <:body as |B|>
        <B.Tr @selectionKey="{{B.data.id}}">
          <B.Th> {{B.data.name}}</B.Th>
          <B.Td>{{B.data.description}}</B.Td>
          <B.Td>{{B.data.status}}</B.Td>
        </B.Tr>
      </:body>
    </HdsAdvancedTable>
  </template>;

export default CodeFragmentWithNestedRows;
