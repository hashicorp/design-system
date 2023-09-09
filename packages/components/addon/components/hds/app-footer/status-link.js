/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';

export const STATUS_ICON_MAPPINGS = {
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
    return STATUS_ICON_MAPPINGS[this.status.toUpperCase()].iconName;
  }

  get statusIconColor() {
    return STATUS_ICON_MAPPINGS[this.status.toUpperCase()].iconColor;
  }

  /**
   * Get the class names to apply to the component.
   * @method classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames() {
    let classes = ['hds-app-footer__status-link'];

    // add a class based on the @status argument
    if (this.status) {
      classes.push(`hds-app-footer__status-link--${this.status.toLowerCase()}`);
    }

    return classes.join(' ');
  }
}
