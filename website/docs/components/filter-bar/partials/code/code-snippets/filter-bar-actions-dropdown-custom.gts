import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

import { HdsFilterBar } from '@hashicorp/design-system-components/components';
import type { HdsFilterBarSignature } from '@hashicorp/design-system-components/components/hds/filter-bar/index';

export default class LocalComponent extends Component {
  @tracked demoEmptyFilters: HdsFilterBarSignature['Args']['filters'] = {};

  demoUpdateEmptyFilters = (
    newFilters: HdsFilterBarSignature['Args']['filters'],
  ) => {
    this.demoEmptyFilters = newFilters;
  };

  <template>
    <HdsFilterBar
      @filters={{this.demoEmptyFilters}}
      @onFilter={{this.demoUpdateEmptyFilters}}
      as |F|
    >
      <F.FiltersDropdown as |D|>
        <D.FilterGroup
          @key="project"
          @text="Project"
          @type="multi-select"
          as |F|
        >
          <F.Checkbox @value="project-1" @label="Project 1" />
          <F.Checkbox @value="project-2" @label="Project 2" />
          <F.Checkbox @value="project-3" @label="Project 3" />
        </D.FilterGroup>
        <D.FilterGroup
          @key="version"
          @text="Version"
          @type="single-select"
          as |F|
        >
          <F.Radio @value="1.0" @label="1.0" />
          <F.Radio @value="2.0" @label="2.0" />
          <F.Radio @value="3.0" @label="3.0" />
        </D.FilterGroup>
      </F.FiltersDropdown>
      <F.ActionsDropdown
        @toggleButtonText="Item actions"
        @toggleButtonIcon="outline"
        as |D|
      >
        <D.Interactive @icon="edit">Edit items</D.Interactive>
        <D.Interactive @icon="trash" @color="critical">Delete items</D.Interactive>
        <D.Separator />
        <D.Interactive @icon="check-circle">Select entire data set</D.Interactive>
        <D.Interactive @icon="rotate-ccw">Reset selection</D.Interactive>
      </F.ActionsDropdown>
    </HdsFilterBar>
  </template>
}
