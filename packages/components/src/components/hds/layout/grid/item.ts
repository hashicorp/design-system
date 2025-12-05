/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';

import type { AvailableTagNames, AvailableElements } from './types.ts';

export interface HdsLayoutGridItemSignature {
  Args: {
    tag?: AvailableTagNames;
    colspan?: number;
    rowspan?: number;
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

    if (this.args.colspan) {
      inlineStyles['--hds-layout-grid-column-span'] =
        this.args.colspan.toString();
    }
    if (this.args.rowspan) {
      inlineStyles['--hds-layout-grid-row-span'] = this.args.rowspan.toString();
    }

    return inlineStyles;
  }
}
