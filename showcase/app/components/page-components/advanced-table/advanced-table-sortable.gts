/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsAdvancedTable } from '@hashicorp/design-system-components/components';

import type { HdsAdvancedTableSignature } from '@hashicorp/design-system-components/components/hds/advanced-table/index';

import folkMusic from 'showcase/mocks/folk-data';

export interface AdvancedTableSortableSignature {
  Args: {
    columns: HdsAdvancedTableSignature['Args']['columns'];
    alignColumnRight?: boolean;
    sortBy?: HdsAdvancedTableSignature['Args']['sortBy'];
    sortOrder?: HdsAdvancedTableSignature['Args']['sortOrder'];
  };
  Element: HTMLDivElement;
}

const AdvancedTableSortable: TemplateOnlyComponent<AdvancedTableSortableSignature> =
  <template>
    <HdsAdvancedTable
      {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
      @model={{folkMusic}}
      @columns={{@columns}}
      @sortBy={{@sortBy}}
      @sortOrder={{@sortOrder}}
    >
      <:body as |B|>
        {{! @glint-expect-error - this argument shouldn't be required, will be fixed by https://hashicorp.atlassian.net/browse/HDS-5167}}
        <B.Tr @selectionKey="{{B.data.id}}">
          {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
          <B.Td>{{B.data.artist}}</B.Td>
          {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
          <B.Td>{{B.data.album}}</B.Td>
          {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
          <B.Td @align={{if @alignColumnRight "right"}}>{{B.data.year}}</B.Td>
        </B.Tr>
      </:body>
    </HdsAdvancedTable>
  </template>;

export default AdvancedTableSortable;
