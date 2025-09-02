/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { action } from '@ember/object';
import { on } from '@ember/modifier';
import type { WithBoundArgs } from '@glint/template';

import type { Filter } from './index';

// HDS components
import {
  HdsDropdownListItemRadio,
} from '@hashicorp/design-system-components/components';

import type { HdsDropdownSignature } from '@hashicorp/design-system-components/components/hds/dropdown/index';

export interface MockAppMainGenericFilterBarRadioSignature {
  Args: HdsDropdownSignature['Args'] & {
    radio?: WithBoundArgs<
      typeof HdsDropdownListItemRadio,
      never
    >;
    value?: string;
    keyFilter: Filter[] | Filter | undefined;
    onChange?: (event: Event) => void;
  }
  Blocks: {
    default: [],
  }
  Element: HTMLDivElement;
}

export default class MockAppMainGenericFilterBarRadio extends Component<MockAppMainGenericFilterBarRadioSignature> {
  @action
  onChange(event: Event): void {
    const { onChange } = this.args;
    if (onChange && typeof onChange === 'function') {
      onChange(event);
    }
  }

  get isChecked(): boolean {
    const { keyFilter, value } = this.args;
    if (Array.isArray(keyFilter)) {
      return keyFilter.some((filter) => filter.value === value);
    } else if (keyFilter && value) {
      return keyFilter.value === value;
    }
    return false;
  }

  <template>
    {{#let @radio as |Radio|}}
      <Radio
        checked={{this.isChecked}}
        @value={{@value}}
        {{on "change" this.onChange}}
      >
        {{yield}}
      </Radio>
    {{/let}}
  </template>
}
