/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { modifier } from 'ember-modifier';
import type { WithBoundArgs } from '@glint/template';

import HdsFilterBarFilterGroup from './filter-group/index.ts';
import type { HdsFilterBarFilters, HdsFilterBarFilter } from './types.ts';

import type { HdsDropdownSignature } from '../dropdown/index.ts';

export const DEFAULT_DROPDOWN_HEIGHT = '600px';

export interface HdsFilterBarFiltersDropdownSignature {
  Args: {
    filters: HdsFilterBarFilters;
    isLiveFilter?: boolean;
    height?: string;
    onFilter?: (filters: HdsFilterBarFilters) => void;
    onFocusOut?: HdsDropdownSignature['Args']['onFocusOut'];
  };
  Blocks: {
    default: [
      {
        FilterGroup?: WithBoundArgs<
          typeof HdsFilterBarFilterGroup,
          'tab' | 'panel' | 'filters' | 'onChange'
        >;
        close: HdsDropdownSignature['Blocks']['default'][0]['close'];
      },
    ];
  };
  Element: HdsDropdownSignature['Element'];
}

export default class HdsFilterBarFiltersDropdown extends Component<HdsFilterBarFiltersDropdownSignature> {
  @tracked internalFilters: HdsFilterBarFilters = {};

  private _syncFilters = modifier(() => {
    const { filters } = this.args;
    if (filters) {
      this.internalFilters = this._copyFilters(filters);
    } else {
      this.internalFilters = {};
    }
  });

  get isLiveFilter(): boolean {
    return this.args.isLiveFilter ?? false;
  }

  get dropdownHeightStyle(): Record<string, string> {
    const heightStyle: { [key: string]: string } = {};
    heightStyle['--filter-bar-filters-dropdown-height'] =
      this.args.height ?? DEFAULT_DROPDOWN_HEIGHT;
    return heightStyle;
  }

  @action
  onFilter(key: string, keyFilter?: HdsFilterBarFilter): void {
    this.internalFilters = this._updateFilter(key, keyFilter);

    if (this.isLiveFilter) {
      this._applyFilters();
    }
  }

  @action
  onApply(closeDropdown: () => void): void {
    this._applyFilters(closeDropdown);
  }

  @action
  onClear(closeDropdown: () => void): void {
    const { onFilter } = this.args;
    this.internalFilters = {};

    if (onFilter && typeof onFilter === 'function') {
      onFilter(this.internalFilters);
    }

    if (closeDropdown && typeof closeDropdown === 'function') {
      closeDropdown();
    }
  }

  private _copyFilters = (
    filters: HdsFilterBarFilters
  ): HdsFilterBarFilters => {
    const newFilters = {} as HdsFilterBarFilters;

    // Note: Due to the filters being an Ember object, structuredClone cannot be used here.
    // Further investigation will be done in a follow-up task: https://hashicorp.atlassian.net/browse/HDS-5907
    Object.keys(filters).forEach((k) => {
      newFilters[k] = JSON.parse(
        JSON.stringify(filters[k])
      ) as HdsFilterBarFilter;
    });

    return newFilters;
  };

  private _updateFilter(
    key: string,
    keyFilter?: HdsFilterBarFilter
  ): HdsFilterBarFilters {
    const newFilters = this._copyFilters(this.internalFilters);
    if (keyFilter === undefined) {
      delete newFilters[key];
    } else {
      Object.assign(newFilters, { [key]: keyFilter });
    }

    return { ...newFilters };
  }

  private _applyFilters = (closeDropdown?: () => void): void => {
    const { onFilter } = this.args;
    if (onFilter && typeof onFilter === 'function') {
      onFilter(this.internalFilters);
    }

    if (closeDropdown && typeof closeDropdown === 'function') {
      closeDropdown();
    }
  };
}
