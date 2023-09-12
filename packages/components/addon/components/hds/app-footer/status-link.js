/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';

export const STATUSES = {
  OPERATIONAL: {
    iconName: 'check-circle-fill',
    iconColor: 'var(--token-color-foreground-success)',
  },
  DEGRADED: {
    iconName: 'alert-triangle',
    iconColor: 'var(--token-color-foreground-warning)',
  },
  OUTAGE: {
    iconName: 'x-square-fill',
    iconColor: 'var(--token-color-foreground-critical)',
  },
  MAINTENANCE: {
    iconName: 'info-fill',
    iconColor: 'var(--token-color-foreground-highlight)',
  },
};

export default class HdsAppFooterStatusLinkComponent extends Component {
  get status() {
    return this.args.status.toUpperCase();
  }

  get statusIcon() {
    return STATUSES[this.status.toUpperCase()].iconName;
  }

  get statusIconColor() {
    return STATUSES[this.status.toUpperCase()].iconColor;
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
