/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { action } from '@ember/object';
import type { WithBoundArgs } from '@glint/template';

import HdsDropdownListItemCheckbox from '../dropdown/list-item/checkbox.ts';

import type { HdsDropdownSignature } from '../dropdown/index.ts';

export interface HdsAdvancedTableFilterBarFiltersCheckboxSignature {
  Args: HdsDropdownSignature['Args'] & {
    checkbox?: WithBoundArgs<typeof HdsDropdownListItemCheckbox, never>;
    value?: string;
    activeFilterableColumns?: string[];
    onChange?: (event: Event) => void;
  };
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}

export default class HdsAdvancedTableFilterBarFiltersCheckbox extends Component<HdsAdvancedTableFilterBarFiltersCheckboxSignature> {
  @action
  onChange(event: Event): void {
    const { onChange } = this.args;
    if (onChange && typeof onChange === 'function') {
      onChange(event);
    }
  }

  get isChecked(): boolean {
    const { value, activeFilterableColumns } = this.args;
    return activeFilterableColumns?.includes(value || '') || false;
  }
}
