/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import type Owner from '@ember/owner';
import type { WithBoundArgs } from '@glint/template';

import HdsDropdown from './../dropdown/index.ts';
import HdsFilterBarFilterTab from './filter-tab.ts';
import HdsFilterBarFilterOptions from './filter-options.ts';
import type { HdsFilterBarFilters, HdsFilterBarFilter } from './types.ts';

import type { HdsDropdownSignature } from '../dropdown/index.ts';

export interface HdsFilterBarFiltersDropdownSignature {
  Args: HdsDropdownSignature['Args'] & {
    dropdown?: WithBoundArgs<typeof HdsDropdown, never>;
    filters: HdsFilterBarFilters;
    onFilter?: (filters: HdsFilterBarFilters) => void;
  };
  Blocks: {
    default: [
      {
        Filter?: WithBoundArgs<typeof HdsFilterBarFilterTab, 'tab' | 'filters'>;
        FilterOptions?: WithBoundArgs<
          typeof HdsFilterBarFilterOptions,
          'panel' | 'onChange' | 'filters'
        >;
      },
    ];
  };
  Element: HTMLDivElement;
}

export default class HdsFilterBarFiltersDropdown extends Component<
  HdsDropdownSignature & HdsFilterBarFiltersDropdownSignature
> {
  @tracked internalFilters: HdsFilterBarFilters = {};

  constructor(
    owner: Owner,
    args: HdsFilterBarFiltersDropdownSignature['Args']
  ) {
    super(owner, args);

    const { filters } = this.args;

    if (filters) {
      this.internalFilters = { ...filters };
    }
  }

  @action
  onFilter(key: string, keyFilter?: HdsFilterBarFilter): void {
    this.internalFilters = this._updateFilter(key, keyFilter);
  }

  @action
  onApply(closeDropdown?: () => void): void {
    const { onFilter } = this.args;
    if (onFilter && typeof onFilter === 'function') {
      onFilter(this.internalFilters);
    }

    if (closeDropdown && typeof closeDropdown === 'function') {
      closeDropdown();
    }
  }

  @action
  onClear(closeDropdown?: () => void): void {
    const { onFilter } = this.args;
    this.internalFilters = {};

    if (onFilter && typeof onFilter === 'function') {
      onFilter(this.internalFilters);
    }

    if (closeDropdown && typeof closeDropdown === 'function') {
      closeDropdown();
    }
  }

  get classNames(): string {
    const classes = ['hds-filter-bar__filters-dropdown'];

    return classes.join(' ');
  }

  private _updateFilter(
    key: string,
    keyFilter?: HdsFilterBarFilter
  ): HdsFilterBarFilters {
    const { filters } = this.args;
    const newFilters = {} as HdsFilterBarFilters;

    Object.keys(filters).forEach((k) => {
      newFilters[k] = JSON.parse(
        JSON.stringify(filters[k])
      ) as HdsFilterBarFilter;
    });
    if (
      keyFilter === undefined ||
      (Array.isArray(keyFilter) && keyFilter.length === 0)
    ) {
      delete newFilters[key];
    } else {
      Object.assign(newFilters, { [key]: keyFilter });
    }

    return { ...newFilters };
  }
}
