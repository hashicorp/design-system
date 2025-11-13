/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { action } from '@ember/object';

import type { HdsFilterBarData } from './types.ts';

export interface HdsFilterBarRadioSignature {
  Args: {
    value?: string;
    keyFilter: HdsFilterBarData | undefined;
    onChange?: (event: Event) => void;
  };
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}

export default class HdsFilterBarRadio extends Component<HdsFilterBarRadioSignature> {
  @action
  onChange(event: Event): void {
    const { onChange } = this.args;
    if (onChange && typeof onChange === 'function') {
      onChange(event);
    }
  }

  get isChecked(): boolean {
    const { keyFilter, value } = this.args;
    if (keyFilter && value && 'value' in keyFilter) {
      return keyFilter.value === value;
    }
    return false;
  }
}
