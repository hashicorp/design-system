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
import type { HdsFormTextInputTypes } from '../../form/text-input/types.ts';

import type {
  HdsFilterBarFilter,
  HdsFilterBarDateFilterSelector,
  HdsFilterBarDateFilterValue,
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
    keyFilter?: HdsFilterBarFilter;
    type?: HdsFilterBarFilterGroupDateType;
    onChange?: (
      selector?: HdsFilterBarDateFilterSelector,
      value?: HdsFilterBarDateFilterValue
    ) => void;
  };
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}

export default class HdsFilterBarFilterGroupDate extends Component<HdsFilterBarFilterGroupDateSignature> {
  @service hdsIntl!: HdsIntlService;

  @tracked private _selector: HdsFilterBarDateFilterSelector | undefined;
  @tracked private _value: string | undefined;
  @tracked private _betweenValueStart: string | undefined;
  @tracked private _betweenValueEnd: string | undefined;

  private _selectorValues = DATE_SELECTORS;
  private _selectorInputId = 'selector-input-' + guidFor(this);
  private _valueInputId = 'value-input-' + guidFor(this);
  private _betweenValueStartInputId =
    'between-value-start-input-' + guidFor(this);
  private _betweenValueEndInputId = 'between-value-end-input-' + guidFor(this);

  constructor(
    owner: Owner,
    args: HdsFilterBarFilterGroupDateSignature['Args']
  ) {
    super(owner, args);

    const { keyFilter } = this.args;
    if (
      keyFilter &&
      (keyFilter.type === 'date' ||
        keyFilter.type === 'time' ||
        keyFilter.type === 'datetime')
    ) {
      const data = keyFilter.data;
      this._selector = data.selector;
      if (data.selector === 'between') {
        if (
          data.value &&
          typeof data.value === 'object' &&
          'start' in data.value &&
          'end' in data.value
        ) {
          this._betweenValueStart = data.value.start;
          this._betweenValueEnd = data.value.end;
        }
      } else {
        this._value = data.value as string;
      }
    }
  }

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
    return this.hdsIntl.t(`hds.components.filter-bar.date.${this.type}.label`, {
      default: 'Date is',
    });
  }

  @action
  onSelectorChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this._selector = select.value as HdsFilterBarDateFilterSelector;
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
    this._value = input.value;
    this._onChange();
  }

  @action
  onBetweenValueStartChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this._betweenValueStart = input.value;
    this._onChange();
  }

  @action
  onBetweenValueEndChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this._betweenValueEnd = input.value;
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
    selector: HdsFilterBarDateFilterSelector
  ): string => {
    return this.hdsIntl.t(
      `hds.components.filter-bar.date.selector-input.${selector}`,
      {
        default: DATE_SELECTORS_INPUT_TEXT[selector],
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
