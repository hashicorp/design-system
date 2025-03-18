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

export default class HdsLayoutGridItem extends Component<HdsLayoutGridItemSignature> {
  get componentTag(): AvailableTagNames {
    return this.args.tag ?? 'div';
  }

  get inlineStyles(): Record<string, unknown> {
    const inlineStyles: {
      '--hds-layout-grid-column-span'?: string;
      '--hds-layout-grid-row-span'?: string;
    } = {};

    if (this.args.colSpan) {
      inlineStyles['--hds-layout-grid-column-span'] = this.args.colSpan;
    }
    if (this.args.rowSpan) {
      inlineStyles['--hds-layout-grid-row-span'] = this.args.rowSpan;
    }

    return inlineStyles;
  }
}
