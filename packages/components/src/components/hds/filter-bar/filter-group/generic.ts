/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { action } from '@ember/object';

import type {
  HdsFilterBarFilter,
  HdsFilterBarGenericFilter,
} from '../types.ts';

export interface HdsFilterBarFilterGroupGenericSignature {
  Args: {
    keyFilter: HdsFilterBarFilter | undefined;
    onChange?: (filter?: HdsFilterBarGenericFilter) => void;
  };
  Blocks: {
    default: [
      {
        updateFilter: (filter: HdsFilterBarGenericFilter) => void;
      },
    ];
  };
  Element: HTMLDivElement;
}

export default class HdsFilterBarFilterGroupGeneric extends Component<HdsFilterBarFilterGroupGenericSignature> {
  @action
  updateFilter(filter: HdsFilterBarGenericFilter): void {
    console.log('Update filter action triggered', filter);
    const { onChange } = this.args;
    if (onChange && typeof onChange === 'function') {
      onChange(filter);
    }
  }

  @action
  onClear(): void {
    console.log('Clear action triggered');
    const { onChange } = this.args;
    if (onChange && typeof onChange === 'function') {
      onChange();
    }
  }
}
