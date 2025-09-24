/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { array, hash } from '@ember/helper';
import { deepTracked } from 'ember-deep-tracked';
import { eq, notEq } from 'ember-truth-helpers';
import { guidFor } from '@ember/object/internals';
import { on } from '@ember/modifier';
import { tracked } from '@glimmer/tracking';

import USERS from 'showcase/mocks/user-data';
import type { User } from 'showcase/mocks/user-data';

import {
  HdsAdvancedTable,
  HdsPaginationNumbered,
} from '@hashicorp/design-system-components/components';
import type { HdsAdvancedTableOnSelectionChangeSignature } from '@hashicorp/design-system-components/components/hds/advanced-table/types';

const updateModelWithSelectAllState = (
  modelData: User[],
  selectAllState: boolean,
) => {
  modelData.forEach((modelRow) => {
    if (modelRow instanceof Object) {
      // Always set isSelected, adding it if missing
      (modelRow as { isSelected: boolean }).isSelected = selectAllState;
    }
  });
};

function updateModelWithSelectableRowsStates<
  T extends { id: number; isSelected?: boolean },
>(
  modelData: T[],
  selectableRowsStates: HdsAdvancedTableOnSelectionChangeSignature['selectableRowsStates'],
): void {
  // Create a map from id to row for quick lookup
  const modelDataMap: Map<string, T> = new Map(
    modelData.map((modelRow) => [String(modelRow.id), modelRow]),
  );

  selectableRowsStates.forEach((row) => {
    const record = modelDataMap.get(row.selectionKey);
    if (record) {
      record.isSelected = row.isSelected;
    }
  });
}

export interface CodeFragmentWithDebugSelectSignature {
  Args: {
    hasPagination?: boolean;
    shouldHideSelectionDebugControls?: boolean;
  };
  Blocks: {
    topbarAction?: [
      {
        model: User[];
        setModel: (newModel: User[]) => void;
      },
    ];
  };
  Element: HTMLDivElement;
}

export default class CodeFragmentWithDebugSelect extends Component<CodeFragmentWithDebugSelectSignature> {
  uuid = guidFor(this);

  @tracked scope: 'visible-rows' | 'all-rows' = 'visible-rows';
  @tracked showDebug = false;
  @tracked currentPageSize = 4;
  @tracked currentPage = 1;

  @deepTracked model = this.args.hasPagination
    ? structuredClone(USERS.slice(0, 16))
    : structuredClone(USERS.slice(0, 4));

  // for paginated examples, need a getter to return the visible rows only
  get paginatedModel() {
    const visibleRows = this.model.filter((user) => !user.isHidden);

    if (!this.args.hasPagination) {
      return visibleRows;
    }

    const start = (this.currentPage - 1) * this.currentPageSize;
    const end = this.currentPage * this.currentPageSize;
    return visibleRows.slice(start, end);
  }

  // there are demos where we want to be able to update the full model, not just the visible rows
  setModel = (newModel: User[]) => {
    this.model = [...newModel];
  };

  toggleScope = () => {
    this.scope = this.scope === 'visible-rows' ? 'all-rows' : 'visible-rows';
  };

  toggleShowDebug = () => {
    this.showDebug = !this.showDebug;
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
  }: HdsAdvancedTableOnSelectionChangeSignature) => {
    console.group('onSelectionChange');
    console.log('Selection Key:', selectionKey);
    console.log('Checkbox Element:', selectionCheckboxElement);
    console.log('Selectable Rows States:', selectableRowsStates);
    console.groupEnd();

    if (selectionKey === 'all' && this.scope === 'all-rows') {
      updateModelWithSelectAllState(
        this.model,
        selectionCheckboxElement ? selectionCheckboxElement.checked : false,
      );
    } else {
      updateModelWithSelectableRowsStates(this.model, selectableRowsStates);
    }
  };

  <template>
    <div class="shw-component-advanced-table-demo-topbar">
      {{#if (notEq @shouldHideSelectionDebugControls true)}}
        <div class="shw-component-advanced-table-demo-topbar__toggle">
          <input
            id="{{this.uuid}}-scope-toggle"
            type="checkbox"
            checked={{if (eq this.scope "all-rows") true false}}
            {{on "change" this.toggleScope}}
          />
          <label for="{{this.uuid}}-scope-toggle">Extend "Select All" scope to
            non-displayed rows</label>
        </div>
        <div class="shw-component-advanced-table-demo-topbar__toggle">
          <input
            id="{{this.uuid}}-debug-toggle"
            type="checkbox"
            checked={{this.showDebug}}
            {{on "change" this.toggleShowDebug}}
          />
          <label for="{{this.uuid}}-debug-toggle">Show all rows' state</label>
        </div>
      {{/if}}
      <div class="shw-component-advanced-table-demo-topbar__action">
        {{yield
          (hash model=this.model setModel=this.setModel)
          to="topbarAction"
        }}
      </div>
    </div>

    <div
      class={{if
        @hasPagination
        "shw-component-advanced-table-with-pagination-demo-wrapper"
      }}
    >
      <HdsAdvancedTable
        @isSelectable={{true}}
        @onSelectionChange={{this.onSelectionChange}}
        {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
        @model={{this.paginatedModel}}
        @columns={{array
          (hash key="id" label="ID")
          (hash key="name" label="Name")
          (hash key="email" label="Email")
          (hash key="role" label="Role")
        }}
      >
        <:body as |B|>
          <B.Tr
            {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
            @selectionKey="{{B.data.id}}"
            {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
            @isSelected={{B.data.isSelected}}
            {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
            @selectionAriaLabelSuffix="row #{{B.data.id}}"
          >
            {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
            <B.Td>{{B.data.id}}</B.Td>
            <B.Td>
              {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
              {{#let B.data.isAnimated as |isAnimated|}}
                <span
                  class={{if
                    isAnimated
                    "shw-component-advanced-table-animate-user"
                  }}
                >
                  {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
                  {{B.data.name}}
                </span>
              {{/let}}
            </B.Td>
            {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
            <B.Td>{{B.data.email}}</B.Td>
            {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
            <B.Td>{{B.data.role}}</B.Td>
          </B.Tr>
        </:body>
      </HdsAdvancedTable>
      {{#if @hasPagination}}
        <HdsPaginationNumbered
          @totalItems={{this.model.length}}
          @currentPageSize={{this.currentPageSize}}
          @pageSizes={{array 4 8}}
          @currentPage={{this.currentPage}}
          @onPageChange={{this.onPageChange}}
          @onPageSizeChange={{this.onPageSizeChange}}
          @ariaLabel="Pagination for multi-select {{this.uuid}}"
        />
      {{/if}}
      {{#if this.showDebug}}
        {{#each this.model as |row|}}
          <pre>row{{row.id}} = {{if row.isSelected "✅"}}</pre>
        {{/each}}
      {{/if}}
    </div>
  </template>
}
