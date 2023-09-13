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
  get status() {
    return this.args.status.toUpperCase();
  }

  get statusIcon() {
    return this.args.statusIcon ?? STATUSES[this.status.toUpperCase()].iconName;
  }

  get statusIconColor() {
    return (
      this.args.statusIconColor ?? STATUSES[this.status.toUpperCase()].iconColor
    );
  }

  get text() {
    return this.args.text ?? STATUSES[this.status.toUpperCase()].text;
  }

  get linkUrl() {
    return this.args.linkUrl ?? 'https://status.hashicorp.com';
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
