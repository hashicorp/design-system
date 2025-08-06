import Component from '@glimmer/component';
import { array, hash } from '@ember/helper';
import { tracked } from '@glimmer/tracking';
import { deepTracked } from 'ember-deep-tracked';
import { action } from '@ember/object';
import { on } from '@ember/modifier';

import ShwTextBody from 'showcase/components/shw/text/body';
import ShwTextH4 from 'showcase/components/shw/text/h4';

import MockTableMultiSelectExamplesTopbar from './topbar';

// HDS Components
import {
  HdsButton,
  HdsPaginationNumbered,
  HdsTable,
} from '@hashicorp/design-system-components/components';

import type { HdsTableOnSelectionChangeSignature } from '@hashicorp/design-system-components/components/hds/table/types';
import type { PageComponentsTableModel } from 'showcase/routes/page-components/table';
import type { User } from 'showcase/mocks/user-data.ts';

export interface MockTableMultiSelectExamplesDeletionSignature {
  Args: {
    model: PageComponentsTableModel;
  };
  Element: HTMLElement;
}

export default class MockTableMultiSelectExamplesPagination extends Component<MockTableMultiSelectExamplesDeletionSignature> {
  declare model: PageComponentsTableModel;

  @tracked isScopeExtended = false;
  @tracked isDebugging = false;
  @deepTracked userData = [...this.args.model.userDataDemo3];
  @tracked currentPage = 1;
  @tracked currentPageSize = 4;

  updateModelWithSelectAllState = (
    modelData: User[],
    selectAllState: boolean,
  ) => {
    modelData.forEach((modelRow) => {
      if (modelRow instanceof Object) {
        modelRow.isSelected = selectAllState;
      }
    });
  };

  @action
  toggleScope(event: Event) {
    this.isScopeExtended = (event.target as HTMLInputElement).checked;
  }

  @action
  toggleDebugging(event: Event) {
    this.isDebugging = (event.target as HTMLInputElement).checked;
  }

  get totalItems() {
    return this.userData.length;
  }

  get paginatedData() {
    const start = (this.currentPage - 1) * this.currentPageSize;
    const end = this.currentPage * this.currentPageSize;
    return this.userData.slice(start, end);
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
        this.userData,
        selectionCheckboxElement ? selectionCheckboxElement.checked : false,
      );
    } else {
      selectableRowsStates.forEach((row) => {
        const recordToUpdate = this.userData.find(
          (modelRow) => String(modelRow.id) === row.selectionKey,
        );
        if (recordToUpdate) {
          recordToUpdate.isSelected = row.isSelected;
        }
      });
    }
  }

  @action
  deleteSelectedUsers() {
    const newData = this.userData.filter((user) => !user.isSelected);
    this.userData = [...newData];
  }

  <template>
    <ShwTextH4>Delete selected rows</ShwTextH4>

    <ShwTextBody>This demo emulates, for example, when a user needs to delete
      the selected users.</ShwTextBody>

    <MockTableMultiSelectExamplesTopbar
      @isScopeExtended={{this.isScopeExtended}}
      @isDebugging={{this.isDebugging}}
      @onChangeScope={{this.toggleScope}}
      @onChangeDebugging={{this.toggleDebugging}}
    >
      <HdsButton
        @text="Delete users"
        @icon="trash"
        {{on "click" this.deleteSelectedUsers}}
      />
    </MockTableMultiSelectExamplesTopbar>

    <div class="shw-component-table-with-pagination-demo-wrapper">
      <HdsTable
        @isSelectable={{true}}
        @onSelectionChange={{this.onSelectionChange}}
        {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
        @model={{this.paginatedData}}
        @columns={{array
          (hash key="id" label="ID")
          (hash key="name" label="Name")
          (hash key="email" label="Email")
          (hash key="role" label="Role")
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
            <B.Td>{{B.data.id}}</B.Td>
            {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
            <B.Td>{{B.data.name}}</B.Td>
            {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
            <B.Td>{{B.data.email}}</B.Td>
            {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
            <B.Td>{{B.data.role}}</B.Td>
          </B.Tr>
        </:body>
      </HdsTable>
      <HdsPaginationNumbered
        @totalItems={{this.totalItems}}
        @currentPageSize={{this.currentPageSize}}
        @pageSizes={{array 4 8}}
        @currentPage={{this.currentPage}}
        @onPageChange={{this.onPageChange}}
        @onPageSizeChange={{this.onPageSizeChange}}
        @ariaLabel="Pagination for multi-select table with delete action"
      />
      {{#if this.isDebugging}}
        {{#each this.userData as |row|}}
          <pre>row{{row.id}} = {{if row.isSelected "✅"}}</pre>
        {{/each}}
      {{/if}}
    </div>
  </template>
}
