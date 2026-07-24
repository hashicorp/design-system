/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

import {
  HdsButton,
  HdsFilterBar,
} from '@hashicorp/design-system-components/components';
import type { HdsFilterBarSignature } from '@hashicorp/design-system-components/components/hds/filter-bar/index';

const EMPTY_FILTERS = {};

export interface CodeFragmentWithWrappingNoSegmentedGroupSignature {
  Element: HTMLDivElement;
}

export default class CodeFragmentWithWrappingNoSegmentedGroup extends Component<CodeFragmentWithWrappingNoSegmentedGroupSignature> {
  @tracked filters: HdsFilterBarSignature['Args']['filters'] = EMPTY_FILTERS;

  onFilter = (filters: HdsFilterBarSignature['Args']['filters']) => {
    this.filters = filters;
  };

  <template>
    <HdsFilterBar @filters={{this.filters}} @onFilter={{this.onFilter}} as |F|>
      <F.ActionsGeneric>
        <HdsButton
          @text="101 Needs attention"
          @icon="alert-circle"
          @iconPosition="leading"
          @color="secondary"
          @size="small"
        />
        <HdsButton
          @text="32 Errored"
          @icon="x-circle"
          @iconPosition="leading"
          @color="secondary"
          @size="small"
        />
        <HdsButton
          @text="41 Running"
          @icon="running"
          @iconPosition="leading"
          @color="secondary"
          @size="small"
        />
        <HdsButton
          @text="4 On hold"
          @icon="pause-circle"
          @iconPosition="leading"
          @color="secondary"
          @size="small"
        />
        <HdsButton
          @text="200 Completed"
          @icon="check-circle"
          @iconPosition="leading"
          @color="secondary"
          @size="small"
        />
      </F.ActionsGeneric>
      <F.ActionsDropdown as |D|>
        <D.Interactive @href="#" @icon="plus">Create new</D.Interactive>
        <D.Interactive @href="#" @icon="download">Export</D.Interactive>
        <D.Interactive @href="#" @icon="refresh">Refresh</D.Interactive>
        <D.Separator />
        <D.Interactive @href="#" @icon="settings">Settings</D.Interactive>
      </F.ActionsDropdown>
      <F.FiltersDropdown as |D|>
        <D.FilterGroup
          @key="status"
          @text="Status"
          @type="multi-select"
          as |F|
        >
          <F.Checkbox @value="needs-attention" @label="Needs attention" />
          <F.Checkbox @value="errored" @label="Errored" />
          <F.Checkbox @value="running" @label="Running" />
          <F.Checkbox @value="on-hold" @label="On hold" />
          <F.Checkbox @value="completed" @label="Completed" />
        </D.FilterGroup>
        <D.FilterGroup
          @key="priority"
          @text="Priority"
          @type="single-select"
          as |F|
        >
          <F.Radio @value="high" @label="High" />
          <F.Radio @value="medium" @label="Medium" />
          <F.Radio @value="low" @label="Low" />
        </D.FilterGroup>
      </F.FiltersDropdown>
    </HdsFilterBar>
  </template>
}
