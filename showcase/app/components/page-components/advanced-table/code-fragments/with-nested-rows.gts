/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { array, hash } from '@ember/helper';

import { HdsAdvancedTable } from '@hashicorp/design-system-components/components';
import type { HdsAdvancedTableSignature } from '@hashicorp/design-system-components/components/hds/advanced-table/index';

export interface CodeFragmentWithNestedRowsSignature {
  Args: {
    model?: HdsAdvancedTableSignature['Args']['model'];
    childrenKey?: HdsAdvancedTableSignature['Args']['childrenKey'];
  };
  Element: HTMLDivElement;
}

const CodeFragmentWithNestedRows: TemplateOnlyComponent<CodeFragmentWithNestedRowsSignature> =
  <template>
    <HdsAdvancedTable
      {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
      @model={{@model}}
      @childrenKey={{@childrenKey}}
      @columns={{array
        (hash key="name" label="Name" isExpandable=true)
        (hash key="description" label="Description")
        (hash key="status" label="Status" width="auto")
      }}
    >
      <:body as |B|>
        {{! @glint-expect-error - this argument shouldn't be required, will be fixed by https://hashicorp.atlassian.net/browse/HDS-5167}}
        <B.Tr @selectionKey="{{B.data.id}}">
          {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
          <B.Th> {{B.data.name}}</B.Th>
          {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
          <B.Td>{{B.data.description}}</B.Td>
          {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
          <B.Td>{{B.data.status}}</B.Td>
        </B.Tr>
      </:body>
    </HdsAdvancedTable>
  </template>;

export default CodeFragmentWithNestedRows;
