/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { action } from '@ember/object';
import type { WithBoundArgs } from '@glint/template';

import type { HdsFilterBarSelectionFilter } from './types.ts';

import HdsDropdownListItemRadio from '../dropdown/list-item/radio.ts';

import type { HdsDropdownSignature } from '../dropdown/index.ts';

export interface HdsFilterBarRadioSignature {
  Args: HdsDropdownSignature['Args'] & {
    radio?: WithBoundArgs<typeof HdsDropdownListItemRadio, never>;
    value?: string;
    keyFilter: HdsFilterBarSelectionFilter | undefined;
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
    if (keyFilter && value) {
      return keyFilter.value === value;
    }
    return false;
  }
}
