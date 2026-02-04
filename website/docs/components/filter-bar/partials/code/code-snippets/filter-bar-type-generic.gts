import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { on } from '@ember/modifier';
import { fn } from '@ember/helper';

import {
  HdsButton,
  HdsFilterBar,
  type HdsFilterBarGenericFilter,
} from '@hashicorp/design-system-components/components';
import type { HdsFilterBarSignature } from '@hashicorp/design-system-components/components/hds/filter-bar/index';

const CUSTOM_FILTER = {
  type: 'generic',
  dismissTagText: 'equals lorem ipsum',
  data: {
    value: 'lorem ipsum',
  },
} as HdsFilterBarGenericFilter;

export default class LocalComponent extends Component {
  @tracked demoGenericFilters: HdsFilterBarSignature['Args']['filters'] = {
    'demo-generic': {
      type: 'generic',
      text: 'Generic',
      dismissTagText: 'equals lorem ipsum',
      data: {
        value: 'lorem ipsum',
      },
    },
  };

  demoUpdateGenericFilters = (
    newFilters: HdsFilterBarSignature['Args']['filters'],
  ) => {
    this.demoGenericFilters = newFilters;
  };

  onGenericFilterUpdate = (
    updateFilter: (filter: HdsFilterBarGenericFilter) => void,
  ) => {
    updateFilter(CUSTOM_FILTER);
  };

  <template>
    <HdsFilterBar
      @filters={{this.demoGenericFilters}}
      @onFilter={{this.demoUpdateGenericFilters}}
      as |F|
    >
      <F.FiltersDropdown as |D|>
        <D.FilterGroup
          @key="demo-generic"
          @text="Generic"
          @type="generic"
          as |F|
        >
          <F.Generic as |G|>
            <HdsButton
              @text="Add custom filter"
              @color="secondary"
              @size="small"
              {{on "click" (fn this.onGenericFilterUpdate G.updateFilter)}}
            />
          </F.Generic>
        </D.FilterGroup>
      </F.FiltersDropdown>
    </HdsFilterBar>
  </template>
}
