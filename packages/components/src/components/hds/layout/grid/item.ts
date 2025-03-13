/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';

import type { AvailableTagNames, AvailableElements } from './types.ts';

export interface HdsLayoutGridItemSignature {
  Args: {
    tag?: AvailableTagNames;
    colSpan?: string;
    rowSpan?: string;
  };
  Blocks: {
    default: [];
  };
  Element: AvailableElements;
}

export default class HdsLayoutFlexItem extends Component<HdsLayoutGridItemSignature> {
  get componentTag(): AvailableTagNames {
    return this.args.tag ?? 'div';
  }

  get inlineStyles(): Record<string, unknown> {
    const inlineStyles: {
      '--hds-layout-grid-column-span'?: string;
      '--hds-layout-grid-row-span'?: string;
    } = {};

    inlineStyles['--hds-layout-grid-column-span'] = this.args.colSpan ?? '1';
    inlineStyles['--hds-layout-grid-row-span'] = this.args.rowSpan ?? '1';

    return inlineStyles;
  }
}
