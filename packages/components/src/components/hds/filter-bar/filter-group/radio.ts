/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { action } from '@ember/object';
import { guidFor } from '@ember/object/internals';

import type { HdsFilterBarFilter } from '../types.ts';

export interface HdsFilterBarFilterGroupRadioSignature {
  Args: {
    value: string;
    label: string;
    name: string;
    searchValue?: string;
    keyFilter?: HdsFilterBarFilter;
    onChange?: (event: Event, label?: string) => void;
  };
  Blocks: {
    default: [];
  };
  Element: HTMLLabelElement;
}

export default class HdsFilterBarFilterGroupRadio extends Component<HdsFilterBarFilterGroupRadioSignature> {
  private _elementId = 'radio' + guidFor(this);

  @action
  onChange(event: Event): void {
    const { onChange, label } = this.args;
    if (onChange && typeof onChange === 'function') {
      onChange(event, label);
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

  get isHidden(): boolean {
    const { searchValue, label } = this.args;
    if (searchValue && searchValue.length > 0) {
      return !label.toLowerCase().includes(searchValue.toLowerCase());
    }
    return false;
  }

  get classNames(): string {
    const classes = [
      'hds-filter-bar__filter-group__radio',
      'hds-filter-bar__filter-group__selection-option',
      'hds-typography-body-200',
    ];

    if (this.isHidden) {
      classes.push(`hds-filter-bar__filter-group__selection-option--hidden`);
    }

    return classes.join(' ');
  }
}
