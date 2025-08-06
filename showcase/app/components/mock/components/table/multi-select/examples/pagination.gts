import Component from '@glimmer/component';
import { array, hash } from '@ember/helper';
import { tracked } from '@glimmer/tracking';
import { deepTracked } from 'ember-deep-tracked';
import { action } from '@ember/object';

import ShwTextH4 from 'showcase/components/shw/text/h4';

import MockTableMultiSelectExamplesTopbar from './topbar';

// HDS Components
import {
  HdsTable,
  HdsPaginationNumbered,
} from '@hashicorp/design-system-components/components';

import type { HdsTableOnSelectionChangeSignature } from '@hashicorp/design-system-components/components/hds/table/types';
import type { PageComponentsTableModel } from 'showcase/routes/page-components/table';
import type { SelectableItem } from 'showcase/mocks/selectable-item-data.ts';

export interface MockTableMultiSelectExamplesPaginationSignature {
  Args: {
    model: PageComponentsTableModel;
  };
  Element: HTMLElement;
}

export default class MockTableMultiSelectExamplesPagination extends Component<MockTableMultiSelectExamplesPaginationSignature> {
  declare model: PageComponentsTableModel;

  @deepTracked selectableData = [...this.args.model.selectableDataDemo2];
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

  @action
  onPageChange(page: number) {
    this.currentPage = page;
  }

  @action
  onPageSizeChange(pageSize: number) {
    // we agreed to reset the pagination to the first element (any alternative would result in an unpredictable UX)
    this.currentPage = 1;
    this.currentPageSize = pageSize;
  }

  @action
  onSelectionChange({
    selectionKey,
    selectionCheckboxElement,
    selectableRowsStates,
  }: HdsTableOnSelectionChangeSignature) {
    console.group(
      'MockTableMultiSelectExamplesPagination onSelectionChange invoked with arguments:',
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
      selectableRowsStates.forEach((row) => {
        const recordToUpdate = this.selectableData.find(
          (modelRow) => String(modelRow.id) === row.selectionKey,
        );
        if (recordToUpdate) {
          recordToUpdate.isSelected = !recordToUpdate.isSelected;
        }
      });
    }
  }

  @action
  toggleScope(event: Event) {
    this.isScopeExtended = (event.target as HTMLInputElement).checked;
  }

  @action
  toggleDebugging(event: Event) {
    this.isDebugging = (event.target as HTMLInputElement).checked;
  }

  <template>
    <ShwTextH4>With pagination</ShwTextH4>

    <MockTableMultiSelectExamplesTopbar
      @isScopeExtended={{this.isScopeExtended}}
      @isDebugging={{this.isDebugging}}
      @onChangeScope={{this.toggleScope}}
      @onChangeDebugging={{this.toggleDebugging}}
    />

    <div class="shw-component-table-with-pagination-demo-wrapper">
      <HdsTable
        @isSelectable={{true}}
        @onSelectionChange={{this.onSelectionChange}}
        {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
        @model={{this.paginatedData}}
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
