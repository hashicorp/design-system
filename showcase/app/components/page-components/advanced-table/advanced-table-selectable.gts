/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { array, hash } from '@ember/helper';
import { deepTracked } from 'ember-deep-tracked';

import { HdsAdvancedTable } from '@hashicorp/design-system-components/components';
import type { HdsAdvancedTableOnSelectionChangeSignature } from '@hashicorp/design-system-components/components/hds/advanced-table/types';

import selectableData from 'showcase/mocks/selectable-item-data';

export interface AdvancedTableSelectableSignature {
  Args: {
    hasSortBySelected?: boolean;
  };
  Element: HTMLDivElement;
}

export default class AdvancedTableSelectable extends Component<AdvancedTableSelectableSignature> {
  @deepTracked model = selectableData;

  onSelectionChangeLogArguments = (
    args: HdsAdvancedTableOnSelectionChangeSignature,
  ) => {
    const {
      selectionKey,
      selectionCheckboxElement,
      selectedRowsKeys,
      selectableRowsStates,
    } = args;

    console.group('onSelectionChangeLogArguments');
    console.log('Selection Key:', selectionKey);
    console.log('Checkbox Element:', selectionCheckboxElement);
    console.log('Selectable Rows Keys:', selectedRowsKeys);
    console.log('Selectable Rows States:', selectableRowsStates);
    console.groupEnd();

    if (selectionKey === 'all' && selectionCheckboxElement) {
      this.model.forEach((modelRow) => {
        modelRow.isSelected = selectionCheckboxElement.checked;
      });
    } else {
      const recordToUpdate = this.model.find(
        (modelRow) => modelRow.id === Number(selectionKey),
      );

      if (recordToUpdate) {
        recordToUpdate.isSelected = !recordToUpdate.isSelected;
      }
    }
  };

  <template>
    <HdsAdvancedTable
      @selectableColumnKey={{if @hasSortBySelected "isSelected"}}
      @isSelectable={{true}}
      @onSelectionChange={{this.onSelectionChangeLogArguments}}
      {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
      @model={{this.model}}
      @columns={{array
        (hash key="lorem" label="Row #")
        (hash key="ipsum" label="Ipsum")
        (hash key="dolor" label="Dolor")
      }}
    >
      <:body as |B|>
        <B.Tr
          {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
          @selectionKey="{{B.data.id}}"
          {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
          @isSelected={{B.data.isSelected}}
          {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
          @selectionAriaLabelSuffix="row #{{B.data.lorem}}"
        >
          {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
          <B.Td>{{B.data.lorem}}</B.Td>
          {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
          <B.Td>{{B.data.ipsum}}</B.Td>
          {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
          <B.Td>{{B.data.dolor}}</B.Td>
        </B.Tr>
      </:body>
    </HdsAdvancedTable>
  </template>
}
