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

import HdsFilterBarFilterGroup from './filter-group/index.ts';
import type { HdsFilterBarFilters, HdsFilterBarFilter } from './types.ts';

import type { HdsDropdownSignature } from '../dropdown/index.ts';

export interface HdsFilterBarDropdownSignature {
  Args: {
    filters: HdsFilterBarFilters;
    isLiveFilter?: boolean;
    onFilter?: (filters: HdsFilterBarFilters) => void;
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
  Element: HTMLDivElement;
}

export default class HdsFilterBarDropdown extends Component<HdsFilterBarDropdownSignature> {
  @tracked internalFilters: HdsFilterBarFilters = {};

  constructor(owner: Owner, args: HdsFilterBarDropdownSignature['Args']) {
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

  get isLiveFilter(): boolean {
    return this.args.isLiveFilter || false;
  }

  @action
  onFilter(key: string, keyFilter?: HdsFilterBarFilter): void {
    this.internalFilters = this._updateFilter(key, keyFilter);

    if (this.isLiveFilter) {
      this._applyFilters();
    }
  }

  @action
  onApply(closeDropdown?: () => void): void {
    this._applyFilters(closeDropdown);
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

  private _copyFilters = (
    filters: HdsFilterBarFilters
  ): HdsFilterBarFilters => {
    const newFilters = {} as HdsFilterBarFilters;

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

  private _onClose = (): void => {
    const { filters } = this.args;
    if (filters) {
      this.internalFilters = this._copyFilters(filters);
    } else {
      this.internalFilters = {};
    }
  };
}
