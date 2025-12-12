/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';

import ShwPlaceholder from 'showcase/components/shw/placeholder';

import { HdsFilterBar } from '@hashicorp/design-system-components/components';

const EMPTY_FILTERS = {};

const SAMPLE_FILTERS = {
  'multi-select': {
    type: 'multi-select',
    text: 'Multi-select',
    data: [
      { value: '1', label: 'Option 1' },
      { value: '2', label: 'Option 2' },
      { value: '2', label: 'Option 3' },
    ],
  },
};

const SAMPLE_FILTERS_LONG = {
  'multi-select': {
    type: 'multi-select',
    text: 'Multi-select',
    data: [
      { value: '1', label: 'Option 1' },
      { value: '2', label: 'Option 2' },
      { value: '2', label: 'Option 3' },
      { value: '4', label: 'Option 4' },
      { value: '5', label: 'Option 5' },
      { value: '6', label: 'Option 6' },
      { value: '7', label: 'Option 7' },
      { value: '8', label: 'Option 8' },
    ],
  },
};

export interface CodeFragmentWithGenericContentSignature {
  Args: {
    hasSearch?: boolean;
    searchPlaceholder?: string;
    hasActionsDropdown?: boolean;
    hasActionsGeneric?: boolean;
    hasFilters?: boolean;
    filtersLength?: 'short' | 'long';
  };
  Element: HTMLDivElement;
}

export default class CodeFragmentWithGenericContent extends Component<CodeFragmentWithGenericContentSignature> {
  get filters() {
    if (this.args.hasFilters) {
      if (this.args.filtersLength === 'long') {
        return SAMPLE_FILTERS_LONG;
      }
      return SAMPLE_FILTERS;
    }
    return EMPTY_FILTERS;
  }

  <template>
    <HdsFilterBar
      @filters={{this.filters}}
      @hasSearch={{@hasSearch}}
      @searchPlaceholder={{@searchPlaceholder}}
      as |F|
    >
      {{#if @hasActionsGeneric}}
        <F.ActionsGeneric>
          <ShwPlaceholder @text="generic content" @height="24" />
        </F.ActionsGeneric>
      {{/if}}
      {{#if @hasActionsDropdown}}
        <F.ActionsDropdown as |D|>
          <D.Title @text="Title Text" />
          <D.Description @text="Descriptive text goes here." />
          <D.Interactive @href="#">Add</D.Interactive>
          <D.Interactive @href="#">Add More</D.Interactive>
          <D.Interactive @href="#">Add Another Thing Too</D.Interactive>
          <D.Separator />
          <D.Interactive @icon="trash" @color="critical">Delete</D.Interactive>
        </F.ActionsDropdown>
      {{/if}}
      <F.Dropdown as |D|>
        <D.FilterGroup
          @key="multi-select"
          @text="Multi-select"
          @type="multi-select"
          as |F|
        >
          <F.Checkbox @value="1" @label="Option 1" />
          <F.Checkbox @value="2" @label="Option 2" />
          <F.Checkbox @value="3" @label="Option 3" />
        </D.FilterGroup>
        <D.FilterGroup
          @key="single-select"
          @text="Single-select"
          @type="single-select"
          as |F|
        >
          <F.Radio @value="1" @label="Option 1" />
          <F.Radio @value="2" @label="Option 2" />
          <F.Radio @value="3" @label="Option 3" />
        </D.FilterGroup>
        <D.FilterGroup @key="numerical" @text="Numerical" @type="numerical" />
        <D.FilterGroup @key="date" @text="Date" @type="date" />
        <D.FilterGroup @key="datetime" @text="Datetime" @type="datetime" />
        <D.FilterGroup @key="time" @text="Time" @type="time" />
        <D.FilterGroup @key="generic" @text="Generic" @type="generic" />
      </F.Dropdown>
    </HdsFilterBar>
  </template>
}
