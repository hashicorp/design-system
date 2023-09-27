/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';

export default class HdsAppFooterCopyrightComponent extends Component {
  /**
   * @param year
   * @type {string}
   * @description The copyright year
   * @default The current year (calculated via `Date()`)
   */
  get year() {
    return this.args.year ?? new Date().getFullYear();
  }
}
