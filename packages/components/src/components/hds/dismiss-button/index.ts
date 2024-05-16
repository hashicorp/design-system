/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';

export interface HdsDismissButtonSignature {
  Args: {
    ariaLabel?: string;
  };
  Element: HTMLButtonElement;
}

export default class HdsDismissButtonComponent extends Component<HdsDismissButtonSignature> {
  /**
   * @param ariaLabel
   * @type {string}
   * @default 'Dismiss'
   */
  get ariaLabel() {
    return this.args.ariaLabel ?? 'Dismiss';
  }
}
