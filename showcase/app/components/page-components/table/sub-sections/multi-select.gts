import Component from '@glimmer/component';
import { array, hash } from '@ember/helper';
import { action } from '@ember/object';

import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';
import ShwTextH4 from 'showcase/components/shw/text/h4';
import ShwTextBody from 'showcase/components/shw/text/body';
import ShwDivider from 'showcase/components/shw/divider';

import CodeFragmentWithSelectableData from 'showcase/components/page-components/table/code-fragments/with-selectable-data';
import CodeFragmentWithMultiSelectDeletion from 'showcase/components/page-components/table/code-fragments/with-multi-select/deletion';
import CodeFragmentWithMultiSelectExternalAction from 'showcase/components/page-components/table/code-fragments/with-multi-select/external-action';
import CodeFragmentWithMultiSelectFilter from 'showcase/components/page-components/table/code-fragments/with-multi-select/filter';
import CodeFragmentWithMultiSelectPagination from 'showcase/components/page-components/table/code-fragments/with-multi-select/pagination';

// HDS Components
import { HdsTable } from '@hashicorp/design-system-components/components';

import type { HdsTableOnSelectionChangeSignature } from '@hashicorp/design-system-components/components/hds/table/types';

export interface SubSectionMultiSelectSignature {
  Element: HTMLElement;
}

export default class SubSectionMultiSelect extends Component<SubSectionMultiSelectSignature> {
  @action
  onSelectionChangeLogArguments({
    selectionKey,
    selectionCheckboxElement,
    selectableRowsStates,
    selectedRowsKeys,
  }: HdsTableOnSelectionChangeSignature) {
    console.group(
      'SubSectionMultiSelect onSelectionChangeLogArguments invoked with arguments:',
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

    <CodeFragmentWithSelectableData
      @isSelectable={{true}}
      @onSelectionChange={{this.onSelectionChangeLogArguments}}
      @columns={{array
        (hash key="lorem" label="Row #")
        (hash key="ipsum" label="Ipsum")
        (hash key="dolor" label="Dolor")
      }}
    />

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

    <ShwDivider @level={{2}} />

    <ShwTextH3>Functional examples</ShwTextH3>

    <ShwTextH4>With inline filter</ShwTextH4>

    <CodeFragmentWithMultiSelectFilter />

    <ShwTextH4>With pagination</ShwTextH4>

    <CodeFragmentWithMultiSelectPagination />

    <ShwTextH4>Delete selected rows</ShwTextH4>

    <ShwTextBody>This demo emulates, for example, when a user needs to delete
      the selected users.</ShwTextBody>

    <CodeFragmentWithMultiSelectDeletion />

    <ShwTextH4>Execute action on selected rows</ShwTextH4>

    <ShwTextBody>This demo emulates, for example, when a user needs to download
      the selected files.</ShwTextBody>

    <CodeFragmentWithMultiSelectExternalAction />

    <ShwDivider />
  </template>
}
