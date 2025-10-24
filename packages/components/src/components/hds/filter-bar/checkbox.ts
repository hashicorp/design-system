/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { action } from '@ember/object';
import type { WithBoundArgs } from '@glint/template';

import type { HdsFilterBarFilter } from './types.ts';

import HdsDropdownListItemCheckbox from '../dropdown/list-item/checkbox.ts';

import type { HdsDropdownSignature } from '../dropdown/index.ts';

export interface HdsFilterBarCheckboxSignature {
  Args: HdsDropdownSignature['Args'] & {
    checkbox?: WithBoundArgs<typeof HdsDropdownListItemCheckbox, never>;
    value?: string;
    keyFilter: HdsFilterBarFilter[] | HdsFilterBarFilter | undefined;
    onChange?: (event: Event) => void;
  };
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}

export default class HdsFilterBarCheckbox extends Component<HdsFilterBarCheckboxSignature> {
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
}
