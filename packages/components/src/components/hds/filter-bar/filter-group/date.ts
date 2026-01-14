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
import type { HdsFormTextInputTypes } from '../../form/text-input/types.ts';

import type {
  HdsFilterBarFilter,
  HdsFilterBarDateFilterData,
  HdsFilterBarDateFilterSelector,
  HdsFilterBarFilterGroupDateType,
} from '../types.ts';
import {
  HdsFilterBarDateFilterSelectorValues,
  HdsFilterBarFilterGroupDateTypeValues,
} from '../types.ts';

export const DATE_SELECTORS: HdsFilterBarDateFilterSelector[] = Object.values(
  HdsFilterBarDateFilterSelectorValues
);

export const DATE_SELECTORS_TEXT: Record<
  HdsFilterBarDateFilterSelector,
  string
> = {
  [HdsFilterBarDateFilterSelectorValues.before]: 'before',
  [HdsFilterBarDateFilterSelectorValues.exactly]: 'exactly',
  [HdsFilterBarDateFilterSelectorValues.after]: 'after',
  [HdsFilterBarDateFilterSelectorValues.between]: 'between',
};

export const DATE_SELECTORS_INPUT_TEXT: Record<
  HdsFilterBarDateFilterSelector,
  string
> = {
  [HdsFilterBarDateFilterSelectorValues.before]: 'Before',
  [HdsFilterBarDateFilterSelectorValues.exactly]: 'Exactly',
  [HdsFilterBarDateFilterSelectorValues.after]: 'After',
  [HdsFilterBarDateFilterSelectorValues.between]: 'Between',
};

export const DATE_FILTER_GROUP_TYPES: HdsFilterBarFilterGroupDateType[] =
  Object.values(HdsFilterBarFilterGroupDateTypeValues);

export interface HdsFilterBarFilterGroupDateSignature {
  Args: {
    key: string;
    keyFilter?: HdsFilterBarFilter;
    type?: HdsFilterBarFilterGroupDateType;
    text?: string;
    onChange?: (filter: HdsFilterBarFilter) => void;
  };
  Blocks: {
    default: [];
  };
  Element: HdsFilterBarFilterGroupGenericSignature['Element'];
}

export default class HdsFilterBarFilterGroupDate extends Component<HdsFilterBarFilterGroupDateSignature> {
  @service hdsIntl!: HdsIntlService;

  @tracked private _selectorInputValue:
    | HdsFilterBarDateFilterSelector
    | undefined;
  @tracked private _valueInputValue: string | undefined;
  @tracked private _betweenValueStartInputValue: string | undefined;
  @tracked private _betweenValueEndInputValue: string | undefined;

  private _selectorValues = DATE_SELECTORS;
  private _selectorInputId = 'selector-input-' + guidFor(this);
  private _valueInputId = 'value-input-' + guidFor(this);
  private _betweenValueStartInputId =
    'between-value-start-input-' + guidFor(this);
  private _betweenValueEndInputId = 'between-value-end-input-' + guidFor(this);

  get type(): 'date' | 'time' | 'datetime' {
    return this.args.type || 'date';
  }

  get inputType(): HdsFormTextInputTypes {
    if (this.type === 'datetime') {
      return 'datetime-local';
    }
    return this.type;
  }

  get selectorLabelText(): string {
    return this.hdsIntl.t(
      `hds.components.filter-bar.filter-group.date.${this.type}.label`,
      {
        default: 'Date is',
      }
    );
  }

  get keyFilterData(): HdsFilterBarDateFilterData | undefined {
    const { keyFilter } = this.args;
    if (
      keyFilter &&
      (keyFilter.type === 'date' ||
        keyFilter.type === 'time' ||
        keyFilter.type === 'datetime')
    ) {
      return keyFilter.data;
    }
    return undefined;
  }

  get selector(): HdsFilterBarDateFilterSelector | undefined {
    if (this._selectorInputValue !== undefined) {
      return this._selectorInputValue;
    } else if (this.keyFilterData) {
      return this.keyFilterData.selector;
    }
  }

  get value(): string | undefined {
    if (this._valueInputValue !== undefined) {
      return this._valueInputValue;
    } else if (this.keyFilterData) {
      if (this.keyFilterData.selector !== 'between') {
        return this.keyFilterData.value as string;
      }
    }
  }

  get betweenValueStart(): string | undefined {
    if (this._betweenValueStartInputValue !== undefined) {
      return this._betweenValueStartInputValue;
    } else if (this.keyFilterData) {
      if (
        this.keyFilterData.selector === 'between' &&
        typeof this.keyFilterData.value === 'object'
      ) {
        return this.keyFilterData.value.start;
      }
    }
  }

  get betweenValueEnd(): string | undefined {
    if (this._betweenValueEndInputValue !== undefined) {
      return this._betweenValueEndInputValue;
    } else if (this.keyFilterData) {
      if (
        this.keyFilterData.selector === 'between' &&
        typeof this.keyFilterData.value === 'object'
      ) {
        return this.keyFilterData.value.end;
      }
    }
  }

  @action
  onSelectorChange(
    updateFilter: (filter: HdsFilterBarFilter) => void,
    event: Event
  ): void {
    const select = event.target as HTMLSelectElement;
    this._selectorInputValue = select.value as HdsFilterBarDateFilterSelector;
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
    this._valueInputValue = input.value;
    this._updateFilter(updateFilter);
  }

  @action
  onBetweenValueStartChange(
    updateFilter: (filter: HdsFilterBarFilter) => void,
    event: Event
  ): void {
    const input = event.target as HTMLInputElement;
    this._betweenValueStartInputValue = input.value;
    this._updateFilter(updateFilter);
  }

  @action
  onBetweenValueEndChange(
    updateFilter: (filter: HdsFilterBarFilter) => void,
    event: Event
  ): void {
    const input = event.target as HTMLInputElement;
    this._betweenValueEndInputValue = input.value;
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
        type: this.type,
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
    selector: HdsFilterBarDateFilterSelector
  ): string => {
    return this.hdsIntl.t(
      `hds.components.filter-bar.filter-group.date.selector-input.${selector}`,
      {
        default: DATE_SELECTORS_INPUT_TEXT[selector],
      }
    );
  };
}
