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
          @key="demo-multi-select"
          @text="Multi-select"
          @type="multi-select"
          as |F|
        >
          <F.Checkbox @value="option-1" @label="Option 1" />
          <F.Checkbox @value="option-2" @label="Option 2" />
          <F.Checkbox @value="option-3" @label="Option 3" />
        </D.FilterGroup>
        <D.FilterGroup
          @key="demo-single-select"
          @text="Single-select"
          @type="single-select"
          as |F|
        >
          <F.Radio @value="option-1" @label="Option 1" />
          <F.Radio @value="option-2" @label="Option 2" />
          <F.Radio @value="option-3" @label="Option 3" />
        </D.FilterGroup>
        <D.FilterGroup @key="demo-number" @text="Number" @type="numerical" />
        <D.FilterGroup @key="date" @text="Date" @type="date" />
        <D.FilterGroup @key="demo-time" @text="Time" @type="time" />
        <D.FilterGroup @key="demo-datetime" @text="Datetime" @type="datetime" />
      </F.FiltersDropdown>
    </HdsFilterBar>
  </template>
}
