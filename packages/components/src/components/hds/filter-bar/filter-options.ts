/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { modifier } from 'ember-modifier';
import type { WithBoundArgs } from '@glint/template';

import HdsTabsPanel from '../tabs/panel.ts';
import type { HdsTabsPanelSignature } from '../tabs/panel.ts';

import HdsFilterBarCheckbox from './checkbox.ts';
import HdsFilterBarRadio from './radio.ts';

import type {
  HdsFilterBarFilter,
  HdsFilterBarFilters,
  HdsFilterBarFilterType,
  HdsFilterBarData,
  HdsFilterBarSelectionFilterData,
  HdsFilterBarRangeFilterData,
  HdsFilterBarRangeFilterSelector,
} from './types.ts';

export interface HdsFilterBarFilterOptionsSignature {
  Args: {
    panel?: WithBoundArgs<typeof HdsTabsPanel, never>;
    key: string;
    type?: HdsFilterBarFilterType;
    filters: HdsFilterBarFilters;
    searchEnabled?: boolean;
    onChange: (key: string, keyFilter?: HdsFilterBarFilter) => void;
  };
  Blocks: {
    default: [
      {
        Checkbox?: WithBoundArgs<
          typeof HdsFilterBarCheckbox,
          'keyFilter' | 'onChange'
        >;
        Radio?: WithBoundArgs<
          typeof HdsFilterBarRadio,
          'keyFilter' | 'onChange'
        >;
      },
    ];
  };
  Element: HdsTabsPanelSignature['Element'];
}

export default class HdsFilterBarFilterOptions extends Component<HdsFilterBarFilterOptionsSignature> {
  @tracked internalFilters: HdsFilterBarData | undefined = [];

  private _element!: HdsTabsPanelSignature['Element'];

  private _setUpFilterOptions = modifier(
    (element: HdsTabsPanelSignature['Element']) => {
      this._element = element;

      if (this.keyFilter) {
        this.internalFilters = JSON.parse(
          JSON.stringify(this.keyFilter)
        ) as HdsFilterBarData;
      }
    }
  );

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
      } as HdsFilterBarSelectionFilterData;
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
          const newFilter = [] as HdsFilterBarSelectionFilterData[];
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

    const { onChange } = this.args;
    if (onChange && typeof onChange === 'function') {
      onChange(this.args.key, this.formattedFilters);
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
      } as HdsFilterBarRangeFilterData;
      return newFilter;
    };

    if (selector && value) {
      this.internalFilters = addFilter();
    } else {
      this.internalFilters = undefined;
    }

    const { onChange } = this.args;
    if (onChange && typeof onChange === 'function') {
      onChange(this.args.key, this.formattedFilters);
    }
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

  get classNames(): string {
    const classes = ['hds-filter-bar__filter-options'];

    classes.push(`hds-filter-bar__dropdown--type-${this.type}`);

    return classes.join(' ');
  }

  private onSearch = (event: Event) => {
    const listItems = this._element.querySelectorAll(
      '.hds-filter-bar__filters-dropdown__filter-option'
    );
    const input = event.target as HTMLInputElement;
    listItems.forEach((item) => {
      if (item.textContent) {
        const text = item.textContent.toLowerCase();
        const searchText = input.value.toLowerCase();
        if (text.includes(searchText)) {
          item.classList.remove(
            'hds-filter-bar__filters-dropdown__filter-option--hidden'
          );
        } else {
          item.classList.add(
            'hds-filter-bar__filters-dropdown__filter-option--hidden'
          );
        }
      }
    });
  };
}
