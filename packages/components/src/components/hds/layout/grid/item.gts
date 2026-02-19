/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { element } from 'ember-element-helper';
import style from 'ember-style-modifier';

import type { AvailableTagNames, AvailableElements } from './types.ts';

type ResponsiveSpan = {
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
  xxl?: number;
};

export interface HdsLayoutGridItemSignature {
  Args: {
    tag?: AvailableTagNames;
    colspan?: number | ResponsiveSpan;
    rowspan?: number | ResponsiveSpan;
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

      // responsive
      // column span
      '--hds-layout-grid-column-span-sm'?: string;
      '--hds-layout-grid-column-span-md'?: string;
      '--hds-layout-grid-column-span-lg'?: string;
      '--hds-layout-grid-column-span-xl'?: string;
      '--hds-layout-grid-column-span-xxl'?: string;

      // row span
      '--hds-layout-grid-row-span-sm'?: string;
      '--hds-layout-grid-row-span-md'?: string;
      '--hds-layout-grid-row-span-lg'?: string;
      '--hds-layout-grid-row-span-xl'?: string;
      '--hds-layout-grid-row-span-xxl'?: string;
    } = {};

    if (this.args.colspan) {
      if (typeof this.args.colspan === 'number') {
        inlineStyles['--hds-layout-grid-column-span'] =
          this.args.colspan.toString();
      } else if (typeof this.args.colspan === 'object') {
        // Responsive column spans
        if (this.args.colspan.sm) {
          inlineStyles['--hds-layout-grid-column-span-sm'] =
            this.args.colspan.sm.toString();
        }
        if (this.args.colspan.md) {
          inlineStyles['--hds-layout-grid-column-span-md'] =
            this.args.colspan.md.toString();
        }
        if (this.args.colspan.lg) {
          inlineStyles['--hds-layout-grid-column-span-lg'] =
            this.args.colspan.lg.toString();
        }
        if (this.args.colspan.xl) {
          inlineStyles['--hds-layout-grid-column-span-xl'] =
            this.args.colspan.xl.toString();
        }
        if (this.args.colspan.xxl) {
          inlineStyles['--hds-layout-grid-column-span-xxl'] =
            this.args.colspan.xxl.toString();
        }
      }
    }

    if (this.args.rowspan) {
      if (typeof this.args.rowspan === 'number') {
        inlineStyles['--hds-layout-grid-row-span'] =
          this.args.rowspan.toString();
      } else if (typeof this.args.rowspan === 'object') {
        // Responsive row spans
        if (this.args.rowspan.sm) {
          inlineStyles['--hds-layout-grid-row-span-sm'] =
            this.args.rowspan.sm.toString();
        }
        if (this.args.rowspan.md) {
          inlineStyles['--hds-layout-grid-row-span-md'] =
            this.args.rowspan.md.toString();
        }
        if (this.args.rowspan.lg) {
          inlineStyles['--hds-layout-grid-row-span-lg'] =
            this.args.rowspan.lg.toString();
        }
        if (this.args.rowspan.xl) {
          inlineStyles['--hds-layout-grid-row-span-xl'] =
            this.args.rowspan.xl.toString();
        }
        if (this.args.rowspan.xxl) {
          inlineStyles['--hds-layout-grid-row-span-xxl'] =
            this.args.rowspan.xxl.toString();
        }
      }
    }

    return inlineStyles;
  }

  get classNames(): string {
    const classes = ['hds-layout-grid-item'];

    // add classes based on responsive colspan
    if (typeof this.args.colspan === 'object') {
      if (this.args.colspan.sm) {
        classes.push(`hds-layout-grid--col-span-view-sm`);
      }
      if (this.args.colspan.md) {
        classes.push(`hds-layout-grid--col-span-view-md`);
      }
      if (this.args.colspan.lg) {
        classes.push(`hds-layout-grid--col-span-view-lg`);
      }
      if (this.args.colspan.xl) {
        classes.push(`hds-layout-grid--col-span-view-xl`);
      }
      if (this.args.colspan.xxl) {
        classes.push(`hds-layout-grid--col-span-view-xxl`);
      }
    }

    // add classes based on responsive rowspan
    if (typeof this.args.rowspan === 'object') {
      if (this.args.rowspan.sm) {
        classes.push(`hds-layout-grid--row-span-view-sm`);
      }
      if (this.args.rowspan.md) {
        classes.push(`hds-layout-grid--row-span-view-md`);
      }
      if (this.args.rowspan.lg) {
        classes.push(`hds-layout-grid--row-span-view-lg`);
      }
      if (this.args.rowspan.xl) {
        classes.push(`hds-layout-grid--row-span-view-xl`);
      }
      if (this.args.rowspan.xxl) {
        classes.push(`hds-layout-grid--row-span-view-xxl`);
      }
    }

    return classes.join(' ');
  }

  <template>
    {{#let (element this.componentTag) as |Tag|}}
      <Tag
        class={{this.classNames}}
        {{style this.inlineStyles}}
        ...attributes
      >{{yield}}</Tag>
    {{/let}}
  </template>
}
