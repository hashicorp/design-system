/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { modifier } from 'ember-modifier';
import type { WithBoundArgs } from '@glint/template';

import HdsFilterBarTabsTab from '../tabs/tab.ts';
import HdsFilterBarTabsPanel from '../tabs/panel.ts';

import HdsFilterBarFilterGroupGeneric from './generic.ts';
import HdsFilterBarFilterGroupCheckbox from './checkbox.ts';
import HdsFilterBarFilterGroupRadio from './radio.ts';

import type {
  HdsFilterBarFilter,
  HdsFilterBarFilters,
  HdsFilterBarFilterType,
  HdsFilterBarData,
  HdsFilterBarGenericFilterData,
} from '../types.ts';

export interface HdsFilterBarFilterGroupSignature {
  Args: {
    tab?: WithBoundArgs<typeof HdsFilterBarTabsTab, never>;
    panel?: WithBoundArgs<typeof HdsFilterBarTabsPanel, never>;
    key: string;
    text: string;
    type: HdsFilterBarFilterType;
    filters: HdsFilterBarFilters;
    searchEnabled?: boolean;
    onChange: (key: string, keyFilter?: HdsFilterBarFilter) => void;
    onClear?: (key: string) => void;
  };
  Blocks: {
    default: [
      {
        Generic?: WithBoundArgs<typeof HdsFilterBarFilterGroupGeneric, never>;
        Checkbox?: WithBoundArgs<
          typeof HdsFilterBarFilterGroupCheckbox,
          'keyFilter' | 'name' | 'searchValue' | 'onChange'
        >;
        Radio?: WithBoundArgs<
          typeof HdsFilterBarFilterGroupRadio,
          'keyFilter' | 'name' | 'searchValue' | 'onChange'
        >;
      },
    ];
  };
}

export default class HdsFilterBarFilterGroup extends Component<HdsFilterBarFilterGroupSignature> {
  @tracked internalFilters: HdsFilterBarData | undefined = undefined;
  @tracked searchValue: string | undefined = undefined;

  private _setUpFilterPanel = modifier(() => {
    // Note: Due to the filters being an Ember object, structuredClone cannot be used here.
    // Further investigation will be done in a follow-up task: https://hashicorp.atlassian.net/browse/HDS-5907
    if (this.keyFilter) {
      this.internalFilters = JSON.parse(
        JSON.stringify(this.keyFilter.data)
      ) as HdsFilterBarData;
    }
  });

  get keyFilter(): HdsFilterBarFilter | undefined {
    const { filters, key } = this.args;

    if (!filters) {
      return undefined;
    }
    return filters[key];
  }

  get numFilters(): number {
    const { filters, key } = this.args;
    if (filters && key in filters) {
      const keyFilters = filters[key]?.data;
      if (Array.isArray(keyFilters)) {
        return keyFilters.length;
      } else if (keyFilters) {
        return 1;
      }
    }
    return 0;
  }

  get formattedFilters(): HdsFilterBarFilter | undefined {
    const { type, text } = this.args;
    if (
      this.internalFilters === undefined ||
      (Array.isArray(this.internalFilters) && this.internalFilters.length === 0)
    ) {
      return undefined;
    }
    return {
      type: type,
      text: text,
      data: this.internalFilters,
    } as HdsFilterBarFilter;
  }

  @action
  onSelectionChange(event: Event, label?: string): void {
    const { type } = this.args;

    const addFilter = (value: unknown): void => {
      const newFilter = {
        value: value,
        label: label,
      } as HdsFilterBarGenericFilterData;
      if (type === 'multi-select') {
        if (Array.isArray(this.internalFilters)) {
          this.internalFilters = [...this.internalFilters, newFilter];
        } else {
          this.internalFilters = [newFilter];
        }
      } else {
        this.internalFilters = newFilter;
      }
    };

    const removeFilter = (value: string): void => {
      if (type === 'multi-select' && Array.isArray(this.internalFilters)) {
        const newFilter = [] as HdsFilterBarGenericFilterData[];
        this.internalFilters.forEach((filter) => {
          if (filter.value != value) {
            newFilter.push(filter);
          }
        });
        this.internalFilters = newFilter;
      } else {
        this.internalFilters = undefined;
      }
    };

    const input = event.target as HTMLInputElement;

    if (input.checked) {
      addFilter(input.value);
    } else {
      removeFilter(input.value);
    }

    const { onChange } = this.args;
    if (onChange && typeof onChange === 'function') {
      onChange(this.args.key, this.formattedFilters);
    }
  }

  @action
  onGenericChange(filter: HdsFilterBarFilter): void {
    this.internalFilters = filter.data;
    filter.text = this.args.text;

    const { onChange } = this.args;
    if (onChange && typeof onChange === 'function') {
      onChange(this.args.key, filter);
    }
  }

  @action
  onClear(): void {
    this.internalFilters = undefined;
    const { onChange, onClear } = this.args;

    if (onClear && typeof onClear === 'function') {
      onClear(this.args.key);
    }

    if (onChange && typeof onChange === 'function') {
      onChange(this.args.key);
    }
  }

  private _onSearch = (event: Event) => {
    const input = event.target as HTMLInputElement;
    this.searchValue = input.value;
  };
}
