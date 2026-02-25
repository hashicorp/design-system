/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { guidFor } from '@ember/object/internals';
import { service } from '@ember/service';
import { on } from '@ember/modifier';
import { concat, fn } from '@ember/helper';
import { eq } from 'ember-truth-helpers';

import hdsT from '../../../../helpers/hds-t.ts';
import HdsFormSelectField from '../../form/select/field.ts';
import HdsFormTextInputBase from '../../form/text-input/base.gts';
import HdsLayoutFlex from '../../layout/flex/index.gts';
import HdsFilterBarFilterGroupGeneric from './generic.gts';

import type { HdsFilterBarFilterGroupGenericSignature } from './generic.gts';
import type HdsIntlService from '../../../../services/hds-intl.ts';
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

  onSelectorChange = (
    updateFilter: (filter: HdsFilterBarFilter) => void,
    event: Event
  ): void => {
    const select = event.target as HTMLSelectElement;
    this._selectorInputValue = select.value as HdsFilterBarDateFilterSelector;
    if (this._selectorInputValue === 'between') {
      this._valueInputValue = undefined;
    } else {
      this._betweenValueStartInputValue = undefined;
      this._betweenValueEndInputValue = undefined;
    }
    this._updateFilter(updateFilter);
  };

  onValueChange = (
    updateFilter: (filter: HdsFilterBarFilter) => void,
    event: Event
  ): void => {
    const input = event.target as HTMLInputElement;
    this._valueInputValue = input.value;
    this._updateFilter(updateFilter);
  };

  onBetweenValueStartChange = (
    updateFilter: (filter: HdsFilterBarFilter) => void,
    event: Event
  ): void => {
    const input = event.target as HTMLInputElement;
    this._betweenValueStartInputValue = input.value;
    this._updateFilter(updateFilter);
  };

  onBetweenValueEndChange = (
    updateFilter: (filter: HdsFilterBarFilter) => void,
    event: Event
  ): void => {
    const input = event.target as HTMLInputElement;
    this._betweenValueEndInputValue = input.value;
    this._updateFilter(updateFilter);
  };

  onChange = (filter: HdsFilterBarFilter): void => {
    const { onChange } = this.args;
    if (onChange && typeof onChange === 'function') {
      onChange(filter);
    }
  };

  private _updateFilter = (
    updateFilter: (filter: HdsFilterBarFilter) => void
  ): void => {
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
  };

  private _isFormCompleted = (): boolean => {
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
  };

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

  <template>
    <HdsFilterBarFilterGroupGeneric
      class="hds-filter-bar__filter-group__date"
      @onChange={{this.onChange}}
      ...attributes
      as |G|
    >
      <fieldset class="hds-filter-bar__filter-group__fieldset">
        <legend class="sr-only">
          {{hdsT
            "hds.components.filter-bar.filter-group.date.legend"
            text=@text
            default="Filter by date"
          }}
        </legend>
        <HdsFormSelectField
          @id={{this._selectorInputId}}
          name={{concat @key "-selector"}}
          {{on "change" (fn this.onSelectorChange G.updateFilter)}}
          class="hds-filter-bar__filter-group__field"
          as |F|
        >
          <F.Label>{{this.selectorLabelText}}</F.Label>
          <F.Options>
            <option value="">{{hdsT
                "hds.components.filter-bar.filter-group.date.selector-input.default-value"
                default="Pick a selector"
              }}</option>
            {{#each this._selectorValues as |selectorValue|}}
              <option
                value={{selectorValue}}
                selected={{eq selectorValue this.selector}}
              >{{this._getSelectorText selectorValue}}</option>
            {{/each}}
          </F.Options>
        </HdsFormSelectField>
        {{#if (eq this.selector "between")}}
          <HdsLayoutFlex
            @gap="8"
            @direction={{if (eq @type "datetime") "column" "row"}}
          >
            <HdsFormTextInputBase
              @id={{this._betweenValueStartInputId}}
              @type={{this.inputType}}
              @value={{this.betweenValueStart}}
              name={{concat @key "-between-start"}}
              aria-label={{hdsT
                "hds.components.filter-bar.filter-group.date.between-value-inputs.start.aria-label"
                type=this.type
                default="Date start value"
              }}
              placeholder={{hdsT
                "hds.components.filter-bar.filter-group.date.between-value-inputs.start.placeholder"
                default="Start"
              }}
              class="hds-filter-bar__filter-group__field hds-filter-bar__filter-group__field--between"
              {{on "change" (fn this.onBetweenValueStartChange G.updateFilter)}}
            />
            <HdsFormTextInputBase
              @id={{this._betweenValueEndInputId}}
              @type={{this.inputType}}
              @value={{this.betweenValueEnd}}
              name={{concat @key "-between-end"}}
              aria-label={{hdsT
                "hds.components.filter-bar.filter-group.date.between-value-inputs.end.aria-label"
                type=this.type
                default="Date end value"
              }}
              placeholder={{hdsT
                "hds.components.filter-bar.filter-group.date.between-value-inputs.end.placeholder"
                default="End"
              }}
              class="hds-filter-bar__filter-group__field hds-filter-bar__filter-group__field--between"
              {{on "change" (fn this.onBetweenValueEndChange G.updateFilter)}}
            />
          </HdsLayoutFlex>
        {{else}}
          <HdsFormTextInputBase
            @id={{this._valueInputId}}
            @type={{this.inputType}}
            @value={{this.value}}
            name={{concat @key "-value"}}
            aria-label={{hdsT
              "hds.components.filter-bar.filter-group.date.value-input.aria-label"
              type=this.type
              default="Date value"
            }}
            class="hds-filter-bar__filter-group__field"
            {{on "change" (fn this.onValueChange G.updateFilter)}}
          />
        {{/if}}
      </fieldset>
    </HdsFilterBarFilterGroupGeneric>
  </template>
}
