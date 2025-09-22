/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { array, hash, fn } from '@ember/helper';
import { eq } from 'ember-truth-helpers';
import { tracked } from '@glimmer/tracking';
import { deepTracked } from 'ember-deep-tracked';

import ShwTextH4 from 'showcase/components/shw/text/h4';
import SELECTABLE_ITEMS from 'showcase/mocks/selectable-item-data';

import CodeFragmentWithSelectableData from '../with-selectable-data';

// HDS Components
import { HdsTable } from '@hashicorp/design-system-components/components';

import type { HdsTableOnSelectionChangeSignature } from '@hashicorp/design-system-components/components/hds/table/types';
import type { SelectableItem } from 'showcase/mocks/selectable-item-data.ts';

export interface CodeFragmentWithMultiSelectSortingSignature {
  Element: HTMLElement;
}

export default class CodeFragmentWithMultiSelectSorting extends Component<CodeFragmentWithMultiSelectSortingSignature> {
  @deepTracked selectableData = structuredClone(SELECTABLE_ITEMS);
  @tracked customSortBy: keyof SelectableItem | undefined = undefined;
  @tracked customSortOrder = 'asc';
  @deepTracked selectableDataNoModel = structuredClone(SELECTABLE_ITEMS);

  get sortedSelectableData() {
    const clonedSelectableData = Array.from(this.selectableDataNoModel);
    clonedSelectableData.sort((s1: SelectableItem, s2: SelectableItem) => {
      if (this.customSortBy) {
        const v1 = s1[this.customSortBy];
        const v2 = s2[this.customSortBy];
        if (v1 < v2) {
          return this.customSortOrder === 'asc' ? -1 : 1;
        }
        if (v1 > v2) {
          return this.customSortOrder === 'asc' ? 1 : -1;
        }
      }
      return 0;
    });
    return clonedSelectableData;
  }

  customOnSort = (sortBy: string, sortOrder: string) => {
    this.customSortBy = sortBy as keyof SelectableItem;
    this.customSortOrder = sortOrder;
  };

  onSelectionChange = ({
    selectionKey,
    selectionCheckboxElement,
  }: HdsTableOnSelectionChangeSignature) => {
    console.group(
      'CodeFragmentWithMultiSelectSorting onSelectionChange invoked with arguments:',
    );
    console.log('Selection Key:', selectionKey);
    console.log('Checkbox Element:', selectionCheckboxElement);
    console.groupEnd();
    if (selectionKey) {
      if (selectionKey === 'all' && selectionCheckboxElement) {
        this.selectableData.forEach((modelRow: SelectableItem) => {
          modelRow.isSelected = selectionCheckboxElement.checked;
        });
      } else {
        const recordToUpdate = this.selectableData.find(
          (modelRow: SelectableItem) => modelRow.id === Number(selectionKey),
        );

        if (recordToUpdate) {
          recordToUpdate.isSelected = !recordToUpdate.isSelected;
        }
      }
    }
  };

  onSelectionChangeNoModel = ({
    selectionKey,
    selectionCheckboxElement,
  }: HdsTableOnSelectionChangeSignature) => {
    console.group(
      'CodeFragmentWithMultiSelectSorting onSelectionChangeNoModel invoked with arguments:',
    );
    console.log('Selection Key:', selectionKey);
    console.log('Checkbox Element:', selectionCheckboxElement);
    console.groupEnd();
    if (selectionKey) {
      if (selectionKey === 'all' && selectionCheckboxElement) {
        this.selectableDataNoModel.forEach((modelRow: SelectableItem) => {
          modelRow.isSelected = selectionCheckboxElement.checked;
        });
      } else {
        const recordToUpdate = this.selectableDataNoModel.find(
          (modelRow: SelectableItem) => modelRow.id === Number(selectionKey),
        );

        if (recordToUpdate) {
          recordToUpdate.isSelected = !recordToUpdate.isSelected;
        }
      }
    }
  };

  onSelectionChangeLogArguments = ({
    selectionKey,
    selectionCheckboxElement,
    selectableRowsStates,
    selectedRowsKeys,
  }: HdsTableOnSelectionChangeSignature) => {
    console.group(
      'CodeFragmentWithMultiSelectSorting onSelectionChangeLogArguments invoked with arguments:',
    );
    console.log('Selection Key:', selectionKey);
    console.log('Checkbox Element:', selectionCheckboxElement);
    console.log('Selectable Rows States:', selectableRowsStates);
    console.log('Selected Rows Keys:', selectedRowsKeys);
    console.groupEnd();
  };

  <template>
    <ShwTextH4 @tag="h3">Sortable table with sorting by selected item</ShwTextH4>

    <CodeFragmentWithSelectableData
      @selectableColumnKey="isSelected"
      @onSelectionChange={{this.onSelectionChange}}
      @model={{this.selectableData}}
      @columns={{array
        (hash key="lorem" label="Row #" isSortable=true)
        (hash key="ipsum" label="Ipsum")
        (hash key="dolor" label="Dolor")
      }}
    />

    <ShwTextH4 @tag="h3">Sortable table with sorting by selected item using
      yielded
      <code>&lt;Tr&gt;</code>
      +
      <code>&lt;ThSort&gt;</code>
    </ShwTextH4>

    <HdsTable
      @isSelectable={{true}}
      @selectableColumnKey="isSelected"
      @onSelectionChange={{this.onSelectionChangeNoModel}}
      @onSort={{this.customOnSort}}
    >
      <:head as |H|>
        <H.Tr>
          {{#if H.setSortBy}}
            <H.ThSort
              @onClickSort={{fn H.setSortBy "lorem"}}
              @sortOrder={{if (eq "lorem" H.sortBy) H.sortOrder}}
            >Row #</H.ThSort>
          {{/if}}
          <H.Th>Ipsum</H.Th>
          <H.Th>Dolor</H.Th>
        </H.Tr>
      </:head>
      <:body as |B|>
        {{#each this.sortedSelectableData as |record|}}
          <B.Tr
            @selectionKey="{{record.id}}"
            @isSelected={{record.isSelected}}
            @selectionAriaLabelSuffix="row #{{record.lorem}}"
          >
            <B.Td>{{record.lorem}}</B.Td>
            <B.Td>{{record.ipsum}}</B.Td>
            <B.Td>{{record.dolor}}</B.Td>
          </B.Tr>
        {{/each}}
      </:body>
    </HdsTable>
  </template>
}
