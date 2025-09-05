/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import type { WithBoundArgs } from '@glint/template';

import HdsDropdown from '../../dropdown/index.ts';
import HdsAdvancedTableFilterBarFiltersCheckbox from './filters-checkbox.ts';

import type { HdsDropdownSignature } from '../../dropdown/index.ts';

export interface HdsAdvancedTableFilterBarFiltersDropdownSignature {
  Args: HdsDropdownSignature['Args'] & {
    dropdown?: WithBoundArgs<typeof HdsDropdown, never>;
    activeFilterableColumns?: string[];
    onChange: (filterableColumns: string[]) => void;
  };
  Blocks: {
    default: [
      {
        Checkbox?: WithBoundArgs<
          typeof HdsAdvancedTableFilterBarFiltersCheckbox,
          'checkbox' | 'onChange' | 'activeFilterableColumns'
        >;
      },
    ];
  };
  Element: HTMLDivElement;
}

export default class HdsAdvancedTableFilterBarFiltersDropdown extends Component<
  HdsDropdownSignature & HdsAdvancedTableFilterBarFiltersDropdownSignature
> {
  @tracked activeFilterableColumns: string[] =
    this.args.activeFilterableColumns ?? [];

  @action
  onChange(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.checked) {
      this.activeFilterableColumns = [
        ...this.activeFilterableColumns,
        input.value,
      ];
    } else {
      this.activeFilterableColumns = this.activeFilterableColumns?.filter(
        (col) => col !== input.value
      );
    }
  }

  @action
  onApply(closeDropdown?: () => void): void {
    const { onChange } = this.args;
    if (onChange && typeof onChange === 'function') {
      onChange(this.activeFilterableColumns);
    }

    if (closeDropdown && typeof closeDropdown === 'function') {
      closeDropdown();
    }
  }

  @action
  onClear(closeDropdown?: () => void): void {
    this.activeFilterableColumns = [];

    const { onChange } = this.args;
    if (onChange && typeof onChange === 'function') {
      onChange(this.activeFilterableColumns);
    }

    if (closeDropdown && typeof closeDropdown === 'function') {
      closeDropdown();
    }
  }

  get classNames(): string {
    const classes = ['hds-advanced-table__filter-bar__filters-dropdown'];

    return classes.join(' ');
  }
}
