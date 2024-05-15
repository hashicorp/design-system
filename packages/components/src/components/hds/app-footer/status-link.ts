/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { htmlSafe } from '@ember/template';
import { assert } from '@ember/debug';

import type { HdsInteractiveSignature } from '../interactive/';
import { HdsAppFooterStatusLinkStatusValues } from './types.ts';
import type { HdsAppFooterStatusTypes } from './types.ts';

export const STATUSES: { text: string; iconName: string }[] = Object.values(
  HdsAppFooterStatusLinkStatusValues
);

export interface HdsAppFooterStatusLinkSignature {
  Args: HdsInteractiveSignature['Args'] & {
    itemStyle?: string;
    status: HdsAppFooterStatusTypes;
    statusIcon?: string;
    statusIconColor?: string;
    text?: string;
  };
  Blocks: {
    default: [];
  };
  Element: HdsInteractiveSignature['Element'];
}

export default class HdsAppFooterStatusLinkComponent extends Component<HdsAppFooterStatusLinkSignature> {
  constructor(
    owner: unknown,
    args: HdsInteractiveSignature['Args'] & { status?: string }
  ) {
    super(owner, {
      ...args,
      status: args.status as HdsAppFooterStatusTypes,
    });

    assert(
      'Either @status or @text for "Hds::AppFooter::StatusLink" must have a valid value',
      this.args.text !== undefined || this.args.status
    );
  }

  /**
   * @param status
   * @type {string}
   * @description The name of the status which the StatusLink is being set to
   */
  get status() {
    let status;
    if (this.args.status) {
      status = this.args.status.toLowerCase();
      assert(
        `@status for "Hds::AppFooter" must be one of the following: ${Object.keys(
          STATUSES
        ).join(', ')} received: ${this.args.status}`,
        Object.keys(STATUSES).includes(status)
      );
    }
    return status;
  }

  /**
   * @param statusIcon
   * @type {string}
   * @description The name for the StatusLink icon
   */
  get statusIcon() {
    if (this.status && !this.args.statusIcon) {
      return STATUSES[index].iconName;
    }
    return this.args.statusIcon;
  }

  /**
   * Get the inline style to apply to the item.
   * @method StatusLink#itemStyle
   * @return {string} The "style" attribute to apply to the item.
   */
  get itemStyle() {
    if (this.args.statusIconColor) {
      return htmlSafe(
        `--hds-app-footer-status-icon-color: ${this.args.statusIconColor}`
      );
    } else {
      return undefined;
    }
  }

  /**
   * @param text
   * @type {string}
   * @description The text content of the StatusLink
   */
  get text() {
    if (!this.args.text) {
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

  /**
   * Get the class names to apply to the component.
   * @method classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames() {
    const classes = ['hds-app-footer__status-link'];

    // add a class based on status if no statusIconColor is explicitly specified
    if (this.status && !this.args.statusIconColor) {
      classes.push(`hds-app-footer__status-link--${this.status}`);
    }

    return classes.join(' ');
  }
}
