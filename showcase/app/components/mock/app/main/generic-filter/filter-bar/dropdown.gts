/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { action } from '@ember/object';
import { hash } from '@ember/helper';
import { tracked } from '@glimmer/tracking';
import { on } from '@ember/modifier';
import { modifier } from 'ember-modifier';
import type { WithBoundArgs } from '@glint/template';

import MockAppMainGenericFilterBarCheckbox from './checkbox';
import MockAppMainGenericFilterBarRadio from './radio';

// HDS components
import {
  HdsButton,
  HdsButtonSet,
  HdsDropdown,
  HdsDropdownToggleButton,
} from '@hashicorp/design-system-components/components';

import type { Filters, Filter } from './index';
import type { HdsDropdownSignature } from '@hashicorp/design-system-components/components/hds/dropdown/index';

export interface MockAppMainGenericFilterBarDropdownSignature {
  Args: HdsDropdownSignature['Args'] & {
    dropdown?: WithBoundArgs<typeof HdsDropdown, never>;
    key: string;
    filters: Filters;
    isMultiSelect?: boolean;
    isLiveFilter?: boolean;
    onChange: (key: string, keyFilter?: Filter[]) => void;
  };
  Blocks: {
    default: [
      {
        ToggleButton?: WithBoundArgs<
          typeof HdsDropdownToggleButton,
          'color' | 'text'
        >;
        Checkbox?: WithBoundArgs<
          typeof MockAppMainGenericFilterBarCheckbox,
          'checkbox' | 'keyFilter' | 'onChange'
        >;
        Radio?: WithBoundArgs<
          typeof MockAppMainGenericFilterBarRadio,
          'radio' | 'keyFilter' | 'onChange'
        >;
      },
    ];
  };
  Element: HTMLDivElement;
}

export default class MockAppMainGenericFilterBarDropdown extends Component<
  HdsDropdownSignature & MockAppMainGenericFilterBarDropdownSignature
> {
  @tracked internalFilters: Filter[] | Filter | undefined = [];

  private _updateInternalFilters = modifier(() => {
    this.internalFilters = this.keyFilter;
  });

  get keyFilter(): Filter[] | Filter | undefined {
    const { filters, key } = this.args;

    if (!filters) {
      return undefined;
    }
    return filters[key];
  }

  @action
  onChange(event: Event): void {
    const addFilter = (value: unknown): Filter[] => {
      const newFilter = {
        text: value as string,
        value: value,
      };
      if (
        Array.isArray(this.internalFilters) &&
        input.classList.contains('hds-form-checkbox')
      ) {
        this.internalFilters.push(newFilter);
        return this.internalFilters;
      } else {
        return [newFilter];
      }
    };

    const removeFilter = (value: string): Filter[] => {
      const newFilter = [] as Filter[];
      if (Array.isArray(this.internalFilters)) {
        this.internalFilters.forEach((filter) => {
          if (filter.value != value) {
            newFilter.push(filter);
          }
        });
      }
      return newFilter;
    };

    const input = event.target as HTMLInputElement;

    let newFilter = [] as Filter[];

    if (input.checked) {
      newFilter = addFilter(input.value);
    } else {
      newFilter = removeFilter(input.value);
    }

    this.internalFilters = newFilter;

    if (this.args.isLiveFilter) {
      const { onChange } = this.args;
      if (onChange && typeof onChange === 'function') {
        if (newFilter.length === 0) {
          onChange(this.args.key, undefined);
        } else {
          onChange(this.args.key, newFilter);
        }
      }
    }
  }

  @action
  onApply(): void {
    const { onChange } = this.args;
    if (onChange && typeof onChange === 'function') {
      onChange(this.args.key, this.internalFilters);
    }
  }

  @action
  onClear(): void {
    this.internalFilters = [];

    const { onChange } = this.args;
    if (onChange && typeof onChange === 'function') {
      onChange(this.args.key, this.internalFilters);
    }
  }

  <template>
    {{! @glint-nocheck }}
    <HdsDropdown
      @listPosition="bottom-left"
      @height="200px"
      {{this._updateInternalFilters}}
      as |D|
    >
      {{yield
        (hash
          ToggleButton=(component D.ToggleButton text=@text color="secondary")
          Checkbox=(component
            MockAppMainGenericFilterBarCheckbox
            checkbox=D.Checkbox
            keyFilter=this.internalFilters
            onChange=this.onChange
          )
          Radio=(component
            MockAppMainGenericFilterBarRadio
            radio=D.Radio
            keyFilter=this.internalFilters
            onChange=this.onChange
          )
        )
      }}
      {{#unless @isLiveFilter}}
        <D.Footer @hasDivider={{true}}>
          <HdsButtonSet>
            <HdsButton
              @text="Apply filters"
              @isFullWidth={{true}}
              @size="small"
              {{on "click" this.onApply}}
            />
            <HdsButton
              @text="Clear"
              @color="secondary"
              @size="small"
              {{on "click" this.onClear}}
            />
          </HdsButtonSet>
        </D.Footer>
      {{/unless}}
    </HdsDropdown>
  </template>
}
