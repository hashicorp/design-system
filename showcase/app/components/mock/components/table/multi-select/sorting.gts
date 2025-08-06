import Component from '@glimmer/component';
import { array, hash, fn } from '@ember/helper';
import { eq } from 'ember-truth-helpers';
import { tracked } from '@glimmer/tracking';
import { deepTracked } from 'ember-deep-tracked';
import { action } from '@ember/object';

import ShwTextH4 from 'showcase/components/shw/text/h4';

// HDS Components
import { HdsTable } from '@hashicorp/design-system-components/components';

import type { HdsTableOnSelectionChangeSignature } from '@hashicorp/design-system-components/components/hds/table/types';
import type { PageComponentsTableModel } from 'showcase/routes/page-components/table';
import type { SelectableItem } from 'showcase/mocks/selectable-item-data.ts';

export interface MockTableMultiSelectSortingSignature {
  Args: {
    model: PageComponentsTableModel;
  };
  Element: HTMLElement;
}

export default class MockTableMultiSelectSorting extends Component<MockTableMultiSelectSortingSignature> {
  declare model: PageComponentsTableModel;

  @deepTracked selectableData = [...this.args.model.selectableDataDemo5];
  @tracked customSortBy: keyof SelectableItem | undefined = undefined;
  @tracked customSortOrder = 'asc';
  @deepTracked selectableDataNoModel = [...this.args.model.selectableDataDemo6];

  @action
  onSelectionChange({
    selectionKey,
    selectionCheckboxElement,
  }: HdsTableOnSelectionChangeSignature) {
    console.group(
      'MockTableMultiSelectSorting onSelectionChange invoked with arguments:',
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
  }

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

  @action
  customOnSort(sortBy: string, sortOrder: string) {
    this.customSortBy = sortBy as keyof SelectableItem;
    this.customSortOrder = sortOrder;
  }

  @action
  onSelectionChangeNoModel({
    selectionKey,
    selectionCheckboxElement,
  }: HdsTableOnSelectionChangeSignature) {
    console.group(
      'MockTableMultiSelectSorting onSelectionChangeNoModel invoked with arguments:',
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
  }

  @action
  onSelectionChangeLogArguments({
    selectionKey,
    selectionCheckboxElement,
    selectableRowsStates,
    selectedRowsKeys,
  }: HdsTableOnSelectionChangeSignature) {
    console.group(
      'MockTableMultiSelectSorting onSelectionChangeLogArguments invoked with arguments:',
    );
    console.log('Selection Key:', selectionKey);
    console.log('Checkbox Element:', selectionCheckboxElement);
    console.log('Selectable Rows States:', selectableRowsStates);
    console.log('Selected Rows Keys:', selectedRowsKeys);
    console.groupEnd();
  }

  <template>
    <ShwTextH4 @tag="h3">Sortable table with sorting by selected item</ShwTextH4>

    <HdsTable
      @isSelectable={{true}}
      @selectableColumnKey="isSelected"
      @onSelectionChange={{this.onSelectionChange}}
      {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
      @model={{this.selectableData}}
      @columns={{array
        (hash key="lorem" label="Row #" isSortable=true)
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
