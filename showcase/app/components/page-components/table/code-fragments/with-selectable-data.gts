/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import { array, hash } from '@ember/helper';

import SELECTABLE_ITEMS from 'showcase/mocks/selectable-item-data';
import type { SelectableItem } from 'showcase/mocks/selectable-item-data.ts';

import { HdsTable } from '@hashicorp/design-system-components/components';
import type { HdsTableSignature } from '@hashicorp/design-system-components/components/hds/table/index';

export interface CodeFragmentWithSelectableDataSignature {
  Args: HdsTableSignature['Args'] & {
    dataModel?: SelectableItem[];
  };
  Element: HTMLDivElement;
}

export default class CodeFragmentWithSelectableData extends Component<CodeFragmentWithSelectableDataSignature> {
  get dataModel(): SelectableItem[] {
    if (this.args.dataModel) {
      return this.args.dataModel;
    } else {
      return SELECTABLE_ITEMS;
    }
  }

  <template>
    <HdsTable
      @isSelectable={{true}}
      @onSelectionChange={{@onSelectionChange}}
      {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
      @model={{this.dataModel}}
      @columns={{array
        (hash key="lorem" label="Row #")
        (hash key="ipsum" label="Ipsum")
        (hash key="dolor" label="Dolor")
      }}
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
