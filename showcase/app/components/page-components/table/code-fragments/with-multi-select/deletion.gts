import Component from '@glimmer/component';
import { array, hash } from '@ember/helper';
import { tracked } from '@glimmer/tracking';
import { deepTracked } from 'ember-deep-tracked';
import { on } from '@ember/modifier';

import USERS from 'showcase/mocks/user-data';

import CodeFragmentWithMultiSelectTopbar from './topbar';
import CodeFragmentWithUsersData from '../with-users-data';

// HDS Components
import {
  HdsButton,
  HdsPaginationNumbered,
} from '@hashicorp/design-system-components/components';

import type { HdsTableOnSelectionChangeSignature } from '@hashicorp/design-system-components/components/hds/table/types';
import type { User } from 'showcase/mocks/user-data.ts';

export interface CodeFragmentWithMultiSelectDeletionSignature {
  Element: HTMLElement;
}

export default class CodeFragmentWithMultiSelectDeletion extends Component<CodeFragmentWithMultiSelectDeletionSignature> {
  @tracked isScopeExtended = false;
  @tracked isDebugging = false;
  @deepTracked userData = [...USERS.slice(0, 16)];
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

  get totalItems() {
    return this.userData.length;
  }

  get paginatedData() {
    const start = (this.currentPage - 1) * this.currentPageSize;
    const end = this.currentPage * this.currentPageSize;
    return this.userData.slice(start, end);
  }

  toggleScope = (event: Event) => {
    this.isScopeExtended = (event.target as HTMLInputElement).checked;
  };

  toggleDebugging = (event: Event) => {
    this.isDebugging = (event.target as HTMLInputElement).checked;
  };

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
      'CodeFragmentWithMultiSelectDeletion onSelectionChange invoked with arguments:',
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
  };

  deleteSelectedUsers = () => {
    const newData = this.userData.filter((user) => !user.isSelected);
    this.userData = [...newData];
  };

  <template>
    <CodeFragmentWithMultiSelectTopbar
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
    </CodeFragmentWithMultiSelectTopbar>

    <div class="shw-component-table-with-pagination-demo-wrapper">
      <CodeFragmentWithUsersData
        @isSelectable={{true}}
        @dataModel={{this.paginatedData}}
        @columns={{array
          (hash key="id" label="ID")
          (hash key="name" label="Name")
          (hash key="email" label="Email")
          (hash key="role" label="Role")
        }}
        @dataSize="small"
        @onSelectionChange={{this.onSelectionChange}}
      />
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
