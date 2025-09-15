/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';

import SELECTABLE_ITEMS from 'showcase/mocks/selectable-item-data';
import type { SelectableItem } from 'showcase/mocks/selectable-item-data.ts';

import { HdsTable } from '@hashicorp/design-system-components/components';
import type { HdsTableSignature } from '@hashicorp/design-system-components/components/hds/table/index';

export interface CodeFragmentWithSelectableDataSignature {
  Args: {
    model?: SelectableItem[];
    columns: HdsTableSignature['Args']['columns'];
    isSelectable?: HdsTableSignature['Args']['isSelectable'];
    selectableColumnKey?: HdsTableSignature['Args']['selectableColumnKey'];
    onSelectionChange?: HdsTableSignature['Args']['onSelectionChange'];
  };
  Element: HTMLDivElement;
}

export default class CodeFragmentWithSelectableData extends Component<CodeFragmentWithSelectableDataSignature> {
  get model(): SelectableItem[] {
    if (this.args.model) {
      return this.args.model;
    } else {
      return SELECTABLE_ITEMS;
    }
  }

  <template>
    <HdsTable
      @model={{this.model}}
      @columns={{@columns}}
      @isSelectable={{true}}
      @selectableColumnKey={{@selectableColumnKey}}
      @onSelectionChange={{@onSelectionChange}}
    >
      <:body as |B|>
        <B.Tr
          @selectionKey="{{B.data.id}}"
          @isSelected={{B.data.isSelected}}
          @selectionAriaLabelSuffix="row #{{B.data.lorem}}"
        >
          <B.Td>{{B.data.lorem}}</B.Td>
          <B.Td>{{B.data.ipsum}}</B.Td>
          <B.Td>{{B.data.dolor}}</B.Td>
        </B.Tr>
      </:body>
    </HdsTable>
  </template>
}
