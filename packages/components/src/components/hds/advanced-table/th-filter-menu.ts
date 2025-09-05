/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { modifier } from 'ember-modifier';

import type HdsAdvancedTableColumn from './models/column.ts';
import type { HdsDropdownSignature } from '../dropdown/index.ts';
import type {
  HdsAdvancedTableFilter,
  HdsAdvancedTableFilters,
} from './types.ts';

export interface HdsAdvancedTableThFilterMenuSignature {
  Args: {
    column: HdsAdvancedTableColumn;
    filters?: HdsAdvancedTableFilters;
    isLiveFilter?: boolean;
    onFilter?: (
      key: string,
      keyFilter?: HdsAdvancedTableFilter | HdsAdvancedTableFilter[]
    ) => void;
  };
  Element: HdsDropdownSignature['Element'];
}

export default class HdsAdvancedTableThFilterMenu extends Component<HdsAdvancedTableThFilterMenuSignature> {
  @tracked internalFilters:
    | HdsAdvancedTableFilter[]
    | HdsAdvancedTableFilter
    | undefined = [];
  @tracked hasActiveFilters: boolean = this.keyFilter !== undefined;

  private _updateInternalFilters = modifier(() => {
    this.internalFilters = this.keyFilter;
  });

  get keyFilter():
    | HdsAdvancedTableFilter[]
    | HdsAdvancedTableFilter
    | undefined {
    const { filters, column } = this.args;

    if (!filters || !column) {
      return undefined;
    }
    return filters[column.key];
  }

  @action
  onFilter(event: Event): void {
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
      const { onFilter, column } = this.args;
      if (onFilter && typeof onFilter === 'function') {
        if (newFilter.length === 0) {
          onFilter(column?.key, undefined);
        } else {
          onFilter(column?.key, newFilter);
        }
        this.hasActiveFilters = newFilter != undefined && newFilter.length > 0;
      }
    }
  }

  @action
  onApply(): void {
    const { onFilter, column } = this.args;
    if (onFilter && typeof onFilter === 'function') {
      onFilter(column?.key, this.internalFilters);
    }
  }

  @action
  onClear(): void {
    this.internalFilters = [];

    const { onFilter, column } = this.args;
    if (onFilter && typeof onFilter === 'function') {
      onFilter(column?.key, this.internalFilters);
    }
  }

  private _isChecked = (value: string): boolean => {
    if (Array.isArray(this.internalFilters)) {
      return this.internalFilters.some((filter) => filter.value === value);
    } else if (this.internalFilters && value) {
      return this.internalFilters.value === value;
    }
    return false;
  };
}
