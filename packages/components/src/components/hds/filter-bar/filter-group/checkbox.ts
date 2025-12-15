/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { action } from '@ember/object';
import { guidFor } from '@ember/object/internals';

import type { HdsFilterBarFilter } from '../types.ts';

export interface HdsFilterBarFilterGroupCheckboxSignature {
  Args: {
    value: string;
    label: string;
    keyFilter?: HdsFilterBarFilter;
    onChange?: (event: Event, label?: string) => void;
  };
  Blocks: {
    default: [];
  };
  Element: HTMLLIElement;
}

export default class HdsFilterBarFilterGroupCheckbox extends Component<HdsFilterBarFilterGroupCheckboxSignature> {
  private _elementId = 'checkbox' + guidFor(this);

  @action
  onChange(event: Event): void {
    const { onChange, label } = this.args;
    if (onChange && typeof onChange === 'function') {
      onChange(event, label);
    }
  }

  get isChecked(): boolean {
    const { keyFilter, value } = this.args;
    if (keyFilter && Array.isArray(keyFilter.data)) {
      return keyFilter.data.some((filter) => filter.value === value);
    }
    return false;
  }
}
