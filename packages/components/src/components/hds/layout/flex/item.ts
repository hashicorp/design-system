/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';

// A list of all existing tag names in the HTMLElementTagNameMap interface
type AvailableTagNames = keyof HTMLElementTagNameMap;
// A union of all types in the HTMLElementTagNameMap interface
type AvailableElements = HTMLElementTagNameMap[keyof HTMLElementTagNameMap];

export interface HdsLayoutFlexItemSignature {
  Args: {
    tag?: AvailableTagNames;
    basis?: string;
    grow?: boolean | number | string;
    shrink?: boolean | number | string;
  };
  Blocks: {
    default: [];
  };
  Element: AvailableElements;
}

export default class HdsLayoutFlexItem extends Component<HdsLayoutFlexItemSignature> {
  get componentTag(): AvailableTagNames {
    return this.args.tag ?? 'div';
  }

  get inlineStyles(): Record<string, unknown> {
    const inlineStyles: {
      'flex-basis'?: string;
      'flex-grow'?: string;
      'flex-shrink'?: string;
    } = {};

    // we handle all cases of `basis` values via inline styles
    if (this.args.basis) {
      inlineStyles['flex-basis'] = this.args.basis;
    }

    // we handle non-standard cases of `grow` values via inline styles
    if (typeof this.args.grow === 'number' && this.args.grow > 1) {
      // the `{{style}}` modifier accepts only strings
      inlineStyles['flex-grow'] = this.args.grow.toString();
    } else if (typeof this.args.grow === 'string') {
      inlineStyles['flex-grow'] = this.args.grow;
    }

    // we handle non-standard cases of `shrink` values via inline styles
    if (typeof this.args.shrink === 'number' && this.args.shrink > 1) {
      // the `{{style}}` modifier accepts only strings
      inlineStyles['flex-shrink'] = this.args.shrink.toString();
    } else if (typeof this.args.shrink === 'string') {
      inlineStyles['flex-shrink'] = this.args.shrink;
    }

    return inlineStyles;
  }

  get classNames() {
    const classes = ['hds-layout-flex-item'];

    // add a class based on the @grow argument (if set to `0/1` or `true/false`)
    if (this.args.grow === 0 || this.args.grow === false) {
      classes.push('hds-layout-flex-item--grow-0');
    } else if (this.args.grow === 1 || this.args.grow === true) {
      classes.push('hds-layout-flex-item--grow-1');
    }

    // add a class based on the @shrink argument (if set to `0/1` or `true/false`)
    if (this.args.shrink === 0 || this.args.shrink === false) {
      classes.push('hds-layout-flex-item--shrink-0');
    } else if (this.args.shrink === 1 || this.args.shrink === true) {
      classes.push('hds-layout-flex-item--shrink-1');
    }

    return classes.join(' ');
  }
}
