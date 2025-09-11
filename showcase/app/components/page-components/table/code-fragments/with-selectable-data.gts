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
      {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
      @model={{this.model}}
      @columns={{@columns}}
      @isSelectable={{true}}
      @selectableColumnKey={{@selectableColumnKey}}
      @onSelectionChange={{@onSelectionChange}}
    >
      <:body as |B|>
        {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
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
    </HdsTable>
  </template>
}
