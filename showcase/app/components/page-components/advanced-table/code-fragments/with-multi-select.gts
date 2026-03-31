/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { deepTracked } from 'ember-deep-tracked';

import SELECTABLE_ITEMS from 'showcase/mocks/selectable-item-data';

import { HdsAdvancedTable } from '@hashicorp/design-system-components/components';
import type { HdsAdvancedTableSignature } from '@hashicorp/design-system-components/components/hds/advanced-table/index';
import type { HdsAdvancedTableOnSelectionChangeSignature } from '@hashicorp/design-system-components/components/hds/advanced-table/types';

export interface CodeFragmentWithMultiSelectSignature {
  Args: {
    columns: HdsAdvancedTableSignature['Args']['columns'];
    hasSortBySelected?: boolean;
    hasReorderableColumns?: HdsAdvancedTableSignature['Args']['hasReorderableColumns'];
    selectableColumnKey?: HdsAdvancedTableSignature['Args']['selectableColumnKey'];
  };
  Element: HTMLDivElement;
}

export default class CodeFragmentWithMultiSelect extends Component<CodeFragmentWithMultiSelectSignature> {
  @deepTracked data = [...SELECTABLE_ITEMS];

  // Sortable table with model and sorting by selected row
  onSelectionChangeWithSortBySelected = ({
    selectionKey,
    selectionCheckboxElement,
  }: HdsAdvancedTableOnSelectionChangeSignature) => {
    if (selectionKey === 'all' && selectionCheckboxElement) {
      this.data.forEach((modelRow) => {
        modelRow.isSelected = selectionCheckboxElement.checked;
      });
    } else {
      const recordToUpdate = this.data.find(
        (modelRow) => modelRow.id === Number(selectionKey),
      );

      if (recordToUpdate) {
        recordToUpdate.isSelected = !recordToUpdate.isSelected;
      }
    }
  };

  onSelectionChange = (args: HdsAdvancedTableOnSelectionChangeSignature) => {
    console.group('onSelectionChange');
    console.log('Selection Key:', args.selectionKey);
    console.log('Checkbox Element:', args.selectionCheckboxElement);
    console.log('Selectable Rows Keys:', args.selectedRowsKeys);
    console.log('Selectable Rows States:', args.selectableRowsStates);
    console.groupEnd();

    if (this.args.hasSortBySelected) {
      this.onSelectionChangeWithSortBySelected(args);
    }
  };

  <template>
    <HdsAdvancedTable
      @isSelectable={{true}}
      @onSelectionChange={{this.onSelectionChange}}
      {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
      @model={{this.data}}
      @columns={{@columns}}
      @hasReorderableColumns={{@hasReorderableColumns}}
      @selectableColumnKey={{@selectableColumnKey}}
    >
      <:body as |B|>
        <B.Tr
          {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
          @selectionKey="{{B.data.id}}"
          {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
          @isSelected={{B.data.isSelected}}
          as |R|
        >
          {{#if @hasReorderableColumns}}
            {{#each R.orderedCells as |C|}}
              <B.Td>
                {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
                {{C.content}}
              </B.Td>
            {{/each}}
          {{else}}
            {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
            <B.Td>{{B.data.lorem}}</B.Td>
            {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
            <B.Td>{{B.data.ipsum}}</B.Td>
            {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
            <B.Td>{{B.data.dolor}}</B.Td>
          {{/if}}
        </B.Tr>
      </:body>
    </HdsAdvancedTable>
  </template>
}
