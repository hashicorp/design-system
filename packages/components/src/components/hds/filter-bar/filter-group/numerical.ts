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

import type HdsIntlService from '../../../../services/hds-intl';
import type {
  HdsFilterBarFilter,
  HdsFilterBarNumericalFilterSelector,
  HdsFilterBarNumericalFilterValue,
} from '../types.ts';
import { HdsFilterBarNumericalFilterSelectorValues } from '../types.ts';

export const NUMERICAL_SELECTORS: HdsFilterBarNumericalFilterSelector[] =
  Object.values(HdsFilterBarNumericalFilterSelectorValues);

export const NUMERICAL_SELECTORS_TEXT: Record<
  HdsFilterBarNumericalFilterSelector,
  string
> = {
  [HdsFilterBarNumericalFilterSelectorValues.lessThan]: '<',
  [HdsFilterBarNumericalFilterSelectorValues.lessThanOrEqualTo]: '≤',
  [HdsFilterBarNumericalFilterSelectorValues.equalTo]: '=',
  [HdsFilterBarNumericalFilterSelectorValues.greaterThanOrEqualTo]: '≥',
  [HdsFilterBarNumericalFilterSelectorValues.greaterThan]: '>',
  [HdsFilterBarNumericalFilterSelectorValues.between]: 'between',
};

export const NUMERICAL_SELECTORS_INPUT_TEXT: Record<
  HdsFilterBarNumericalFilterSelector,
  string
> = {
  [HdsFilterBarNumericalFilterSelectorValues.lessThan]: 'Less than (<)',
  [HdsFilterBarNumericalFilterSelectorValues.lessThanOrEqualTo]:
    'Less than or equal to (≤)',
  [HdsFilterBarNumericalFilterSelectorValues.equalTo]: 'Equal to (=)',
  [HdsFilterBarNumericalFilterSelectorValues.greaterThanOrEqualTo]:
    'Greater than or equal to (≥)',
  [HdsFilterBarNumericalFilterSelectorValues.greaterThan]: 'Greater than (>)',
  [HdsFilterBarNumericalFilterSelectorValues.between]: 'Between',
};

export interface HdsFilterBarFilterGroupNumericalSignature {
  Args: {
    keyFilter?: HdsFilterBarFilter;
    onChange?: (
      selector?: HdsFilterBarNumericalFilterSelector,
      value?: HdsFilterBarNumericalFilterValue
    ) => void;
  };
  Blocks: {
    default: [];
  };
  Element: HTMLElement;
}

export default class HdsFilterBarFilterGroupNumerical extends Component<HdsFilterBarFilterGroupNumericalSignature> {
  @service hdsIntl!: HdsIntlService;

  @tracked private _selector: HdsFilterBarNumericalFilterSelector | undefined;
  @tracked private _value: number | undefined;
  @tracked private _betweenValueStart: number | undefined;
  @tracked private _betweenValueEnd: number | undefined;

  private _selectorValues = NUMERICAL_SELECTORS;
  private _selectorInputId = 'selector-input-' + guidFor(this);
  private _valueInputId = 'value-input-' + guidFor(this);
  private _betweenValueStartInputId =
    'between-value-start-input-' + guidFor(this);
  private _betweenValueEndInputId = 'between-value-end-input-' + guidFor(this);

  constructor(
    owner: Owner,
    args: HdsFilterBarFilterGroupNumericalSignature['Args']
  ) {
    super(owner, args);

    const { keyFilter } = this.args;
    if (keyFilter && keyFilter.type === 'numerical') {
      const data = keyFilter.data;
      this._selector = data?.selector;
      if (data.selector === 'between') {
        if (data.value && typeof data.value === 'object') {
          this._betweenValueStart = Number(data.value.start);
          this._betweenValueEnd = Number(data.value.end);
        }
      } else {
        this._value = Number(data.value);
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
    this._selector = select.value as HdsFilterBarNumericalFilterSelector;
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

  private _getSelectorText = (
    selector: HdsFilterBarNumericalFilterSelector
  ): string => {
    return this.hdsIntl.t(
      `hds.components.filter-bar.filter-group.numerical.selector-input.${selector}`,
      {
        default: NUMERICAL_SELECTORS_INPUT_TEXT[selector],
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
