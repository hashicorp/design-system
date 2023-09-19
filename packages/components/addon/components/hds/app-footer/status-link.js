/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';

export const STATUSES = {
  OPERATIONAL: {
    text: 'Operational',
    iconName: 'check-circle-fill',
    iconColor: 'var(--token-color-foreground-success)',
  },
  DEGRADED: {
    text: 'Degraded',
    iconName: 'alert-triangle',
    iconColor: 'var(--token-color-foreground-warning)',
  },
  OUTAGE: {
    text: 'Outage',
    iconName: 'x-square-fill',
    iconColor: 'var(--token-color-foreground-critical)',
  },
  MAINTENANCE: {
    text: 'Maintenance',
    iconName: 'info-fill',
    iconColor: 'var(--token-color-foreground-highlight)',
  },
};

export default class HdsAppFooterStatusLinkComponent extends Component {
  /**
   * @param ariaLabel
   * @type {string}
   * @description The name of the status which the StatusLink is being set to
   */
  get status() {
    return this.args.status.toUpperCase();
  }

  /**
   * @param statusIcon
   * @type {string}
   * @description The name for the StatusLink icon
   */
  get statusIcon() {
    return this.args.statusIcon ?? STATUSES[this.status.toUpperCase()].iconName;
  }

  /**
   * @param statusIconColor
   * @type {string}
   * @description The color for the StatusLink icon
   */
  get statusIconColor() {
    return (
      this.args.statusIconColor ?? STATUSES[this.status.toUpperCase()].iconColor
    );
  }

  /**
   * @param text
   * @type {string}
   * @description The text content of the StatusLink
   */
  get text() {
    return this.args.text ?? STATUSES[this.status.toUpperCase()].text;
  }

  /**
   * @param href
   * @type {string}
   * @description The href value of the StatusLink
   */
  get href() {
    return this.args.href ?? 'https://status.hashicorp.com';
  }

  /**
   * Get the class names to apply to the component.
   * @method classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames() {
    let classes = ['hds-app-footer__status-link'];

    return classes.join(' ');
  }
}
