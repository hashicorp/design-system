/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { HdsTreeGridThExpandIconValues } from './types.ts';
import type { HdsTreeGridThExpandIcons } from './types';

export interface HdsTreeGridThButtonExpandSignature {
  Args: {
    labelId?: string;
    onClick?: () => void;
    isExpanded?: boolean;
  };
  Element: HTMLButtonElement;
}

const NOOP = () => {};

export default class HdsTreeGridThButtonExpand extends Component<HdsTreeGridThButtonExpandSignature> {
  get icon(): HdsTreeGridThExpandIcons {
    return this.args.isExpanded
      ? HdsTreeGridThExpandIconValues.ChevronDown
      : HdsTreeGridThExpandIconValues.ChevronRight;
  }

  get onClick(): () => void {
    const { onClick } = this.args;

    if (typeof onClick === 'function') {
      return onClick;
    } else {
      return NOOP;
    }
  }

  get classNames(): string {
    const classes = ['hds-table__th-button', 'hds-table__th-button--expand'];

    return classes.join(' ');
  }
}
