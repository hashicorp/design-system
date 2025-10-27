/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import type Owner from '@ember/owner';
import type { WithBoundArgs } from '@glint/template';
import { guidFor } from '@ember/object/internals';

import type {
  HdsFilterBarRangeFilter,
  HdsFilterBarRangeFilterSelector,
} from './types.ts';
import { HdsFilterBarRangeFilterSelectorValues } from './types.ts';

import HdsDropdownListItemGeneric from '../dropdown/list-item/generic.ts';

import type { HdsDropdownSignature } from '../dropdown/index.ts';

export const SELECTORS: HdsFilterBarRangeFilterSelector[] = Object.values(
  HdsFilterBarRangeFilterSelectorValues
);

export const SELECTORS_DISPLAY_TEXT: Record<
  HdsFilterBarRangeFilterSelectorValues,
  string
> = {
  [HdsFilterBarRangeFilterSelectorValues.lessThan]: 'Less than',
  [HdsFilterBarRangeFilterSelectorValues.lessThanOrEqualTo]:
    'Less than or equal to',
  [HdsFilterBarRangeFilterSelectorValues.equalTo]: 'Equal to',
  [HdsFilterBarRangeFilterSelectorValues.greaterThanOrEqualTo]:
    'Greater than or equal to',
  [HdsFilterBarRangeFilterSelectorValues.greaterThan]: 'Greater than',
};

export const SELECTORS_DISPLAY_SYMBOL: Record<
  HdsFilterBarRangeFilterSelectorValues,
  string
> = {
  [HdsFilterBarRangeFilterSelectorValues.lessThan]: '<',
  [HdsFilterBarRangeFilterSelectorValues.lessThanOrEqualTo]: '<=',
  [HdsFilterBarRangeFilterSelectorValues.equalTo]: '=',
  [HdsFilterBarRangeFilterSelectorValues.greaterThanOrEqualTo]: '>=',
  [HdsFilterBarRangeFilterSelectorValues.greaterThan]: '>',
};

export interface HdsFilterBarRangeSignature {
  Args: HdsDropdownSignature['Args'] & {
    generic?: WithBoundArgs<typeof HdsDropdownListItemGeneric, never>;
    keyFilter: HdsFilterBarRangeFilter | undefined;
    onChange?: (
      selector?: HdsFilterBarRangeFilterSelector,
      value?: number
    ) => void;
  };
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}

export default class HdsFilterBarRange extends Component<HdsFilterBarRangeSignature> {
  @tracked private _selector: HdsFilterBarRangeFilterSelector | undefined;
  @tracked private _value: number | undefined;

  private _selectorValues = SELECTORS;
  private _selectorInputId = 'selector-input-' + guidFor(this);
  private _valueInputId = 'value-input-' + guidFor(this);

  constructor(owner: Owner, args: HdsFilterBarRangeSignature['Args']) {
    super(owner, args);

    const { keyFilter } = this.args;
    if (keyFilter) {
      this._selector = keyFilter.selector;
      this._value = keyFilter.value;
    }
  }

  get stringValue(): string | undefined {
    return this._value !== undefined ? this._value.toString() : undefined;
  }

  selectorText(selector: HdsFilterBarRangeFilterSelector): string {
    return SELECTORS_DISPLAY_TEXT[selector];
  }

  @action
  onSelectorChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this._selector = select.value as HdsFilterBarRangeFilterSelector;
    this._onChange();
  }

  @action
  onValueChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this._value = parseFloat(input.value);
    this._onChange();
  }

  private _onChange(): void {
    const { onChange } = this.args;
    if (onChange && typeof onChange === 'function') {
      onChange(this._selector, this._value);
    }
  }
}
