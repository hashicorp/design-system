/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { modifier } from 'ember-modifier';
import type { WithBoundArgs } from '@glint/template';

import HdsDropdown from '../dropdown/index.ts';

import HdsFilterBarCheckbox from './checkbox.ts';
import HdsFilterBarRadio from './radio.ts';

import type {
  HdsFilterBarFilter,
  HdsFilterBarFilters,
  HdsFilterBarFilterType,
  HdsFilterBarData,
  HdsFilterBarSelectionFilter,
  HdsFilterBarRangeFilter,
  HdsFilterBarRangeFilterSelector,
} from './types.ts';
import { SELECTORS_DISPLAY_SYMBOL } from './range.ts';

export interface HdsFilterBarDropdownSignature {
  Args: {
    dropdown?: WithBoundArgs<typeof HdsDropdown, never>;
    key: string;
    text?: string;
    type?: HdsFilterBarFilterType;
    filters: HdsFilterBarFilters;
    isMultiSelect?: boolean;
    isLiveFilter?: boolean;
    activeFilterableColumns?: string[];
    searchEnabled?: boolean;
    onChange: (key: string, keyFilter?: HdsFilterBarFilter) => void;
  };
  Blocks: {
    default: [
      {
        Checkbox?: WithBoundArgs<
          typeof HdsFilterBarCheckbox,
          'checkbox' | 'keyFilter' | 'onChange'
        >;
        Radio?: WithBoundArgs<
          typeof HdsFilterBarRadio,
          'radio' | 'keyFilter' | 'onChange'
        >;
      },
    ];
  };
  Element: HTMLDivElement;
}

export default class HdsFilterBarDropdown extends Component<HdsFilterBarDropdownSignature> {
  @tracked internalFilters: HdsFilterBarData | undefined = [];

  private _setUpDropdown = modifier(() => {
    if (this.keyFilter) {
      this.internalFilters = JSON.parse(
        JSON.stringify(this.keyFilter)
      ) as HdsFilterBarData;
    }
  });

  get type(): HdsFilterBarFilterType {
    const { type } = this.args;

    if (!type) {
      return 'multi-select';
    }
    return type;
  }

  get keyFilter(): HdsFilterBarData | undefined {
    const { filters, key } = this.args;

    if (!filters) {
      return undefined;
    }
    return filters[key]?.data;
  }

  @action
  onSelectionChange(event: Event): void {
    const addFilter = (value: unknown): void => {
      const newFilter = {
        text: value as string,
        value: value,
      } as HdsFilterBarSelectionFilter;
      if (this.type === 'single-select') {
        this.internalFilters = newFilter;
      } else {
        if (Array.isArray(this.internalFilters)) {
          this.internalFilters.push(newFilter);
        } else {
          this.internalFilters = [newFilter];
        }
      }
    };

    const removeFilter = (value: string): void => {
      if (this.type === 'single-select') {
        this.internalFilters = undefined;
      } else {
        if (Array.isArray(this.internalFilters)) {
          const newFilter = [] as HdsFilterBarSelectionFilter[];
          this.internalFilters.forEach((filter) => {
            if (filter.value != value) {
              newFilter.push(filter);
            }
          });
          this.internalFilters = newFilter;
        } else {
          this.internalFilters = [];
        }
      }
    };

    const input = event.target as HTMLInputElement;

    if (input.checked) {
      addFilter(input.value);
    } else {
      removeFilter(input.value);
    }

    if (this.args.isLiveFilter) {
      const { onChange } = this.args;
      if (onChange && typeof onChange === 'function') {
        onChange(this.args.key, this.formattedFilters);
      }
    }
  }

  @action
  onRangeChange(
    selector?: HdsFilterBarRangeFilterSelector,
    value?: number
  ): void {
    const addFilter = (): HdsFilterBarData => {
      const newFilter = {
        selector: selector,
        value: value,
      } as HdsFilterBarRangeFilter;
      return newFilter;
    };

    if (selector && value) {
      this.internalFilters = addFilter();
    } else {
      this.internalFilters = undefined;
    }

    if (this.args.isLiveFilter) {
      const { onChange } = this.args;
      if (onChange && typeof onChange === 'function') {
        onChange(this.args.key, this.formattedFilters);
      }
    }
  }

  @action
  onApply(closeDropdown?: () => void): void {
    const { onChange } = this.args;
    if (onChange && typeof onChange === 'function') {
      onChange(this.args.key, this.formattedFilters);
    }

    if (closeDropdown && typeof closeDropdown === 'function') {
      closeDropdown();
    }
  }

  @action
  onClear(closeDropdown?: () => void): void {
    this._clearFilters();

    if (closeDropdown && typeof closeDropdown === 'function') {
      closeDropdown();
    }
  }

  @action
  onDismiss(): void {
    this._clearFilters();
  }

  get formattedFilters(): HdsFilterBarFilter | undefined {
    if (
      this.internalFilters === undefined ||
      (Array.isArray(this.internalFilters) && this.internalFilters.length === 0)
    ) {
      return undefined;
    }
    return {
      type: this.type,
      data: this.internalFilters,
    } as HdsFilterBarFilter;
  }

  get toggleButtonText(): string {
    const { key, filters, text } = this.args;

    let displayText = key;
    if (text && text.length > 0) {
      displayText = text;
    }

    const keyFilter = filters[key];

    if (!filters || !keyFilter || !keyFilter.data) {
      return displayText;
    } else if (this.args.type === 'range') {
      return `${displayText} ${this._rangeFilterText(keyFilter.data)}`;
    } else if (this.args.type === 'single-select') {
      return `${displayText}: ${this._singleSelectFilterText(keyFilter.data)}`;
    } else {
      return `${displayText}: ${this._multiSelectFilterText(keyFilter.data)}`;
    }
  }

  private _rangeFilterText(filterData: HdsFilterBarData): string {
    if ('selector' in filterData && 'value' in filterData) {
      return `${SELECTORS_DISPLAY_SYMBOL[filterData.selector]} ${filterData.value}`;
    } else {
      return '';
    }
  }

  private _singleSelectFilterText(filterData: HdsFilterBarData): string {
    if ('value' in filterData) {
      return filterData.value as string;
    } else {
      return '';
    }
  }

  private _multiSelectFilterText(filterData: HdsFilterBarData): string {
    if (Array.isArray(filterData) && filterData.length > 0) {
      const charMax = 10;
      let filtersString = '';

      filtersString = filterData
        .map((filter) => {
          if ('text' in filter && typeof filter.text === 'string') {
            if (filter.text.length > charMax) {
              return filter.text.slice(0, charMax) + '...';
            }
            return filter.text;
          }
          return '';
        })
        .join(', ');

      return filtersString;
    } else {
      return '';
    }
  }

  get classNames(): string {
    const classes = ['hds-filter-bar__dropdown'];

    // add a class based on the @align argument
    if (!this._isActiveFilterableColumn()) {
      classes.push('hds-filter-bar__dropdown--hidden');
    }

    classes.push(`hds-filter-bar__dropdown--type-${this.type}`);

    return classes.join(' ');
  }

  private _isActiveFilterableColumn(): boolean {
    if (this.args.activeFilterableColumns) {
      return this.args.activeFilterableColumns.includes(this.args.key);
    }
    return false;
  }

  private _clearFilters(): void {
    this.internalFilters = undefined;

    const { onChange } = this.args;
    if (onChange && typeof onChange === 'function') {
      onChange(this.args.key, undefined);
    }
  }
}
