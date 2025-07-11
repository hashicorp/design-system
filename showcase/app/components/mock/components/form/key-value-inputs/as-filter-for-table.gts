/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { deepTracked } from 'ember-deep-tracked';
import { on } from '@ember/modifier';
import { array, hash, fn } from '@ember/helper';
import { eq } from 'ember-truth-helpers';
import style from 'ember-style-modifier/modifiers/style';

// HDS components
import {
  HdsDropdown,
  HdsFormKeyValueInputs,
  HdsTable,
  HdsBadge,
  HdsButtonSet,
  HdsButton,
  HdsReveal,
} from '@hashicorp/design-system-components/components';

// SHW components
import ShwTextH4 from '../../../../shw/text/h4';
import ShwLabel from '../../../../shw/label';

export interface MockComponentsFormKeyValueInputsAsFilterForTableSignature {
  Args: {
    collapseInstructions?: boolean;
  };
  Element: HTMLDivElement;
}

interface FilterItem {
  id: number;
  provider: string;
  zone: string;
}

const EMPTY_FILTER_ITEM: FilterItem = {
  id: 0,
  provider: '',
  zone: '',
};

const TABLE_DATA = [
  {
    key: 0,
    id: 'A1B2C3D4E5',
    name: 'Web Server Alpha',
    type: 'Server',
    'ip-address': '192.168.0.101',
    provider: 'aws',
    zone: 'us-east-1a',
  },
  {
    key: 1,
    id: 'F6G7H8I9J0',
    name: 'Database Service Beta',
    type: 'Service',
    'ip-address': '192.168.0.102',
    provider: 'azure',
    zone: 'eastus',
  },
  {
    key: 2,
    id: 'K1L2M3N4O5',
    name: 'Cache Server Gamma',
    type: 'Server',
    'ip-address': '192.168.0.103',
    provider: 'google',
    zone: 'us-central1-a',
  },
  {
    key: 3,
    id: 'P6Q7R8S9T0',
    name: 'API Gateway Delta',
    type: 'Service',
    'ip-address': '192.168.0.104',
    provider: 'aws',
    zone: 'us-west-2b',
  },
  {
    key: 4,
    id: 'U1V2W3X4Y5',
    name: 'Load Balancer Epsilon',
    type: 'Service',
    'ip-address': '192.168.0.105',
    provider: 'azure',
    zone: 'centralus',
  },
  {
    key: 5,
    id: 'Z6A7B8C9D0',
    name: 'File Server Zeta',
    type: 'Server',
    'ip-address': '192.168.0.106',
    provider: 'google',
    zone: 'europe-west1-a',
  },
  {
    key: 6,
    id: 'E1F2G3H4I5',
    name: 'Application Server Eta',
    type: 'Server',
    'ip-address': '192.168.0.107',
    provider: 'aws',
    zone: 'us-east-2c',
  },
  {
    key: 7,
    id: 'J6K7L8M9N0',
    name: 'Backup Service Theta',
    type: 'Service',
    'ip-address': '192.168.0.108',
    provider: 'azure',
    zone: 'westus',
  },
  {
    key: 8,
    id: 'O1P2Q3R4S5',
    name: 'Proxy Server Iota',
    type: 'Server',
    'ip-address': '192.168.0.109',
    provider: 'google',
    zone: 'asia-east1-a',
  },
  {
    key: 9,
    id: 'T6U7V8W9X0',
    name: 'Monitoring Service Kappa',
    type: 'Service',
    'ip-address': '192.168.0.110',
    provider: 'aws',
    zone: 'us-west-1a',
  },
];

const Instructions = <template>
  <ShwTextH4 @tag="h3">Instructions</ShwTextH4>
  <ShwLabel {{style margin-bottom="32px"}}>
    You can use this example to test a few different things:
    <ul {{style line-height="1.5"}}>
      <li>Open the "Filter table" dropdown and start to fill one or both the fields → Nothing happens</li>
      <li>Click the "Apply" button → The table will be filtered based on the filtering values (it matches the provider or the zone, if the other is empty, or both if both the fields have values)</li>
      <li>Add a second row and click "Apply" → The table remains the same (the row is ignored if both fields are empty)</li>
      <li>Now fill the second row and click "Apply" → The table should update using an OR logic between the two rows</li>
      <li>Try to addd/delete rows → See how the "delete button" appears/disappears</li>
      <li>Try to addd/delete rows and click "Apply" → See how the table updates accordingly</li>
      <li>Click the "Reset" button → The entire content of the filter should return to its initial state, and the table should contain the entire data set</li>
      <li>Try also to close the dropdown (clicking outside or "esc") and then reopen it → See how the content of the filters remains the same</li>
    </ul>
  </ShwLabel>
</template>;

export default class MockComponentsFormKeyValueInputsAsFilterForTable extends Component<MockComponentsFormKeyValueInputsAsFilterForTableSignature> {
  collapseInstructions = this.args.collapseInstructions ?? false;
  @tracked alwaysShowDeleteButtonOnFirstRow = false;

  @deepTracked filterModel: FilterItem[] = [structuredClone(EMPTY_FILTER_ITEM)];
  @deepTracked filteredTableModel = structuredClone(TABLE_DATA);

  get emptyFilterModel(): FilterItem[] {
    return [structuredClone(EMPTY_FILTER_ITEM)];
  }

  get canDeleteRow() {
    return this.filterModel.length > 1;
  }

  onInputUpdateModel = (
    rowData: FilterItem,
    field: 'provider' | 'zone',
    event: Event,
  ) => {
    rowData[field] = (event.target as HTMLInputElement).value;
  };

  onAddRowClick = () => {
    this.filterModel.push({
      ...EMPTY_FILTER_ITEM,
      id: this.filterModel.length + 1,
    });
  };

  onDeleteRowClick = (rowIndex: number) => {
    if (rowIndex < 0 || rowIndex >= this.filterModel.length) {
      console.error(
        'Trying to delete a row with index out of boundaries of the `@data` array',
      );
    } else if (rowIndex === 0 && this.filterModel.length == 1) {
      this.filterModel = this.emptyFilterModel;
    } else {
      // Remove the item at the specific index
      this.filterModel.splice(rowIndex, 1);
    }

    // we need to return the focus to the "add" button or the focus moves to the `<body>` and this closes the dropdown
    const addButton = document.getElementById('add-row-button');
    if (addButton) {
      addButton.focus();
    }
  };

  onApplyFilterButtonClick = () => {
    const unfilteredTableData = structuredClone(TABLE_DATA);

    // if all the filters have empty values, show the unfiltered data
    const hasActiveFilters = this.filterModel.some(filter =>
      (filter.provider.trim() !== '') ||
      (filter.zone.trim() !== '')
    );

    if (!hasActiveFilters) {
      this.filteredTableModel = unfilteredTableData
    } else {
      this.filteredTableModel = unfilteredTableData.filter((rowData) => {
        return this.filterModel.some((filterItem) => {
          const providerIsEmpty = filterItem.provider.trim() === '';
          const zoneIsEmpty = filterItem.zone.trim() === '';
          const providerMatches =
            !providerIsEmpty &&
            rowData.provider
              .toLowerCase()
              .includes(filterItem.provider.toLowerCase());

          const zoneMatches =
            !zoneIsEmpty &&
            rowData.zone.toLowerCase().includes(filterItem.zone.toLowerCase());

          return (
            // both fields are not empty and match the filter
            (providerMatches && zoneMatches) ||
            // at least one of the two fields matches and the other is empty
            (providerMatches && zoneIsEmpty) ||
            (providerIsEmpty && zoneMatches)
          );
        });
      });
    }

  };

  onResetFilterButtonClick = () => {
    this.filterModel = this.emptyFilterModel;
    // we re-apply the filter to reset the table model
    this.onApplyFilterButtonClick();
  };

  // =====================================================

  <template>
    {{#if this.collapseInstructions}}
      <HdsReveal
        @text="Show instructions"
        @textWhenOpen="Hide instructions"
        {{style margin="24px 0"}}
      >
        <Instructions />
      </HdsReveal>
    {{else}}
      <Instructions />
    {{/if}}
    <div {{style width="100%"}} ...attributes>

      <div
        {{style display="flex" justify-content="flex-end" margin-bottom="24px"}}
      >
        <HdsDropdown
          @listPosition="bottom-right"
          @preserveContentInDom={{true}}
          as |D|
        >
          <D.ToggleButton @color="secondary" @text="Filter resources" />
          <D.Generic>
            <HdsFormKeyValueInputs
              @data={{this.filterModel}}
              {{style margin="16px 0"}}
            >
              <:header as |H|>
                <H.Legend>Filter by provider and zone</H.Legend>
              </:header>
              <:row as |R|>
                <R.Field @width="100px" as |F|>
                  <F.Label>Provider</F.Label>
                  <F.TextInput
                    {{! @glint-expect-error }}
                    @value={{R.rowData.provider}}
                    {{! @glint-expect-error }}
                    {{on "input" (fn this.onInputUpdateModel R.rowData "provider")}}
                  />
                </R.Field>
                <R.Field @width="150px" as |F|>
                  <F.Label>Zone</F.Label>
                  <F.TextInput
                    {{! @glint-expect-error }}
                    @value={{R.rowData.zone}}
                    {{! @glint-expect-error }}
                    {{on "input" (fn this.onInputUpdateModel R.rowData "zone")}}
                  />
                </R.Field>
                {{#if this.canDeleteRow}}
                  <R.DeleteRowButton
                    {{! @glint-expect-error }}
                    @onClick={{(fn this.onDeleteRowClick R.rowIndex)}}
                  />
                {{/if}}
              </:row>
              <:footer as |F|>
                <F.AddRowButton id="add-row-button" @onClick={{this.onAddRowClick}} />
              </:footer>
            </HdsFormKeyValueInputs>
          </D.Generic>
          <D.Footer @hasDivider={{true}}>
            <HdsButtonSet>
              <HdsButton
                @text="Apply"
                @isFullWidth={{true}}
                @size="small"
                {{on "click" this.onApplyFilterButtonClick}}
              />
              <HdsButton
                @text="Reset"
                @color="secondary"
                @isFullWidth={{true}}
                @size="small"
                {{on "click" this.onResetFilterButtonClick}}
              />
            </HdsButtonSet>
          </D.Footer>
        </HdsDropdown>
      </div>

      <HdsTable
        @model={{this.filteredTableModel}}
        @columns={{array
          (hash key="id" label="ID")
          (hash key="name" label="Name")
          (hash key="type" label="Type")
          (hash key="ip-address" label="Address")
          (hash key="provider" label="Provider")
          (hash key="zone" label="Zone")
        }}
      >
        <:body as |B|>
          <B.Tr id={{B.rowIndex}}>
            {{! @glint-expect-error }}
            <B.Td>{{B.data.id}}</B.Td>
            {{! @glint-expect-error }}
            <B.Td>{{B.data.name}}</B.Td>
            <B.Td><HdsBadge
              {{! @glint-expect-error }}
                @text={{B.data.type}}
                @size="small"
                {{! @glint-expect-error }}
                @type={{if (eq B.data.type "Server") "inverted" "filled"}}
              /></B.Td>
            {{! @glint-expect-error }}
            <B.Td>{{B.data.ip-address}}</B.Td>
            {{! @glint-expect-error }}
            <B.Td>{{B.data.provider}}</B.Td>
            {{! @glint-expect-error }}
            <B.Td>{{B.data.zone}}</B.Td>
          </B.Tr>
        </:body>
      </HdsTable>

    </div>
  </template>
}
