/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import { fn } from '@ember/helper';
import { later } from '@ember/runloop';
import { on } from '@ember/modifier';
import { tracked } from '@glimmer/tracking';

import ShwDivider from 'showcase/components/shw/divider';
import ShwTextBody from 'showcase/components/shw/text/body';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';
import USERS from 'showcase/mocks/user-data';
import type { User } from 'showcase/mocks/user-data';

import {
  HdsButton,
  HdsFormSelectBase,
  HdsAdvancedTable,
} from '@hashicorp/design-system-components/components';

import CodeFragmentWithDynamicCellContent from 'showcase/components/page-components/advanced-table/code-fragments/with-dynamic-cell-content';
import CodeFragmentWithDebugSelect from 'showcase/components/page-components/advanced-table/code-fragments/with-debug-select';
import CodeFragmentWithSimpleData, {
  DEFAULT_COLUMNS,
} from 'showcase/components/page-components/advanced-table/code-fragments/with-simple-data';
import CodeFragmentWithFiltering from 'showcase/components/page-components/advanced-table/code-fragments/with-filtering';

export default class SubSectionFunctionalExamples extends Component {
  // INLINE FILTER EXAMPLE
  onChangeInlineFilter = (
    setModel: (newModel: User[]) => void,
    model: User[],
    event: Event,
  ) => {
    const value = (event.target as HTMLSelectElement).value;

    if (value === 'all') {
      const newModel = model.map((user) => ({
        ...user,
        isHidden: false,
      }));

      setModel(newModel);
    } else {
      const remainder = value === 'even' ? 0 : 1;

      const newModel = model.map((user) => ({
        ...user,
        isHidden: user.id % 2 !== remainder,
      }));

      setModel(newModel);
    }
  };

  // DELETE ROWS EXAMPLE
  deleteUsers = (setModel: (newModel: User[]) => void, model: User[]) => {
    const newModel = model.filter((user) => !user.isSelected);
    setModel(newModel);
  };

  // ANIMATE ROWS EXAMPLE
  animateUsers = (setModel: (newModel: User[]) => void, model: User[]) => {
    const newModel = model.map((user) => ({
      ...user,
      isAnimated: user.isSelected,
    }));

    setModel(newModel);

    // eslint-disable-next-line ember/no-runloop
    later(() => {
      this.resetUserAnimation(setModel, model);
    }, 5000);
  };

  // TOGGLE COLUMN EXAMPLE
  toggleColumnsAvailableColumns = DEFAULT_COLUMNS.map((col) => col.key);

  @tracked toggleColumnsVisibleColumns = DEFAULT_COLUMNS.filter(
    (col) => col.key !== 'name',
  ).map((col) => col.key);

  get toggleColumnsColumns() {
    return DEFAULT_COLUMNS.filter((column) =>
      this.toggleColumnsVisibleColumns.includes(column.key),
    );
  }

  toggleColumnsColumnIsVisible = (columnKey: string) => {
    return this.toggleColumnsVisibleColumns.includes(columnKey);
  };

  toggleColumnsToggleColumnVisibility = (columnKey: string) => {
    if (this.toggleColumnsVisibleColumns.includes(columnKey)) {
      this.toggleColumnsVisibleColumns =
        this.toggleColumnsVisibleColumns.filter((key) => key !== columnKey);
    } else {
      this.toggleColumnsVisibleColumns = [
        ...this.toggleColumnsVisibleColumns,
        columnKey,
      ];
    }
  };

  // TOGGLE REORDERABLE COLUMN EXAMPLE

  toggleReorderableColumnsModel = USERS.slice(0, 4);

  @tracked toggleReorderableColumnsVisibleColumns = DEFAULT_COLUMNS.filter(
    (col) => col.key !== 'name',
  ).map((col) => col.key);

  @tracked toggleReorderableColumnsColumnOrder =
    this.toggleColumnsAvailableColumns;

  get toggleReorderableColumnsColumns() {
    return DEFAULT_COLUMNS.filter((column) =>
      this.toggleReorderableColumnsVisibleColumns.includes(column.key),
    );
  }

  toggleReorderableColumnsColumnIsVisible = (columnKey: string) => {
    return this.toggleReorderableColumnsVisibleColumns.includes(columnKey);
  };

  toggleReorderableColumnsToggleColumnVisibility = (columnKey: string) => {
    if (this.toggleReorderableColumnsVisibleColumns.includes(columnKey)) {
      this.toggleReorderableColumnsVisibleColumns =
        this.toggleReorderableColumnsVisibleColumns.filter(
          (key) => key !== columnKey,
        );
    } else {
      this.toggleReorderableColumnsVisibleColumns = [
        ...this.toggleReorderableColumnsVisibleColumns,
        columnKey,
      ];
    }
  };

  toggleReorderableColumnsOnColumnReorder = ({
    newOrder,
  }: {
    newOrder: string[];
  }) => {
    this.toggleReorderableColumnsColumnOrder = newOrder;
  };

  resetUserAnimation = (
    setModel: (newModel: User[]) => void,
    model: User[],
  ) => {
    const newModel = model.map((user) => ({
      ...user,
      isAnimated: false,
    }));

    setModel([...newModel]);
  };

  <template>
    <ShwTextH2>Functional examples</ShwTextH2>

    <ShwTextH3>With dynamic focusable content in cells</ShwTextH3>

    <CodeFragmentWithDynamicCellContent />

    <ShwDivider @level={{2}} />

    <ShwTextH3>With inline filter</ShwTextH3>

    {{! INLINE FILTER EXAMPLE }}
    <CodeFragmentWithDebugSelect>
      <:topbarAction as |T|>
        <label for="inline-filter-example">Filter:</label>
        <HdsFormSelectBase
          id="inline-filter-example"
          {{on "change" (fn this.onChangeInlineFilter T.setModel T.model)}}
          as |C|
        >
          <C.Options>
            <option value="all">Show all rows</option>
            <option value="even">Show even rows</option>
            <option value="odd">Show odd rows</option>
          </C.Options>
        </HdsFormSelectBase>
      </:topbarAction>
    </CodeFragmentWithDebugSelect>

    <ShwDivider @level={{2}} />

    <ShwTextH3>With FilterBar filtering</ShwTextH3>

    <CodeFragmentWithFiltering />

    <ShwDivider @level={{2}} />

    <ShwTextH3>With FilterBar live filtering</ShwTextH3>

    <CodeFragmentWithFiltering @isLiveFilter={{true}} />

    <ShwDivider @level={{2}} />

    <ShwTextH3>With pagination</ShwTextH3>

    <CodeFragmentWithDebugSelect @hasPagination={{true}} />

    <ShwDivider @level={{2}} />

    <ShwTextH3>Delete selected rows</ShwTextH3>

    <ShwTextBody>This demo emulates, for example, when a user needs to delete
      the selected users.</ShwTextBody>

    {{! DELETE ROWS EXAMPLE }}
    <CodeFragmentWithDebugSelect @hasPagination={{true}}>
      <:topbarAction as |T|>
        <HdsButton
          @text="Delete users"
          @icon="trash"
          {{on "click" (fn this.deleteUsers T.setModel T.model)}}
        />
      </:topbarAction>
    </CodeFragmentWithDebugSelect>

    <ShwDivider @level={{2}} />

    <ShwTextH3>Execute action on selected rows</ShwTextH3>

    <ShwTextBody>This demo emulates, for example, when a user needs to download
      the selected files.</ShwTextBody>

    {{! ANIMATE ROWS EXAMPLE }}
    <CodeFragmentWithDebugSelect @shouldHideSelectionDebugControls={{true}}>
      <:topbarAction as |T|>
        <HdsButton
          @text="Animate users"
          @icon="play"
          {{on "click" (fn this.animateUsers T.setModel T.model)}}
        />
      </:topbarAction>
    </CodeFragmentWithDebugSelect>

    <ShwDivider @level={{2}} />

    <ShwTextH3>Toggle columns</ShwTextH3>

    <ShwTextBody>This demo emulates adding and removing columns.</ShwTextBody>

    {{! TOGGLE COLUMN EXAMPLE }}
    <div class="shw-component-advanced-table-demo-topbar">
      {{#each this.toggleColumnsAvailableColumns as |column|}}
        <HdsButton
          @text="{{if
            (this.toggleColumnsColumnIsVisible column)
            'Hide'
            'Show'
          }} {{column}}"
          {{on "click" (fn this.toggleColumnsToggleColumnVisibility column)}}
        />
      {{/each}}
    </div>

    <CodeFragmentWithSimpleData @columns={{this.toggleColumnsColumns}} />

    <ShwDivider @level={{2}} />

    <ShwTextH3>Toggle reorderable columns</ShwTextH3>

    <ShwTextBody>This demo emulates adding and removing columns when reordering
      is enabled.</ShwTextBody>

    {{! TOGGLE REORDERABLE COLUMN EXAMPLE }}
    <div class="shw-component-advanced-table-demo-topbar">
      {{#each this.toggleReorderableColumnsColumnOrder as |column|}}
        <HdsButton
          @text="{{if
            (this.toggleReorderableColumnsColumnIsVisible column)
            'Hide'
            'Show'
          }} {{column}}"
          {{on
            "click"
            (fn this.toggleReorderableColumnsToggleColumnVisibility column)
          }}
        />
      {{/each}}
    </div>

    <HdsAdvancedTable
      @hasReorderableColumns={{true}}
      @columnOrder={{this.toggleReorderableColumnsColumnOrder}}
      {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
      @model={{this.toggleReorderableColumnsModel}}
      @columns={{this.toggleReorderableColumnsColumns}}
      @onColumnReorder={{this.toggleReorderableColumnsOnColumnReorder}}
    >
      <:body as |B|>
        <B.Tr as |R|>
          {{#each R.orderedCells as |C|}}
            {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
            <B.Td>{{C.content}}</B.Td>
          {{/each}}
        </B.Tr>
      </:body>
    </HdsAdvancedTable>

    <ShwDivider />
  </template>
}
