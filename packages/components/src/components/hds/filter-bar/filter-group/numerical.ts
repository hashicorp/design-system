/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { guidFor } from '@ember/object/internals';
import { service } from '@ember/service';

import type { HdsFilterBarFilterGroupGenericSignature } from './generic.ts';
import type HdsIntlService from '../../../../services/hds-intl';
import type {
  HdsFilterBarFilter,
  HdsFilterBarNumericalFilterData,
  HdsFilterBarNumericalFilterSelector,
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
    key: string;
    keyFilter?: HdsFilterBarFilter;
    text?: string;
    onChange?: (filter: HdsFilterBarFilter) => void;
  };
  Blocks: {
    default: [];
  };
  Element: HdsFilterBarFilterGroupGenericSignature['Element'];
}

export default class HdsFilterBarFilterGroupNumerical extends Component<HdsFilterBarFilterGroupNumericalSignature> {
  @service hdsIntl!: HdsIntlService;

  @tracked private _selectorInputValue:
    | HdsFilterBarNumericalFilterSelector
    | undefined;
  @tracked private _valueInputValue: number | undefined;
  @tracked private _betweenValueStartInputValue: number | undefined;
  @tracked private _betweenValueEndInputValue: number | undefined;

  private _selectorValues = NUMERICAL_SELECTORS;
  private _selectorInputId = 'selector-input-' + guidFor(this);
  private _valueInputId = 'value-input-' + guidFor(this);
  private _betweenValueStartInputId =
    'between-value-start-input-' + guidFor(this);
  private _betweenValueEndInputId = 'between-value-end-input-' + guidFor(this);

  get keyFilterData(): HdsFilterBarNumericalFilterData | undefined {
    const { keyFilter } = this.args;
    if (keyFilter && keyFilter.type === 'numerical') {
      return keyFilter.data;
    }
    return undefined;
  }

  get selector(): HdsFilterBarNumericalFilterSelector | undefined {
    if (this._selectorInputValue !== undefined) {
      return this._selectorInputValue;
    } else if (this.keyFilterData) {
      return this.keyFilterData.selector;
    }
  }

  get value(): number | undefined {
    if (this._valueInputValue !== undefined) {
      return this._valueInputValue;
    } else if (this.keyFilterData) {
      if (this.keyFilterData.selector !== 'between') {
        return Number(this.keyFilterData.value);
      }
    }
  }

  get betweenValueStart(): number | undefined {
    if (this._betweenValueStartInputValue !== undefined) {
      return this._betweenValueStartInputValue;
    } else if (this.keyFilterData) {
      if (
        this.keyFilterData.selector === 'between' &&
        typeof this.keyFilterData.value === 'object'
      ) {
        return Number(this.keyFilterData.value.start);
      }
    }
  }

  get betweenValueEnd(): number | undefined {
    if (this._betweenValueEndInputValue !== undefined) {
      return this._betweenValueEndInputValue;
    } else if (this.keyFilterData) {
      if (
        this.keyFilterData.selector === 'between' &&
        typeof this.keyFilterData.value === 'object'
      ) {
        return Number(this.keyFilterData.value.end);
      }
    }
  }

  get stringValue(): string | undefined {
    return this.value !== undefined ? this.value.toString() : undefined;
  }

  get stringBetweenValueStart(): string | undefined {
    return this.betweenValueStart !== undefined
      ? this.betweenValueStart.toString()
      : undefined;
  }

  get stringBetweenValueEnd(): string | undefined {
    return this.betweenValueEnd !== undefined
      ? this.betweenValueEnd.toString()
      : undefined;
  }

  @action
  onSelectorChange(
    updateFilter: (filter: HdsFilterBarFilter) => void,
    event: Event
  ): void {
    const select = event.target as HTMLSelectElement;
    this._selectorInputValue =
      select.value as HdsFilterBarNumericalFilterSelector;
    if (this._selectorInputValue === 'between') {
      this._valueInputValue = undefined;
    } else {
      this._betweenValueStartInputValue = undefined;
      this._betweenValueEndInputValue = undefined;
    }
    this._updateFilter(updateFilter);
  }

  @action
  onValueChange(
    updateFilter: (filter: HdsFilterBarFilter) => void,
    event: Event
  ): void {
    const input = event.target as HTMLInputElement;
    this._valueInputValue = parseFloat(input.value);
    this._updateFilter(updateFilter);
  }

  @action
  onBetweenValueStartChange(
    updateFilter: (filter: HdsFilterBarFilter) => void,
    event: Event
  ): void {
    const input = event.target as HTMLInputElement;
    this._betweenValueStartInputValue = parseFloat(input.value);
    this._updateFilter(updateFilter);
  }

  @action
  onBetweenValueEndChange(
    updateFilter: (filter: HdsFilterBarFilter) => void,
    event: Event
  ): void {
    const input = event.target as HTMLInputElement;
    this._betweenValueEndInputValue = parseFloat(input.value);
    this._updateFilter(updateFilter);
  }

  @action
  onChange(filter: HdsFilterBarFilter): void {
    const { onChange } = this.args;
    if (onChange && typeof onChange === 'function') {
      onChange(filter);
    }
  }

  private _updateFilter(
    updateFilter: (filter: HdsFilterBarFilter) => void
  ): void {
    const addFilter = (): HdsFilterBarFilter => {
      const value =
        this._selectorInputValue === 'between'
          ? {
              start: this._betweenValueStartInputValue,
              end: this._betweenValueEndInputValue,
            }
          : this._valueInputValue;
      const newFilter = {
        type: 'numerical',
        text: this.args.text,
        data: {
          selector: this._selectorInputValue,
          value: value,
        },
      } as HdsFilterBarFilter;
      return newFilter;
    };

    if (this._isFormCompleted()) {
      updateFilter(addFilter());
    }
  }

  private _isFormCompleted(): boolean {
    if (this._selectorInputValue === 'between') {
      return (
        this._betweenValueStartInputValue !== undefined &&
        this._betweenValueEndInputValue !== undefined
      );
    } else {
      return (
        this._selectorInputValue !== undefined &&
        this._valueInputValue !== undefined
      );
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
}
