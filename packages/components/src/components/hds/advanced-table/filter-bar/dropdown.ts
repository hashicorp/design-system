/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { modifier } from 'ember-modifier';
import type { WithBoundArgs } from '@glint/template';

import HdsDropdown from '../../dropdown/index.ts';

import HdsAdvancedTableFilterBarCheckbox from './checkbox.ts';
import HdsAdvancedTableFilterBarRadio from './radio.ts';

import type {
  HdsAdvancedTableFilter,
  HdsAdvancedTableFilters,
} from '../types.ts';
import type { HdsDropdownSignature } from '../../dropdown/index.ts';

export interface HdsAdvancedTableFilterBarDropdownSignature {
  Args: HdsDropdownSignature['Args'] & {
    dropdown?: WithBoundArgs<typeof HdsDropdown, never>;
    key: string;
    text?: string;
    filters: HdsAdvancedTableFilters;
    isMultiSelect?: boolean;
    isLiveFilter?: boolean;
    activeFilterableColumns?: string[];
    searchEnabled?: boolean;
    onChange: (key: string, keyFilter?: HdsAdvancedTableFilter[]) => void;
  };
  Blocks: {
    default: [
      {
        Checkbox?: WithBoundArgs<
          typeof HdsAdvancedTableFilterBarCheckbox,
          'checkbox' | 'keyFilter' | 'onChange'
        >;
        Radio?: WithBoundArgs<
          typeof HdsAdvancedTableFilterBarRadio,
          'radio' | 'keyFilter' | 'onChange'
        >;
      },
    ];
  };
  Element: HTMLDivElement;
}

export default class HdsAdvancedTableFilterBarDropdown extends Component<
  HdsDropdownSignature & HdsAdvancedTableFilterBarDropdownSignature
> {
  @tracked internalFilters: HdsAdvancedTableFilter[] | undefined = [];

  private _setUpDropdown = modifier(() => {
    if (this.keyFilter) {
      this.internalFilters = JSON.parse(
        JSON.stringify(this.keyFilter)
      ) as HdsAdvancedTableFilter[];
    } else {
      this.internalFilters = [];
    }
  });

  get keyFilter(): HdsAdvancedTableFilter[] | undefined {
    const { filters, key } = this.args;

    if (!filters) {
      return undefined;
    }
    return filters[key];
  }

  get numFilters(): number {
    if (Array.isArray(this.keyFilter)) {
      return this.keyFilter.length;
    }
    return 0;
  }

  @action
  onChange(event: Event): void {
    const addFilter = (value: unknown): HdsAdvancedTableFilter[] => {
      const newFilter = {
        text: value as string,
        value: value,
      };
      if (
        Array.isArray(this.internalFilters) &&
        input.classList.contains('hds-form-checkbox')
      ) {
        this.internalFilters.push(newFilter);
        return this.internalFilters;
      } else {
        return [newFilter];
      }
    };

    const removeFilter = (value: string): HdsAdvancedTableFilter[] => {
      const newFilter = [] as HdsAdvancedTableFilter[];
      if (Array.isArray(this.internalFilters)) {
        this.internalFilters.forEach((filter) => {
          if (filter.value != value) {
            newFilter.push(filter);
          }
        });
      }
      return newFilter;
    };

    const input = event.target as HTMLInputElement;

    let newFilter = [] as HdsAdvancedTableFilter[];

    if (input.checked) {
      newFilter = addFilter(input.value);
    } else {
      newFilter = removeFilter(input.value);
    }

    this.internalFilters = newFilter;

    if (this.args.isLiveFilter) {
      const { onChange } = this.args;
      if (onChange && typeof onChange === 'function') {
        if (newFilter.length === 0) {
          onChange(this.args.key, undefined);
        } else {
          onChange(this.args.key, newFilter);
        }
      }
    }
  }

  @action
  onApply(closeDropdown?: () => void): void {
    const { onChange } = this.args;
    if (onChange && typeof onChange === 'function') {
      onChange(this.args.key, this.internalFilters);
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

  get toggleButtonText(): string {
    const { key, filters, text } = this.args;

    let displayText = key;
    if (text && text.length > 0) {
      displayText = text;
    }

    if (Array.isArray(filters[key]) && filters[key].length > 0) {
      const charMax = 10;
      let filtersString = '';

      filtersString = filters[key]
        .map((filter) => {
          if (filter.text.length > charMax) {
            return filter.text.slice(0, charMax) + '...';
          }
          return filter.text;
        })
        .join(', ');

      return `${displayText}: ${filtersString}`;
    } else {
      return displayText;
    }
  }

  get classNames(): string {
    const classes = ['hds-advanced-table__filter-bar__dropdown'];

    // add a class based on the @align argument
    if (!this._isActiveFilterableColumn()) {
      classes.push('hds-advanced-table__filter-bar__dropdown--hidden');
    }

    return classes.join(' ');
  }

  private _isActiveFilterableColumn(): boolean {
    if (this.args.activeFilterableColumns) {
      return this.args.activeFilterableColumns.includes(this.args.key);
    }
    return false;
  }

  private _clearFilters(): void {
    this.internalFilters = [];

    const { onChange } = this.args;
    if (onChange && typeof onChange === 'function') {
      onChange(this.args.key, this.internalFilters);
    }
  }
}
