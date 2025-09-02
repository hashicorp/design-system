/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { action } from '@ember/object';
import type { WithBoundArgs } from '@glint/template';
import { hash } from '@ember/helper';

import MockAppMainGenericFilterBarCheckbox from './checkbox';
import MockAppMainGenericFilterBarRadio from './radio';

// HDS components
import {
  HdsDropdown,
  HdsDropdownToggleButton,
} from '@hashicorp/design-system-components/components';

import type { Filters, Filter } from './index';
import type { HdsDropdownSignature } from '@hashicorp/design-system-components/components/hds/dropdown/index';


export interface MockAppMainGenericFilterBarDropdownSignature {
  Args: HdsDropdownSignature['Args'] & {
    dropdown?: WithBoundArgs<
      typeof HdsDropdown,
      never
    >;
    key: string;
    isMultiSelect?: boolean;
    filters: Filters;
    onChange: (key: string, keyFilter?: Filter[]) => void;
  }
  Blocks: {
    default: [
      {
        ToggleButton?: WithBoundArgs<
          typeof HdsDropdownToggleButton,
          | 'color'
          | 'text'
        >;
        Checkbox?: WithBoundArgs<
          typeof MockAppMainGenericFilterBarCheckbox,
          | 'checkbox'
          | 'keyFilter'
          | 'onChange'
        >;
        Radio?: WithBoundArgs<
          typeof MockAppMainGenericFilterBarRadio,
          | 'radio'
          | 'keyFilter'
          | 'onChange'
        >;
      },
    ];
  };
  Element: HTMLDivElement;
}

export default class MockAppMainGenericFilterBarDropdown extends Component<HdsDropdownSignature & MockAppMainGenericFilterBarDropdownSignature> {
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
      }
      if (Array.isArray(this.keyFilter) && input.classList.contains('hds-form-checkbox')) {
        this.keyFilter.push(newFilter);
        return this.keyFilter;
      } else {
        return [newFilter];
      }
    }

    const removeFilter = (value: string): Filter[] => {
      const newFilter = [] as Filter[];
      if (Array.isArray(this.keyFilter)) {
        this.keyFilter.forEach((filter) => {
          if (filter.value != value) {
            newFilter.push(filter);
          }
        });
      }
      return newFilter;
    }

    const input = event.target as HTMLInputElement;

    let newFilter = [] as Filter[];

    if (input.checked) {
      newFilter = addFilter(input.value)
    } else {
      newFilter = removeFilter(input.value)
    }

    const { onChange } = this.args;
    if (onChange && typeof onChange === 'function') {
      if (newFilter.length === 0) {
        onChange(this.args.key, undefined);
      } else {
        onChange(this.args.key, newFilter);
      }
    }
  }

  <template>
    {{! @glint-nocheck }}
    <HdsDropdown @listPosition="bottom-left" as |D|>
      {{yield
        (hash
          ToggleButton=(component
            D.ToggleButton
            text=@text
            color="secondary"
          )
          Checkbox=(component
            MockAppMainGenericFilterBarCheckbox
            checkbox=D.Checkbox
            keyFilter=this.keyFilter
            onChange=this.onChange
          )
          Radio=(component
            MockAppMainGenericFilterBarRadio
            radio=D.Radio
            keyFilter=this.keyFilter
            onChange=this.onChange
          )
        )
      }}
    </HdsDropdown>
  </template>
}
