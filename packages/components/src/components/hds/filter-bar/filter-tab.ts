/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import type { WithBoundArgs } from '@glint/template';

import HdsTabsTab from '../tabs/tab.ts';
import type { HdsFilterBarFilters } from './types.ts';

export interface HdsFilterBarFilterTabSignature {
  Args: {
    tab?: WithBoundArgs<typeof HdsTabsTab, never>;
    key: string;
    filters?: HdsFilterBarFilters;
  };
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}

export default class HdsFilterBarFilterTab extends Component<HdsFilterBarFilterTabSignature> {
  get numFilters(): number {
    const { key, filters } = this.args;
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
}
