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
import type { HdsTabsPanelSignature } from '../../tabs/panel.ts';

import HdsFilterBarFilterGroupGeneric from './generic.ts';
import HdsFilterBarFilterGroupCheckbox from './checkbox.ts';
import HdsFilterBarFilterGroupRadio from './radio.ts';

import type {
  HdsFilterBarFilter,
  HdsFilterBarFilters,
  HdsFilterBarFilterType,
  HdsFilterBarData,
  HdsFilterBarGenericFilter,
  HdsFilterBarGenericFilterData,
  HdsFilterBarNumericalFilterData,
  HdsFilterBarNumericalFilterSelector,
  HdsFilterBarNumericalFilterValue,
  HdsFilterBarDateFilterData,
  HdsFilterBarDateFilterSelector,
  HdsFilterBarDateFilterValue,
} from '../types.ts';

export interface HdsFilterBarFilterGroupSignature {
  Args: {
    tab?: WithBoundArgs<typeof HdsFilterBarTabsTab, never>;
    panel?: WithBoundArgs<typeof HdsFilterBarTabsPanel, never>;
    key: string;
    text: string;
    type?: HdsFilterBarFilterType;
    filters: HdsFilterBarFilters;
    searchEnabled?: boolean;
    onChange: (key: string, keyFilter?: HdsFilterBarFilter) => void;
  };
  Blocks: {
    default: [
      {
        Generic?: WithBoundArgs<
          typeof HdsFilterBarFilterGroupGeneric,
          'keyFilter'
        >;
        Checkbox?: WithBoundArgs<
          typeof HdsFilterBarFilterGroupCheckbox,
          'keyFilter' | 'onChange'
        >;
        Radio?: WithBoundArgs<
          typeof HdsFilterBarFilterGroupRadio,
          'keyFilter' | 'onChange'
        >;
      },
    ];
  };
  Element: HdsTabsPanelSignature['Element'];
}

export default class HdsFilterBarFilterGroup extends Component<HdsFilterBarFilterGroupSignature> {
  @tracked internalFilters: HdsFilterBarData | undefined = [];

  private _panelElement!: HdsTabsPanelSignature['Element'];

  private _setUpFilterPanel = modifier(
    (element: HdsTabsPanelSignature['Element']) => {
      this._panelElement = element;

      if (this.keyFilter) {
        this.internalFilters = JSON.parse(
          JSON.stringify(this.keyFilter.data)
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
    if (
      this.internalFilters === undefined ||
      (Array.isArray(this.internalFilters) && this.internalFilters.length === 0)
    ) {
      return undefined;
    }
    return {
      type: this.type,
      text: this.args.text,
      data: this.internalFilters,
    } as HdsFilterBarFilter;
  }

  @action
  onSelectionChange(event: Event, label?: string): void {
    const addFilter = (value: unknown): void => {
      const newFilter = {
        value: value,
        label: label,
      } as HdsFilterBarGenericFilterData;
      if (this.type === 'single-select') {
        this.internalFilters = newFilter;
      } else {
        if (Array.isArray(this.internalFilters)) {
          this.internalFilters = [...this.internalFilters, newFilter];
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
          const newFilter = [] as HdsFilterBarGenericFilterData[];
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
  onNumericalChange(
    selector?: HdsFilterBarNumericalFilterSelector,
    value?: HdsFilterBarNumericalFilterValue
  ): void {
    const addFilter = (): HdsFilterBarData => {
      const newFilter = {
        selector: selector,
        value: value,
      } as HdsFilterBarNumericalFilterData;
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

  @action
  onDateChange(
    selector?: HdsFilterBarDateFilterSelector,
    value?: HdsFilterBarDateFilterValue
  ): void {
    const addFilter = (): HdsFilterBarData => {
      const newFilter = {
        selector: selector,
        value: value,
      } as HdsFilterBarDateFilterData;
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

  @action
  onGenericChange(filter?: HdsFilterBarGenericFilter): void {
    if (filter) {
      this.internalFilters = filter.data;
      filter.text = this.args.text;
    } else {
      this.internalFilters = undefined;
    }

    const { onChange } = this.args;
    if (onChange && typeof onChange === 'function') {
      onChange(this.args.key, filter);
    }
  }

  @action
  onClear(): void {
    this.internalFilters = undefined;

    const { onChange } = this.args;
    if (onChange && typeof onChange === 'function') {
      onChange(this.args.key, this.formattedFilters);
    }
  }

  get classNames(): string {
    const classes = ['hds-filter-bar__filter-group'];

    classes.push(`hds-filter-bar__dropdown--type-${this.type}`);

    return classes.join(' ');
  }

  private onSearch = (event: Event) => {
    const listItems = this._panelElement.querySelectorAll(
      '.hds-filter-bar__filter-group__selection-option'
    );
    const input = event.target as HTMLInputElement;
    listItems.forEach((item) => {
      if (item.textContent) {
        const text = item.textContent.toLowerCase();
        const searchText = input.value.toLowerCase();
        if (text.includes(searchText)) {
          item.classList.remove(
            'hds-filter-bar__filter-group__selection-option--hidden'
          );
        } else {
          item.classList.add(
            'hds-filter-bar__filter-group__selection-option--hidden'
          );
        }
      }
    });
  };
}
