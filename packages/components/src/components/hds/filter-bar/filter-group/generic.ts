/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { action } from '@ember/object';

import type { HdsFilterBarFilter } from '../types.ts';

export interface HdsFilterBarFilterGroupGenericSignature {
  Args: {
    onChange?: (filter: HdsFilterBarFilter) => void;
  };
  Blocks: {
    default: [
      {
        updateFilter: (filter: HdsFilterBarFilter) => void;
      },
    ];
  };
  Element: HTMLDivElement;
}

export default class HdsFilterBarFilterGroupGeneric extends Component<HdsFilterBarFilterGroupGenericSignature> {
  @action
  updateFilter(filter: HdsFilterBarFilter): void {
    const { onChange } = this.args;
    if (onChange && typeof onChange === 'function') {
      onChange(filter);
    }
  }
}
