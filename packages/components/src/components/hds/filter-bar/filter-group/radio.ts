/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { action } from '@ember/object';

import type { HdsFilterBarFilter } from '../types.ts';

export interface HdsFilterBarFilterGroupRadioSignature {
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

export default class HdsFilterBarFilterGroupRadio extends Component<HdsFilterBarFilterGroupRadioSignature> {
  @action
  onChange(event: Event): void {
    const { onChange } = this.args;
    if (onChange && typeof onChange === 'function') {
      onChange(event);
    }
  }

  get isChecked(): boolean {
    const { keyFilter, value } = this.args;
    if (
      keyFilter &&
      keyFilter.type === 'single-select' &&
      value &&
      'value' in keyFilter.data
    ) {
      return keyFilter.data.value === value;
    }
    return false;
  }
}
