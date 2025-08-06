import Component from '@glimmer/component';
import { array, hash } from '@ember/helper';
import { action } from '@ember/object';

import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';
import ShwTextH4 from 'showcase/components/shw/text/h4';
import ShwDivider from 'showcase/components/shw/divider';

// HDS Components
import { HdsTable } from '@hashicorp/design-system-components/components';

import MockTableMultiSelectSorting from './sorting';
import MockTableMultiSelectExamplesFilter from './examples/filter';
import MockTableMultiSelectExamplesPagination from './examples/pagination';
import MockTableMultiSelectExamplesDeletion from './examples/deletion';
import MockTableMultiSelectExamplesExternalAction from './examples/external-action';

import type { HdsTableOnSelectionChangeSignature } from '@hashicorp/design-system-components/components/hds/table/types';

import type { PageComponentsTableModel } from 'showcase/routes/page-components/table';

export interface MockTableMultiSelectSignature {
  Args: {
    model: PageComponentsTableModel;
  };
  Element: HTMLElement;
}

export default class MockTableMultiSelect extends Component<MockTableMultiSelectSignature> {
  declare model: PageComponentsTableModel;

  @action
  onSelectionChangeLogArguments({
    selectionKey,
    selectionCheckboxElement,
    selectableRowsStates,
    selectedRowsKeys,
  }: HdsTableOnSelectionChangeSignature) {
    console.group(
      'MockTableMultiSelect onSelectionChangeLogArguments invoked with arguments:',
    );
    console.log('Selection Key:', selectionKey);
    console.log('Checkbox Element:', selectionCheckboxElement);
    console.log('Selectable Rows States:', selectableRowsStates);
    console.log('Selected Rows Keys:', selectedRowsKeys);
    console.groupEnd();
  }

  <template>
    <ShwTextH2>Multi-select</ShwTextH2>

    <ShwTextH4 @tag="h3">Table with model</ShwTextH4>

    <HdsTable
      @isSelectable={{true}}
      @onSelectionChange={{this.onSelectionChangeLogArguments}}
      {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
      @model={{@model.selectableData}}
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

    <ShwTextH4 @tag="h3">Table without model defined</ShwTextH4>

    <HdsTable
      @isSelectable={{true}}
      @onSelectionChange={{this.onSelectionChangeLogArguments}}
    >
      <:head as |H|>
        <H.Tr>
          <H.Th>Row #</H.Th>
          <H.Th>Ipsum</H.Th>
          <H.Th>Dolor</H.Th>
        </H.Tr>
      </:head>
      <:body as |B|>
        <B.Tr @selectionKey="row1" @selectionAriaLabelSuffix="row #1">
          <B.Th>1</B.Th>
          <B.Td>Cell Content</B.Td>
          <B.Td>Cell Content</B.Td>
        </B.Tr>
        <B.Tr
          @selectionKey="row2"
          @isSelected={{true}}
          @selectionAriaLabelSuffix="row #2"
        >
          <B.Th>2</B.Th>
          <B.Td>Cell Content</B.Td>
          <B.Td>Cell Content</B.Td>
        </B.Tr>
        <B.Tr @selectionKey="row3" @selectionAriaLabelSuffix="row #3">
          <B.Th>3</B.Th>
          <B.Td>Cell Content</B.Td>
          <B.Td>Cell Content</B.Td>
        </B.Tr>
        <B.Tr @selectionKey="row4" @selectionAriaLabelSuffix="row #4">
          <B.Th>4</B.Th>
          <B.Td>Cell Content</B.Td>
          <B.Td>Cell Content</B.Td>
        </B.Tr>
      </:body>
    </HdsTable>

    <MockTableMultiSelectSorting @model={{@model}} />

    <ShwDivider @level={{2}} />

    <ShwTextH3>Functional examples</ShwTextH3>

    <MockTableMultiSelectExamplesFilter @model={{@model}} />

    <MockTableMultiSelectExamplesPagination @model={{@model}} />

    <MockTableMultiSelectExamplesDeletion @model={{@model}} />

    <MockTableMultiSelectExamplesExternalAction @model={{@model}} />
  </template>
}
