/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import type Owner from '@ember/owner';
import { guidFor } from '@ember/object/internals';
import { service } from '@ember/service';

import type HdsIntlService from '../../../services/hds-intl';
import type {
  HdsFilterBarData,
  HdsFilterBarRangeFilterSelector,
  HdsFilterBarRangeFilterValue,
} from './types.ts';
import { HdsFilterBarRangeFilterSelectorValues } from './types.ts';

export const SELECTORS: HdsFilterBarRangeFilterSelector[] = Object.values(
  HdsFilterBarRangeFilterSelectorValues
);

export const SELECTORS_DISPLAY_TEXT: Record<
  HdsFilterBarRangeFilterSelector,
  string
> = {
  [HdsFilterBarRangeFilterSelectorValues.lessThan]: 'Less than (<)',
  [HdsFilterBarRangeFilterSelectorValues.lessThanOrEqualTo]:
    'Less than or equal to (≤)',
  [HdsFilterBarRangeFilterSelectorValues.equalTo]: 'Equal to (=)',
  [HdsFilterBarRangeFilterSelectorValues.greaterThanOrEqualTo]:
    'Greater than or equal to (≥)',
  [HdsFilterBarRangeFilterSelectorValues.greaterThan]: 'Greater than (>)',
  [HdsFilterBarRangeFilterSelectorValues.between]: 'Between',
};

export const SELECTORS_DISPLAY_SYMBOL: Record<
  HdsFilterBarRangeFilterSelector,
  string
> = {
  [HdsFilterBarRangeFilterSelectorValues.lessThan]: '<',
  [HdsFilterBarRangeFilterSelectorValues.lessThanOrEqualTo]: '≤',
  [HdsFilterBarRangeFilterSelectorValues.equalTo]: '=',
  [HdsFilterBarRangeFilterSelectorValues.greaterThanOrEqualTo]: '≥',
  [HdsFilterBarRangeFilterSelectorValues.greaterThan]: '>',
  [HdsFilterBarRangeFilterSelectorValues.between]: 'between',
};

export interface HdsFilterBarRangeSignature {
  Args: {
    keyFilter: HdsFilterBarData | undefined;
    onChange?: (
      selector?: HdsFilterBarRangeFilterSelector,
      value?: HdsFilterBarRangeFilterValue
    ) => void;
  };
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}

export default class HdsFilterBarRange extends Component<HdsFilterBarRangeSignature> {
  @service hdsIntl!: HdsIntlService;

  @tracked private _selector: HdsFilterBarRangeFilterSelector | undefined;
  @tracked private _value: number | undefined;
  @tracked private _betweenValueStart: number | undefined;
  @tracked private _betweenValueEnd: number | undefined;

  private _selectorValues = SELECTORS;
  private _selectorInputId = 'selector-input-' + guidFor(this);
  private _valueInputId = 'value-input-' + guidFor(this);
  private _betweenValueStartInputId =
    'between-value-start-input-' + guidFor(this);
  private _betweenValueEndInputId = 'between-value-end-input-' + guidFor(this);

  constructor(owner: Owner, args: HdsFilterBarRangeSignature['Args']) {
    super(owner, args);

    const { keyFilter } = this.args;
    if (keyFilter && 'selector' in keyFilter) {
      this._selector = keyFilter.selector;
      if (keyFilter.selector === 'between') {
        if (keyFilter.value && typeof keyFilter.value === 'object') {
          this._betweenValueStart = Number(keyFilter.value.start);
          this._betweenValueEnd = Number(keyFilter.value.end);
        }
      } else {
        this._value = Number(keyFilter.value);
      }
    }
  }

  get stringValue(): string | undefined {
    return this._value !== undefined ? this._value.toString() : undefined;
  }

  get stringBetweenValueStart(): string | undefined {
    return this._betweenValueStart !== undefined
      ? this._betweenValueStart.toString()
      : undefined;
  }

  get stringBetweenValueEnd(): string | undefined {
    return this._betweenValueEnd !== undefined
      ? this._betweenValueEnd.toString()
      : undefined;
  }

  @action
  onSelectorChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this._selector = select.value as HdsFilterBarRangeFilterSelector;
    if (this._selector === 'between') {
      this._value = undefined;
    } else {
      this._betweenValueStart = undefined;
      this._betweenValueEnd = undefined;
    }
    this._onChange();
  }

  @action
  onValueChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this._value = parseFloat(input.value);
    this._onChange();
  }

  @action
  onBetweenValueStartChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this._betweenValueStart = parseFloat(input.value);
    this._onChange();
  }

  @action
  onBetweenValueEndChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this._betweenValueEnd = parseFloat(input.value);
    this._onChange();
  }

  @action
  onClear(): void {
    this._resetInputValues();
    this._onChange();
  }

  private _onChange(): void {
    const { onChange } = this.args;
    if (onChange && typeof onChange === 'function') {
      if (
        this._selector === 'between' &&
        this._betweenValueStart !== undefined &&
        this._betweenValueEnd !== undefined
      ) {
        onChange(this._selector, {
          start: this._betweenValueStart,
          end: this._betweenValueEnd,
        });
      } else {
        onChange(this._selector, this._value);
      }
    }
  }

  private _selectorText = (
    selector: HdsFilterBarRangeFilterSelector
  ): string => {
    return this.hdsIntl.t(
      `hds.components.filter-bar.range.selector-input.${selector}`,
      {
        default: 'test',
      }
    );
  };

  private _resetInputValues = (): void => {
    this._selector = undefined;
    this._value = undefined;
    this._betweenValueStart = undefined;
    this._betweenValueEnd = undefined;
  };
}
