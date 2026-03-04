import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { on } from '@ember/modifier';
import { fn } from '@ember/helper';

import {
  HdsFilterBar,
  HdsFormTextInputField,
  type HdsFilterBarGenericFilter,
  type HdsFilterBarGenericFilterData,
} from '@hashicorp/design-system-components/components';
import type { HdsFilterBarSignature } from '@hashicorp/design-system-components/components/hds/filter-bar/index';

export default class LocalComponent extends Component {
  @tracked demoGenericName = 'Name';
  @tracked demoGenericFilters: HdsFilterBarSignature['Args']['filters'] = {
    'demo-generic': {
      type: 'generic',
      text: 'Generic',
      dismissTagText: `equals ${this.demoGenericName}`,
      data: {
        value: this.demoGenericName,
      },
    },
  };

  demoUpdateGenericFilters = (
    newFilters: HdsFilterBarSignature['Args']['filters'],
  ) => {
    this.demoGenericFilters = newFilters;
    if (newFilters['demo-generic']) {
      const filterData = newFilters['demo-generic']
        ?.data as HdsFilterBarGenericFilterData;
      this.demoGenericName = String(filterData.value);
    } else {
      this.demoGenericName = '';
    }
  };

  onClear = () => {
    this.demoGenericName = '';
  };

  onGenericNameChange = (
    updateFilter: (filter: HdsFilterBarGenericFilter) => void,
    event: Event,
  ) => {
    const target = event.target as HTMLInputElement;
    this.demoGenericName = target.value;

    this.updateGenericFilters(updateFilter);
  };

  updateGenericFilters(
    updateFilter: (filter: HdsFilterBarGenericFilter) => void,
  ) {
    const demoGenericNameData = [];
    if (this.demoGenericName) {
      demoGenericNameData.push({
        value: this.demoGenericName,
      });
    }
    if (demoGenericNameData.length > 0) {
      updateFilter({
        type: 'generic',
        text: 'Generic',
        dismissTagText: `equals ${this.demoGenericName}`,
        data: {
          value: this.demoGenericName,
        },
      } as HdsFilterBarGenericFilter);
    }
  }

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
          @onClear={{this.onClear}}
          as |FG|
        >
          <FG.Generic as |G|>
            <HdsFormTextInputField
              @value={{this.demoGenericName}}
              {{on "input" (fn this.onGenericNameChange G.updateFilter)}}
              name="name"
              as |FT|
            >
              <FT.Label>Name</FT.Label>
            </HdsFormTextInputField>
          </FG.Generic>
        </D.FilterGroup>
      </F.FiltersDropdown>
    </HdsFilterBar>
  </template>
}
