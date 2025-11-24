/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { action } from '@ember/object';

import type { HdsFilterBarFilter } from '../types.ts';

export interface HdsFilterBarFilterGroupCheckboxSignature {
  Args: {
    value?: string;
    keyFilter: HdsFilterBarFilter | undefined;
    onChange?: (event: Event) => void;
  };
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}

export default class HdsFilterBarFilterGroupCheckbox extends Component<HdsFilterBarFilterGroupCheckboxSignature> {
  @action
  onChange(event: Event): void {
    const { onChange } = this.args;
    if (onChange && typeof onChange === 'function') {
      onChange(event);
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
