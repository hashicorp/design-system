/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';

export default class HdsAppFrameIndexComponent extends Component {
  /**
   * Indicates if the "header" container should be displayed
   *
   * @param hasHeader
   * @type {boolean}
   * @default true
   */
  get hasHeader() {
    return this.args.hasHeader ?? true;
  }

  /**
   * Indicates if the "sidebar" container should be displayed
   *
   * @param hasSidebar
   * @type {boolean}
   * @default true
   */
  get hasSidebar() {
    return this.args.hasSidebar ?? true;
  }

  /**
   * Indicates if the "footer" container should be displayed
   *
   * @param hasFooter
   * @type {boolean}
   * @default true
   */
  get hasFooter() {
    return this.args.hasFooter ?? true;
  }

  /**
   * Indicates if the "modals" container should be displayed
   *
   * @param hasModals
   * @type {boolean}
   * @default true
   */
  get hasModals() {
    return this.args.hasModals ?? true;
  }
}
