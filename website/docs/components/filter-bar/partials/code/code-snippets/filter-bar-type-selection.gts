import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

import { HdsFilterBar } from '@hashicorp/design-system-components/components';
import type { HdsFilterBarSignature } from '@hashicorp/design-system-components/components/hds/filter-bar/index';

export default class LocalComponent extends Component {
  @tracked demoSelectionFilters: HdsFilterBarSignature['Args']['filters'] = {
    'demo-single-select': {
      type: 'single-select',
      text: 'Single-select',
      data: {
        value: 'option-1',
        label: 'Option 1',
      },
    },
    'demo-multi-select': {
      type: 'multi-select',
      text: 'Multi-select',
      data: [
        { value: 'option-1', label: 'Option 1' },
        { value: 'option-2', label: 'Option 2' },
      ],
    },
  };

  demoUpdateSelectionFilters = (
    newFilters: HdsFilterBarSignature['Args']['filters'],
  ) => {
    this.demoSelectionFilters = newFilters;
  };

  <template>
    <HdsFilterBar
      @filters={{this.demoSelectionFilters}}
      @onFilter={{this.demoUpdateSelectionFilters}}
      as |F|
    >
      <F.FiltersDropdown as |D|>
        <D.FilterGroup
          @key="demo-single-select"
          @text="Single-select"
          @type="single-select"
          @searchEnabled={{true}}
          as |F|
        >
          <F.Radio @value="option-1" @label="Option 1" />
          <F.Radio @value="option-2" @label="Option 2" />
          <F.Radio @value="option-3" @label="Option 3" />
        </D.FilterGroup>
        <D.FilterGroup
          @key="demo-multi-select"
          @text="Multi-select"
          @type="multi-select"
          @searchEnabled={{true}}
          as |F|
        >
          <F.Checkbox @value="option-1" @label="Option 1" />
          <F.Checkbox @value="option-2" @label="Option 2" />
          <F.Checkbox @value="option-3" @label="Option 3" />
        </D.FilterGroup>
      </F.FiltersDropdown>
    </HdsFilterBar>
  </template>
}
