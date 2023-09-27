/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { assert } from '@ember/debug';

export const STATUSES = {
  OPERATIONAL: {
    text: 'System operational',
    iconName: 'check-circle',
    iconColor: 'var(--token-color-foreground-success)',
  },
  DEGRADED: {
    text: 'System degraded',
    iconName: 'alert-triangle',
    iconColor: 'var(--token-color-foreground-warning)',
  },
  MAINTENANCE: {
    text: 'System maintenance',
    iconName: 'alert-triangle',
    iconColor: 'var(--token-color-foreground-warning)',
  },
  CRITICAL: {
    text: 'System critical',
    iconName: 'x-circle',
    iconColor: 'var(--token-color-foreground-critical)',
  },
};

export default class HdsAppFooterStatusLinkComponent extends Component {
  /**
   * @param status
   * @type {string}
   * @description The name of the status which the StatusLink is being set to
   */
  get status() {
    if (this.args.status) {
      assert(
        `@status for "Hds::AppFooter" must be one of the following: ${Object.keys(
          STATUSES
        ).join(', ')} received: ${this.args.status}`,
        Object.keys(STATUSES).includes(this.args.status.toUpperCase())
      );
      return this.args.status.toUpperCase();
    }
    return undefined;
  }

  /**
   * @param statusIcon
   * @type {string}
   * @description The name for the StatusLink icon
   */
  get statusIcon() {
    if (this.status && !this.args.statusIcon) {
      return STATUSES[this.status].iconName;
    }
    return this.args.statusIcon;
  }

  /**
   * @param statusIconColor
   * @type {string}
   * @description The color for the StatusLink icon
   */
  get statusIconColor() {
    if (this.status && !this.args.statusIconColor) {
      return STATUSES[this.status].iconColor;
    }
    return this.args.statusIconColor;
  }

  /**
   * @param text
   * @type {string}
   * @description The text content of the StatusLink
   */
  get text() {
    if (this.status && !this.args.text) {
      return STATUSES[this.status].text;
    }
    return this.args.text;
  }

  /**
   * @param href
   * @type {string}
   * @description The href value of the StatusLink
   */
  get href() {
    return this.args.href ?? 'https://status.hashicorp.com';
  }

  // /**
  //  * Get the class names to apply to the component.
  //  * @method classNames
  //  * @return {string} The "class" attribute to apply to the component.
  //  */
  // get classNames() {
  //   let classes = ['hds-app-footer__status-link-item'];

  //   return classes.join(' ');
  // }
}
