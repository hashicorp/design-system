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
  @tracked demoGenericArrayName1 = 'Name 1';
  @tracked demoGenericArrayName2 = 'Name 2';
  @tracked demoGenericArrayFilters: HdsFilterBarSignature['Args']['filters'] = {
    'demo-generic-array': {
      type: 'generic',
      text: 'Generic',
      data: [
        {
          value: this.demoGenericArrayName1,
          label: this.demoGenericArrayName1,
        },
        {
          value: this.demoGenericArrayName2,
          dismissTagText: `equals ${this.demoGenericArrayName2}`,
        },
      ],
    },
  };

  demoUpdateGenericArrayFilters = (
    newFilters: HdsFilterBarSignature['Args']['filters'],
  ) => {
    this.demoGenericArrayFilters = newFilters;
    if (newFilters['demo-generic-array']) {
      const filterData = newFilters['demo-generic-array']
        ?.data as HdsFilterBarGenericFilterData[];
      if (filterData.length > 0) {
        this.demoGenericArrayName1 = String(filterData[0]?.value);
        this.demoGenericArrayName2 = String(filterData[1]?.value);
      }
    } else {
      this.demoGenericArrayName1 = '';
      this.demoGenericArrayName2 = '';
    }
  };

  onClear = () => {
    this.demoGenericArrayName1 = '';
    this.demoGenericArrayName2 = '';
  };

  onGenericArrayName1Change = (
    updateFilter: (filter: HdsFilterBarGenericFilter) => void,
    event: Event,
  ) => {
    const target = event.target as HTMLInputElement;
    this.demoGenericArrayName1 = target.value;

    this.updateGenericArrayFilters(updateFilter);
  };

  onGenericArrayName2Change = (
    updateFilter: (filter: HdsFilterBarGenericFilter) => void,
    event: Event,
  ) => {
    const target = event.target as HTMLInputElement;
    this.demoGenericArrayName2 = target.value;

    this.updateGenericArrayFilters(updateFilter);
  };

  updateGenericArrayFilters(
    updateFilter: (filter: HdsFilterBarGenericFilter) => void,
  ) {
    const demoGenericArrayNameData = [];
    if (this.demoGenericArrayName1) {
      demoGenericArrayNameData.push({
        value: this.demoGenericArrayName1,
      });
    }
    if (this.demoGenericArrayName2) {
      demoGenericArrayNameData.push({
        value: this.demoGenericArrayName2,
        dismissTagText: `equals ${this.demoGenericArrayName2}`,
      });
    }
    if (demoGenericArrayNameData.length > 0) {
      updateFilter({
        type: 'generic',
        text: 'Generic',
        data: demoGenericArrayNameData,
      } as HdsFilterBarGenericFilter);
    }
  }

  <template>
    <HdsFilterBar
      @filters={{this.demoGenericArrayFilters}}
      @onFilter={{this.demoUpdateGenericArrayFilters}}
      as |F|
    >
      <F.FiltersDropdown as |D|>
        <D.FilterGroup
          @key="demo-generic-array"
          @text="Generic"
          @type="generic"
          @onClear={{this.onClear}}
          as |FG|
        >
          <FG.Generic as |G|>
            <HdsFormTextInputField
              @value={{this.demoGenericArrayName1}}
              {{on "input" (fn this.onGenericArrayName1Change G.updateFilter)}}
              name="name-1"
              as |FT|
            >
              <FT.Label>Name 1</FT.Label>
            </HdsFormTextInputField>
            <HdsFormTextInputField
              @value={{this.demoGenericArrayName2}}
              {{on "input" (fn this.onGenericArrayName2Change G.updateFilter)}}
              name="name-2"
              as |FT|
            >
              <FT.Label>Name 2</FT.Label>
            </HdsFormTextInputField>
          </FG.Generic>
        </D.FilterGroup>
      </F.FiltersDropdown>
    </HdsFilterBar>
  </template>
}
