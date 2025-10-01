/**
 * Copyright (c) HashiCorp, Inc.
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
import type { User } from 'showcase/mocks/user-data';

import {
  HdsButton,
  HdsFormSelectBase,
} from '@hashicorp/design-system-components/components';

import CodeFragmentWithDynamicCellContent from 'showcase/components/page-components/advanced-table/code-fragments/with-dynamic-cell-content';
import CodeFragmentWithDebugSelect from 'showcase/components/page-components/advanced-table/code-fragments/with-debug-select';
import CodeFragmentWithSimpleData, { DEFAULT_COLUMNS } from 'showcase/components/page-components/advanced-table/code-fragments/with-simple-data';

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

  @tracked toggleColumnsVisibleColumns = DEFAULT_COLUMNS.filter(col => col.key !== 'name').map((col) => col.key);

  get toggleColumnsColumns() {
    return DEFAULT_COLUMNS.filter((column) =>
      this.toggleColumnsVisibleColumns.includes(column.key),
    );
  }

  columnIsVisible = (columnKey: string) => {
    return this.toggleColumnsVisibleColumns.includes(columnKey);
  };

  toggleColumnVisibility = (columnKey: string) => {
    if (this.toggleColumnsVisibleColumns.includes(columnKey)) {
      this.toggleColumnsVisibleColumns = this.toggleColumnsVisibleColumns.filter(key => key !== columnKey);
    } else {
      this.toggleColumnsVisibleColumns = [...this.toggleColumnsVisibleColumns, columnKey];
    }
  }

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

    <ShwTextH3>With pagination</ShwTextH3>
    <CodeFragmentWithDebugSelect @hasPagination={{true}} />

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

    <ShwTextH3>Toggle columns</ShwTextH3>

    <ShwTextBody>This demo emulates adding and removing columns.</ShwTextBody>

    {{! TOGGLE COLUMN EXAMPLE }}
    <div class="shw-component-advanced-table-demo-topbar">
      {{#each this.toggleColumnsAvailableColumns as |column|}}
        <HdsButton
          @text="{{if (this.columnIsVisible column) 'Hide' 'Show'}} {{column}}"
          {{on "click" (fn this.toggleColumnVisibility column)}}
        />
      {{/each}}
    </div>

    <CodeFragmentWithSimpleData @columns={{this.toggleColumnsColumns}} />

    <ShwDivider />
  </template>
}
