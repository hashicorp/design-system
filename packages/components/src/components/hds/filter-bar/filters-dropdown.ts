/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { modifier } from 'ember-modifier';
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

  private _syncFilters = modifier(
    (_element, [_filters]: [HdsFilterBarFilters | undefined]) => {
      if (_filters) {
        this.internalFilters = _filters;
      }
    }
  );

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

  get numFilters(): number {
    let numFilters = 0;
    Object.keys(this.internalFilters).forEach((key) => {
      const filter = this.internalFilters[key];
      if (filter) {
        if (Array.isArray(filter.data)) {
          numFilters += filter.data.length;
        } else {
          numFilters += 1;
        }
      }
    });
    return numFilters;
  }

  get classNames(): string {
    const classes = ['hds-filter-bar__filters-dropdown'];

    return classes.join(' ');
  }

  private _updateFilter(
    key: string,
    keyFilter?: HdsFilterBarFilter
  ): HdsFilterBarFilters {
    const newFilters = {} as HdsFilterBarFilters;

    Object.keys(this.internalFilters).forEach((k) => {
      newFilters[k] = JSON.parse(
        JSON.stringify(this.internalFilters[k])
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

  private _onClose = (): void => {
    const { filters } = this.args;
    if (filters) {
      this.internalFilters = { ...filters };
    } else {
      this.internalFilters = {};
    }
  };
}
