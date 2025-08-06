/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsAdvancedTable } from '@hashicorp/design-system-components/components';

import type { HdsAdvancedTableSignature } from '@hashicorp/design-system-components/components/hds/advanced-table/index';

import folkMusic from 'showcase/mocks/folk-data';

export interface AdvancedTableWithLongCellSignature {
  Args: {
    columns: HdsAdvancedTableSignature['Args']['columns'];
    isSelectable?: HdsAdvancedTableSignature['Args']['isSelectable'];
  };
  Element: HTMLDivElement;
}

const AdvancedTableWithLongCell: TemplateOnlyComponent<AdvancedTableWithLongCellSignature> =
  <template>
    <HdsAdvancedTable
      {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
      @model={{folkMusic}}
      @columns={{@columns}}
      @isSelectable={{@isSelectable}}
    >
      <:body as |B|>
        {{! @glint-expect-error - this argument shouldn't be required, will be fixed by https://hashicorp.atlassian.net/browse/HDS-5167}}
        <B.Tr @selectionKey="{{B.data.id}}">
          {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
          <B.Td>{{B.data.artist}}</B.Td>
          {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
          <B.Td>{{B.data.album}}</B.Td>
          {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
          <B.Td>&ldquo;{{B.data.quote}}&rdquo;</B.Td>
        </B.Tr>
      </:body>
    </HdsAdvancedTable>
  </template>;

export default AdvancedTableWithLongCell;
