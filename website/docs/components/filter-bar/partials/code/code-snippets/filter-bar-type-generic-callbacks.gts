import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { on } from '@ember/modifier';
import { fn } from '@ember/helper';

import {
  HdsButton,
  HdsFilterBar,
  HdsFormTextInputField,
  HdsTextBody,
  type HdsFilterBarGenericFilter,
  type HdsFilterBarGenericFilterData,
} from '@hashicorp/design-system-components/components';
import type { HdsFilterBarSignature } from '@hashicorp/design-system-components/components/hds/filter-bar/index';

export default class LocalComponent extends Component {
  @tracked demoGenericFilters: HdsFilterBarSignature['Args']['filters'] = {};
  @tracked name = '';
  @tracked nameExtra = '';
  @tracked showExtraName = false;

  demoUpdateGenericFilters(
    newFilters: HdsFilterBarSignature['Args']['filters'],
  ) {
    if (newFilters['demo-generic']) {
      const data = newFilters['demo-generic']
        .data as HdsFilterBarGenericFilterData[];
      this.name = String(data[0]?.value);
      this.nameExtra = String(data[1]?.value);
      this.showExtraName = data.length > 1;
    } else {
      this.name = '';
      this.nameExtra = '';
      this.showExtraName = false;
    }
    this.demoGenericFilters = newFilters;
  }

  addExtraName = () => {
    this.showExtraName = true;
  };

  removeExtraName = () => {
    this.showExtraName = false;
    this.nameExtra = '';
  };

  onNameChange = (
    updateFilter: (filter: HdsFilterBarGenericFilter) => void,
    event: Event,
  ) => {
    const target = event.target as HTMLInputElement;
    this.name = target.value;

    this.updateFilters(updateFilter);
  };

  onNameExtraChange = (
    updateFilter: (filter: HdsFilterBarGenericFilter) => void,
    event: Event,
  ) => {
    const target = event.target as HTMLInputElement;
    this.nameExtra = target.value;

    this.updateFilters(updateFilter);
  };

  onClear = () => {
    this.name = '';
    this.nameExtra = '';
    this.showExtraName = false;
  };

  onFocusOut = () => {
    // If focus is lost, set it back to the first input in the filter
    const demoNameInput = document.getElementById(
      'demo-name',
    ) as HTMLInputElement | null;
    if (demoNameInput) {
      demoNameInput.focus();
    }
  };

  updateFilters(updateFilter: (filter: HdsFilterBarGenericFilter) => void) {
    const data = [];
    if (this.name) {
      data.push({
        value: this.name,
        label: this.name,
      });
    }
    if (this.nameExtra) {
      data.push({
        value: this.nameExtra,
        label: this.nameExtra,
      });
    }
    if (data.length > 0) {
      updateFilter({
        type: 'generic',
        data: data,
      });
    }
  }

  <template>
    <HdsFilterBar
      @filters={{this.demoGenericFilters}}
      @onFilter={{this.demoUpdateGenericFilters}}
      as |F|
    >
      <F.FiltersDropdown @onFocusOut={{this.onFocusOut}} as |D|>
        <D.FilterGroup
          @key="demo-generic"
          @text="Demo generic"
          @type="generic"
          @onClear={{this.onClear}}
          as |F|
        >
          <F.Generic as |G|>
            <HdsFormTextInputField
              @value={{this.name}}
              @id="demo-name"
              {{on "input" (fn this.onNameChange G.updateFilter)}}
              name="name"
              as |F|
            >
              <F.Label>Name</F.Label>
            </HdsFormTextInputField>
            {{#if this.showExtraName}}
              <HdsFormTextInputField
                @value={{this.nameExtra}}
                {{on "input" (fn this.onNameExtraChange G.updateFilter)}}
                name="name-extra"
                as |F|
              >
                <F.Label>Extra name</F.Label>
              </HdsFormTextInputField>
              <HdsButton
                @text="Remove name"
                @color="secondary"
                @size="small"
                id="btn-remove-extra-name"
                {{on "click" this.removeExtraName}}
              />
            {{else}}
              <HdsButton
                @text="Add name"
                @color="secondary"
                @size="small"
                id="btn-add-extra-name"
                {{on "click" this.addExtraName}}
              />
            {{/if}}
            <HdsTextBody @size="100">
              This filter has a dynamic template that changes based on the
              number of values added. On clear, the filter should reset to only
              showing one input.
            </HdsTextBody>
          </F.Generic>
        </D.FilterGroup>
      </F.FiltersDropdown>
    </HdsFilterBar>
  </template>
}
