import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

import { HdsFilterBar } from '@hashicorp/design-system-components/components';
import type { HdsFilterBarSignature } from '@hashicorp/design-system-components/components/hds/filter-bar/index';

export default class LocalComponent extends Component {
  @tracked demoNumericalFilters: HdsFilterBarSignature['Args']['filters'] = {
    'demo-numerical-a': {
      type: 'numerical',
      text: 'Numerical A',
      data: {
        selector: 'less-than',
        value: 10,
      },
    },
    'demo-numerical-b': {
      type: 'numerical',
      text: 'Numerical B',
      data: {
        selector: 'between',
        value: {
          start: 10,
          end: 20,
        },
      },
    },
  };

  demoUpdateNumericalFilters = (
    newFilters: HdsFilterBarSignature['Args']['filters'],
  ) => {
    this.demoNumericalFilters = newFilters;
  };

  <template>
    <HdsFilterBar
      @filters={{this.demoNumericalFilters}}
      @onFilter={{this.demoUpdateNumericalFilters}}
      as |F|
    >
      <F.FiltersDropdown as |D|>
        <D.FilterGroup
          @key="demo-numerical-a"
          @text="Numerical A"
          @type="numerical"
        />
        <D.FilterGroup
          @key="demo-numerical-b"
          @text="Numerical B"
          @type="numerical"
        />
      </F.FiltersDropdown>
    </HdsFilterBar>
  </template>
}
