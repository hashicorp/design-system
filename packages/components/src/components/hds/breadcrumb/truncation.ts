/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';

export interface HdsBreadcrumbTruncationSignature {
  Args: {
    ariaLabel?: string;
  };
  Blocks: {
    default: [];
  };
  Element: HTMLLIElement;
}

export default class HdsBreadcrumbTruncationComponent extends Component<HdsBreadcrumbTruncationSignature> {
  /**
   * @param ariaLabel
   * @type {string}
   * @default 'show more'
   */
  get ariaLabel() {
    return this.args.ariaLabel ?? 'show more';
  }
}
