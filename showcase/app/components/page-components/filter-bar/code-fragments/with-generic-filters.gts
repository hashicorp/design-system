/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { on } from '@ember/modifier';
import { fn } from '@ember/helper';
import { tracked } from '@glimmer/tracking';

import {
  HdsButton,
  HdsFilterBar,
  HdsFormTextInputField,
  HdsTextBody,
  type HdsFilterBarGenericFilter,
  type HdsFilterBarGenericFilterData,
} from '@hashicorp/design-system-components/components';
import type { HdsFilterBarSignature } from '@hashicorp/design-system-components/components/hds/filter-bar/index';

export interface CodeFragmentWithGenericContentSignature {
  Element: HTMLDivElement;
}

export default class CodeFragmentWithGenericContent extends Component<CodeFragmentWithGenericContentSignature> {
  @tracked filters: HdsFilterBarSignature['Args']['filters'] = {};
  @tracked demoShowSecondButton: boolean = false;
  @tracked singleFilterName = '';
  @tracked multiFilterName = '';
  @tracked multiFilterNameExtra = '';
  @tracked showExtraName = false;
  @tracked multiFilterDismissTextNameOne = '';
  @tracked multiFilterDismissTextNameTwo = '';

  onFilter = (filters: HdsFilterBarSignature['Args']['filters']) => {
    this.filters = filters;

    if (filters['single']) {
      const singleSelectData = filters['single']
        .data as HdsFilterBarGenericFilterData;
      this.singleFilterName = String(singleSelectData.value);
    } else {
      this.singleFilterName = '';
    }

    if (filters['multiselect']) {
      const multiSelectData = filters['multiselect']
        .data as HdsFilterBarGenericFilterData[];
      this.multiFilterName = String(multiSelectData[0]?.value);
      this.multiFilterNameExtra = String(multiSelectData[1]?.value);
      this.showExtraName = multiSelectData.length > 1;
    } else {
      this.multiFilterName = '';
      this.multiFilterNameExtra = '';
      this.showExtraName = false;
    }

    if (filters['multiselect-dismiss-text']) {
      const multiSelectDismissTextData = filters['multiselect-dismiss-text']
        .data as HdsFilterBarGenericFilterData[];
      this.multiFilterDismissTextNameOne = String(
        multiSelectDismissTextData[0]?.value,
      );
      this.multiFilterDismissTextNameTwo = String(
        multiSelectDismissTextData[1]?.value,
      );
    } else {
      this.multiFilterDismissTextNameOne = '';
      this.multiFilterDismissTextNameTwo = '';
    }
  };

  onSingleNameChange = (
    updateFilter: (filter: HdsFilterBarGenericFilter) => void,
    event: Event,
  ) => {
    const target = event.target as HTMLInputElement;
    this.singleFilterName = target.value;

    this.updateSingleFilter(updateFilter);
  };

  onSingleFilterClear = () => {
    this.singleFilterName = '';
  };

  updateSingleFilter(
    updateFilter: (filter: HdsFilterBarGenericFilter) => void,
  ): void {
    if (this.singleFilterName) {
      updateFilter({
        type: 'generic',
        dismissTagText: `equals ${this.singleFilterName}`,
        data: {
          value: `${this.singleFilterName}`,
        },
      } as HdsFilterBarGenericFilter);
    }
  }

  addExtraName = () => {
    this.showExtraName = true;
  };

  removeExtraName = () => {
    this.showExtraName = false;
    this.multiFilterNameExtra = '';
  };

  onMultiNameChange = (
    updateFilter: (filter: HdsFilterBarGenericFilter) => void,
    event: Event,
  ) => {
    const target = event.target as HTMLInputElement;
    this.multiFilterName = target.value;

    this.updateMultiFilters(updateFilter);
  };

  onMultiNameExtraChange = (
    updateFilter: (filter: HdsFilterBarGenericFilter) => void,
    event: Event,
  ) => {
    const target = event.target as HTMLInputElement;
    this.multiFilterNameExtra = target.value;

    this.updateMultiFilters(updateFilter);
  };

  onMultiFilterClear = () => {
    this.multiFilterName = '';
    this.multiFilterNameExtra = '';
    this.showExtraName = false;
  };

  updateMultiFilters(
    updateFilter: (filter: HdsFilterBarGenericFilter) => void,
  ): void {
    const multiSelectNameData = [];
    if (this.multiFilterName) {
      multiSelectNameData.push({
        value: this.multiFilterName,
        label: this.multiFilterName,
      });
    }
    if (this.multiFilterNameExtra) {
      multiSelectNameData.push({
        value: this.multiFilterNameExtra,
        label: this.multiFilterNameExtra,
      });
    }
    if (multiSelectNameData.length > 0) {
      updateFilter({
        type: 'generic',
        data: multiSelectNameData,
      } as HdsFilterBarGenericFilter);
    }
  }

  onMultiDismissTextNameChange = (
    updateFilter: (filter: HdsFilterBarGenericFilter) => void,
    event: Event,
  ) => {
    const target = event.target as HTMLInputElement;
    this.multiFilterDismissTextNameOne = target.value;

    this.updateMultiDismissTextFilters(updateFilter);
  };

  onMultiDismissTextNameTwoChange = (
    updateFilter: (filter: HdsFilterBarGenericFilter) => void,
    event: Event,
  ) => {
    const target = event.target as HTMLInputElement;
    this.multiFilterDismissTextNameTwo = target.value;

    this.updateMultiDismissTextFilters(updateFilter);
  };

  onMultiDismissTextClear = () => {
    this.multiFilterDismissTextNameOne = '';
    this.multiFilterDismissTextNameTwo = '';
  };

  updateMultiDismissTextFilters(
    updateFilter: (filter: HdsFilterBarGenericFilter) => void,
  ): void {
    const multiSelectNameData = [];
    if (this.multiFilterDismissTextNameOne) {
      multiSelectNameData.push({
        value: this.multiFilterDismissTextNameOne,
        dismissTagText: `equals ${this.multiFilterDismissTextNameOne}`,
      });
    }
    if (this.multiFilterDismissTextNameTwo) {
      multiSelectNameData.push({
        value: this.multiFilterDismissTextNameTwo,
        dismissTagText: `equals ${this.multiFilterDismissTextNameTwo}`,
      });
    }
    if (multiSelectNameData.length > 0) {
      updateFilter({
        type: 'generic',
        data: multiSelectNameData,
      } as HdsFilterBarGenericFilter);
    }
  }

  <template>
    <HdsFilterBar @filters={{this.filters}} @onFilter={{this.onFilter}} as |F|>
      <F.FiltersDropdown as |D|>
        <D.FilterGroup
          @key="single"
          @text="Single filter"
          @type="generic"
          @onClear={{this.onSingleFilterClear}}
          as |F|
        >
          <F.Generic as |G|>
            <HdsFormTextInputField
              @value={{this.singleFilterName}}
              {{on "input" (fn this.onSingleNameChange G.updateFilter)}}
              name="name-1"
              as |F|
            >
              <F.Label>Name</F.Label>
            </HdsFormTextInputField>
            <HdsTextBody @size="100">
              On entry this filter should be added, and on click of the clear
              button the input value should be cleared and the filter removed.
            </HdsTextBody>
          </F.Generic>
        </D.FilterGroup>
        <D.FilterGroup
          @key="multiselect"
          @text="Multi-select w/ dynamic content"
          @type="generic"
          @onClear={{this.onMultiFilterClear}}
          as |F|
        >
          <F.Generic as |G|>
            <HdsFormTextInputField
              @value={{this.multiFilterName}}
              {{on "input" (fn this.onMultiNameChange G.updateFilter)}}
              name="name-2"
              as |F|
            >
              <F.Label>Name</F.Label>
            </HdsFormTextInputField>
            {{#if this.showExtraName}}
              <HdsFormTextInputField
                @value={{this.multiFilterNameExtra}}
                {{on "input" (fn this.onMultiNameExtraChange G.updateFilter)}}
                name="name-2-extra"
                as |F|
              >
                <F.Label>Extra name</F.Label>
              </HdsFormTextInputField>
              <HdsButton
                @text="Remove name"
                @color="secondary"
                @size="small"
                id="btn-remove-extra-name"
                {{on "click" this.removeExtraName}}
              />
            {{else}}
              <HdsButton
                @text="Add name"
                @color="secondary"
                @size="small"
                id="btn-add-extra-name"
                {{on "click" this.addExtraName}}
              />
            {{/if}}
            <HdsTextBody @size="100">
              This filter has a dynamic template that changes based on the
              number of values added. Multiple filters should be added when
              multiple names are present. On clear, the filter should reset to
              only showing one input.
            </HdsTextBody>
          </F.Generic>
        </D.FilterGroup>
        <D.FilterGroup
          @key="multiselect-dismiss-text"
          @text="Multi-select w/ dismissTagText"
          @type="generic"
          @onClear={{this.onMultiDismissTextClear}}
          as |F|
        >
          <F.Generic as |G|>
            <HdsFormTextInputField
              @value={{this.multiFilterDismissTextNameOne}}
              {{on
                "input"
                (fn this.onMultiDismissTextNameChange G.updateFilter)
              }}
              name="name-3"
              as |F|
            >
              <F.Label>Name 1</F.Label>
            </HdsFormTextInputField>
            <HdsFormTextInputField
              @value={{this.multiFilterDismissTextNameTwo}}
              {{on
                "input"
                (fn this.onMultiDismissTextNameTwoChange G.updateFilter)
              }}
              name="name-3-extra"
              as |F|
            >
              <F.Label>Name 2</F.Label>
            </HdsFormTextInputField>
          </F.Generic>
        </D.FilterGroup>
      </F.FiltersDropdown>
    </HdsFilterBar>
  </template>
}
