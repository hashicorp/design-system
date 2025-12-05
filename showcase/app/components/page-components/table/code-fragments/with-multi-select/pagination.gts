/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { array, hash } from '@ember/helper';
import { tracked } from '@glimmer/tracking';
import { deepTracked } from 'ember-deep-tracked';

import CodeFragmentsWithMultiSelectTopbar from './topbar';
import CodeFragmentWithSelectableData from '../with-selectable-data';
import SELECTABLE_ITEMS from 'showcase/mocks/selectable-item-data';

// HDS Components
import { HdsPaginationNumbered } from '@hashicorp/design-system-components/components';

import type { HdsTableOnSelectionChangeSignature } from '@hashicorp/design-system-components/components/hds/table/types';
import type { SelectableItem } from 'showcase/mocks/selectable-item-data.ts';

export interface CodeFragmentWithMultiSelectPaginationSignature {
  Element: HTMLElement;
}

export default class CodeFragmentWithMultiSelectPagination extends Component<CodeFragmentWithMultiSelectPaginationSignature> {
  @deepTracked selectableData = SELECTABLE_ITEMS;
  @tracked isScopeExtended = false;
  @tracked isDebugging = false;
  @tracked currentPage = 1;
  @tracked currentPageSize = 2;

  updateModelWithSelectAllState = (
    modelData: SelectableItem[],
    selectAllState: boolean,
  ) => {
    modelData.forEach((modelRow) => {
      if (modelRow instanceof Object) {
        modelRow.isSelected = selectAllState;
      }
    });
  };

  get totalItems() {
    return this.selectableData.length;
  }

  get paginatedData() {
    const start = (this.currentPage - 1) * this.currentPageSize;
    const end = this.currentPage * this.currentPageSize;
    return this.selectableData.slice(start, end);
  }

  onPageChange = (page: number) => {
    this.currentPage = page;
  };

  onPageSizeChange = (pageSize: number) => {
    // we agreed to reset the pagination to the first element (any alternative would result in an unpredictable UX)
    this.currentPage = 1;
    this.currentPageSize = pageSize;
  };

  onSelectionChange = ({
    selectionKey,
    selectionCheckboxElement,
    selectableRowsStates,
  }: HdsTableOnSelectionChangeSignature) => {
    console.group(
      'CodeFragmentWithMultiSelectPagination onSelectionChange invoked with arguments:',
    );
    console.log('Selection Key:', selectionKey);
    console.log('Checkbox Element:', selectionCheckboxElement);
    console.log('Selectable Rows States:', selectableRowsStates);
    console.groupEnd();
    if (selectionKey === 'all' && this.isScopeExtended) {
      this.updateModelWithSelectAllState(
        this.selectableData,
        selectionCheckboxElement ? selectionCheckboxElement.checked : false,
      );
    } else {
      const modelDataMap: Map<string, SelectableItem> = new Map(
        this.selectableData.map((modelRow) => [String(modelRow.id), modelRow]),
      );

      selectableRowsStates.forEach((row) => {
        const record = modelDataMap.get(row.selectionKey) as SelectableItem;
        if (record) {
          record.isSelected = row.isSelected ? true : false;
        }
      });
    }
  };

  toggleScope = (event: Event) => {
    this.isScopeExtended = (event.target as HTMLInputElement).checked;
  };

  toggleDebugging = (event: Event) => {
    this.isDebugging = (event.target as HTMLInputElement).checked;
  };

  <template>
    <CodeFragmentsWithMultiSelectTopbar
      @isScopeExtended={{this.isScopeExtended}}
      @isDebugging={{this.isDebugging}}
      @onChangeScope={{this.toggleScope}}
      @onChangeDebugging={{this.toggleDebugging}}
    />

    <div class="shw-component-table-with-pagination-demo-wrapper">
      <CodeFragmentWithSelectableData
        @isSelectable={{true}}
        @onSelectionChange={{this.onSelectionChange}}
        @model={{this.paginatedData}}
        @columns={{array
          (hash key="lorem" label="Row #")
          (hash key="ipsum" label="Ipsum")
          (hash key="dolor" label="Dolor")
        }}
      />
      <HdsPaginationNumbered
        @totalItems={{this.totalItems}}
        @currentPageSize={{this.currentPageSize}}
        @pageSizes={{array 2 4}}
        @currentPage={{this.currentPage}}
        @onPageChange={{this.onPageChange}}
        @onPageSizeChange={{this.onPageSizeChange}}
        @ariaLabel="Pagination for basic multi-select table"
      />
      {{#if this.isDebugging}}
        {{#each this.selectableData as |row|}}
          <pre>row{{row.id}} = {{if row.isSelected "✅"}}</pre>
        {{/each}}
      {{/if}}
    </div>
  </template>
}
