/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

import {
  HdsDropdown,
  HdsFilterBar,
  HdsSegmentedGroup,
} from '@hashicorp/design-system-components/components';
import type { HdsFilterBarSignature } from '@hashicorp/design-system-components/components/hds/filter-bar/index';

const EMPTY_FILTERS = {};

export interface CodeFragmentWithWrappingResponsiveSignature {
  Element: HTMLDivElement;
}

export default class CodeFragmentWithWrappingResponsive extends Component<CodeFragmentWithWrappingResponsiveSignature> {
  @tracked filters: HdsFilterBarSignature['Args']['filters'] = EMPTY_FILTERS;

  onFilter = (filters: HdsFilterBarSignature['Args']['filters']) => {
    this.filters = filters;
  };

  <template>
    <style>
      .quick-filters-segmented {
        display: none;
      }
      .quick-filters-dropdown {
        display: block;
      }
      @media (min-width: 1000px) {
        .quick-filters-segmented {
          display: block;
        }
        .quick-filters-dropdown {
          display: none;
        }
      }
    </style>
    <HdsFilterBar @filters={{this.filters}} @onFilter={{this.onFilter}} as |F|>
      <F.ActionsGeneric>
        <div class="quick-filters-segmented">
          <HdsSegmentedGroup as |SG|>
            <SG.Button
              @text="101 Needs attention"
              @icon="alert-circle"
              @color="secondary"
              @size="small"
            />
            <SG.Button
              @text="32 Errored"
              @icon="x-circle"
              @color="secondary"
              @size="small"
            />
            <SG.Button
              @text="41 Running"
              @icon="running"
              @color="secondary"
              @size="small"
            />
            <SG.Button
              @text="4 On hold"
              @icon="pause-circle"
              @color="secondary"
              @size="small"
            />
            <SG.Button
              @text="200 Completed"
              @icon="check-circle"
              @color="secondary"
              @size="small"
            />
          </HdsSegmentedGroup>
        </div>
        <div class="quick-filters-dropdown">
          <HdsDropdown as |D|>
            <D.ToggleButton @text="Quick filters" @color="secondary" @size="small" />
            <D.Interactive @href="#" @icon="alert-circle">101 Needs attention</D.Interactive>
            <D.Interactive @href="#" @icon="x-circle">32 Errored</D.Interactive>
            <D.Interactive @href="#" @icon="running">41 Running</D.Interactive>
            <D.Interactive @href="#" @icon="pause-circle">4 On hold</D.Interactive>
            <D.Interactive @href="#" @icon="check-circle">200 Completed</D.Interactive>
          </HdsDropdown>
        </div>
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
