import Component from '@glimmer/component';
import { array, hash, get } from '@ember/helper';
import { eq, not } from 'ember-truth-helpers';
import { tracked } from '@glimmer/tracking';
import { deepTracked } from 'ember-deep-tracked';
import { action } from '@ember/object';
import { on } from '@ember/modifier';

import ShwTextH4 from 'showcase/components/shw/text/h4';
import ShwFlex from 'showcase/components/shw/flex';

import MockTableMultiSelectExamplesTopbar from './topbar';

// HDS Components
import {
  HdsTable,
  HdsFormSelectBase,
} from '@hashicorp/design-system-components/components';

import type { HdsTableOnSelectionChangeSignature } from '@hashicorp/design-system-components/components/hds/table/types';
import type { PageComponentsTableModel } from 'showcase/routes/page-components/table';
import type { SelectableItem } from 'showcase/mocks/selectable-item-data.ts';

type MultiSelectNoModel = {
  row1: boolean;
  row2: boolean;
  row3: boolean;
  row4: boolean;
};

export interface MockTableMultiSelectExamplesFilterSignature {
  Args: {
    model: PageComponentsTableModel;
  };
  Element: HTMLElement;
}

export default class MockTableMultiSelectExamplesFilter extends Component<MockTableMultiSelectExamplesFilterSignature> {
  declare model: PageComponentsTableModel;

  @tracked filterRows = 'all';
  @tracked isScopeExtended = false;
  @tracked isDebugging = false;
  @deepTracked selectableData = [...this.args.model.selectableDataDemo1];
  @deepTracked noModelState: MultiSelectNoModel = {
    row1: false,
    row2: true,
    row3: false,
    row4: false,
  };

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

  get filteredData() {
    if (this.filterRows === 'all') {
      return this.selectableData;
    } else {
      const remainder = this.filterRows === 'even' ? 0 : 1;
      return this.selectableData.filter((item) => item.id % 2 === remainder);
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

  @action
  onChangeMultiSelectFilter(event: Event) {
    this.filterRows = (event.target as HTMLInputElement).value;
  }

  @action
  onSelectionChangeWithModel({
    selectionKey,
    selectionCheckboxElement,
    selectableRowsStates,
  }: HdsTableOnSelectionChangeSignature) {
    console.group(
      'MockTableMultiSelectExamplesFilter onSelectionChangeWithModel invoked with arguments:',
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
  onSelectionChangeWithoutModel({
    selectionKey,
    selectionCheckboxElement,
    selectableRowsStates,
  }: HdsTableOnSelectionChangeSignature) {
    console.group(
      'MockTableMultiSelectExamplesFilter onSelectionChangeWithoutModel invoked with arguments:',
    );
    console.log('Selection Key:', selectionKey);
    console.log('Checkbox Element:', selectionCheckboxElement);
    console.log('Selectable Rows States:', selectableRowsStates);
    console.groupEnd();
    // notice: the shape of the "model" is slightly different, it's not an array of objects but an object with keys so
    // we can't use the `updateModelWithSelectAllsState` and `updateModelWithSelectableRowsStates` functions
    if (selectionKey) {
      if (
        selectionKey === 'all' &&
        selectionCheckboxElement &&
        this.isScopeExtended
      ) {
        const selectAllState = selectionCheckboxElement.checked;
        Object.keys(this.noModelState).forEach((rowKey) => {
          this.noModelState[rowKey as keyof MultiSelectNoModel] =
            selectAllState;
        });
      } else {
        const mapSelectionKeyToRowKey = (
          key: string | number,
        ): keyof MultiSelectNoModel => {
          return key as keyof MultiSelectNoModel;
        };
        selectableRowsStates.forEach((row) => {
          const rowKey = mapSelectionKeyToRowKey(row.selectionKey);
          this.noModelState[rowKey] = row.isSelected ? true : false;
        });
      }
    }
  }

  <template>
    <ShwTextH4>With inline filter</ShwTextH4>

    <MockTableMultiSelectExamplesTopbar
      @isScopeExtended={{this.isScopeExtended}}
      @isDebugging={{this.isDebugging}}
      @onChangeScope={{this.toggleScope}}
      @onChangeDebugging={{this.toggleDebugging}}
    >
      <label for="multi-select-demo1__filter">Filter:</label>
      <HdsFormSelectBase
        id="multi-select-demo1__filter"
        {{on "change" this.onChangeMultiSelectFilter}}
        as |C|
      >
        <C.Options>
          <option value="all" selected={{eq this.filterRows "all"}}>Show all
            rows</option>
          <option value="even" selected={{eq this.filterRows "even"}}>Show even
            rows</option>
          <option value="odd" selected={{eq this.filterRows "odd"}}>Show odd
            rows</option>
        </C.Options>
      </HdsFormSelectBase>
    </MockTableMultiSelectExamplesTopbar>

    <ShwFlex @direction="column" @gap="2rem" as |SF|>
      <SF.Item @label="With data model">
        <HdsTable
          @isSelectable={{true}}
          @onSelectionChange={{this.onSelectionChangeWithModel}}
          {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
          @model={{this.filteredData}}
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
        {{#if this.isDebugging}}
          {{#each this.selectableData as |row|}}
            <pre>row{{row.id}} = {{if row.isSelected "✅"}}</pre>
          {{/each}}
        {{/if}}
      </SF.Item>
      <SF.Item @label="No model">
        <HdsTable
          @isSelectable={{true}}
          @onSelectionChange={{this.onSelectionChangeWithoutModel}}
        >
          <:head as |H|>
            <H.Tr>
              <H.Th>Row #</H.Th>
              <H.Th>Ipsum</H.Th>
              <H.Th>Dolor</H.Th>
            </H.Tr>
          </:head>
          <:body as |B|>
            {{#if (not (eq this.filterRows "even"))}}
              <B.Tr
                @selectionKey="row1"
                @isSelected={{get this.noModelState "row1"}}
              >
                <B.Th>1</B.Th>
                <B.Td>Cell Content</B.Td>
                <B.Td>Cell Content</B.Td>
              </B.Tr>
            {{/if}}
            {{#if (not (eq this.filterRows "odd"))}}
              <B.Tr
                @selectionKey="row2"
                @isSelected={{get this.noModelState "row2"}}
              >
                <B.Th>2</B.Th>
                <B.Td>Cell Content</B.Td>
                <B.Td>Cell Content</B.Td>
              </B.Tr>
            {{/if}}
            {{#if (not (eq this.filterRows "even"))}}
              <B.Tr
                @selectionKey="row3"
                @isSelected={{get this.noModelState "row3"}}
              >
                <B.Th>3</B.Th>
                <B.Td>Cell Content</B.Td>
                <B.Td>Cell Content</B.Td>
              </B.Tr>
            {{/if}}
            {{#if (not (eq this.filterRows "odd"))}}
              <B.Tr
                @selectionKey="row4"
                @isSelected={{get this.noModelState "row4"}}
              >
                <B.Th>4</B.Th>
                <B.Td>Cell Content</B.Td>
                <B.Td>Cell Content</B.Td>
              </B.Tr>
            {{/if}}
          </:body>
        </HdsTable>
        {{#if this.isDebugging}}
          <pre>row1 = {{if (get this.noModelState "row1") "✅"}}</pre>
          <pre>row2 = {{if (get this.noModelState "row2") "✅"}}</pre>
          <pre>row3 = {{if (get this.noModelState "row3") "✅"}}</pre>
          <pre>row4 = {{if (get this.noModelState "row4") "✅"}}</pre>
        {{/if}}
      </SF.Item>
    </ShwFlex>
  </template>
}
