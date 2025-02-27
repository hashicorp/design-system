/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { htmlSafe } from '@ember/template';
import { assert } from '@ember/debug';

import type { SafeString } from '@ember/template';
import type { HdsInteractiveSignature } from '../interactive/';
import { HdsAppFooterStatusLinkStatusValues } from './types.ts';
import type { HdsAppFooterStatusTypes } from './types.ts';
import type { HdsAppFooterLinkSignature } from './link.ts';
import type { HdsIconSignature } from '../icon';
import type Owner from '@ember/owner';

export const STATUSES = HdsAppFooterStatusLinkStatusValues;

export interface HdsAppFooterStatusLinkSignature {
  Args: HdsInteractiveSignature['Args'] & {
    itemStyle?: SafeString;
    status?: HdsAppFooterStatusTypes;
    statusIcon?: HdsIconSignature['Args']['name'];
    statusIconColor?: string;
    text?: string;
  };
  Element: HdsAppFooterLinkSignature['Element'];
}

export default class HdsAppFooterStatusLink extends Component<HdsAppFooterStatusLinkSignature> {
  constructor(owner: Owner, args: HdsInteractiveSignature['Args']) {
    super(owner, args);

    assert(
      'Either @status or @text for "Hds::AppFooter::StatusLink" must have a valid value',
      this.args.text !== undefined || this.args.status
    );
  }

  /**
   * @param status
   * @type {HdsAppFooterStatusTypes}
   * @description The name of the status which the StatusLink is being set to
   */
  get status(): HdsAppFooterStatusTypes | undefined {
    let status;
    if (this.args.status) {
      status = this.args.status.toLowerCase();
      assert(
        `@status for "Hds::AppFooter" must be one of the following: ${Object.keys(
          STATUSES
        ).join(', ')} received: ${this.args.status}`,

        status in STATUSES
      );
      return status as HdsAppFooterStatusTypes;
    }
    return status;
  }

  get statusIcon(): HdsIconSignature['Args']['name'] | undefined {
    return (
      this.args.statusIcon ??
      (this.status !== undefined ? STATUSES[this.status]?.iconName : undefined)
    );
  }

  /**
   * Get the inline style to apply to the item.
   * @method StatusLink#itemStyle
   * @return {string} The "style" attribute to apply to the item.
   */
  get itemStyle(): SafeString | undefined {
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
  get text(): string | undefined {
    if (!this.args.text && this.status) {
      return STATUSES[this.status]?.text;
    }
    return this.args.text;
  }

  /**
   * @param href
   * @type {string}
   * @description The href value of the StatusLink
   */
  get href(): string {
    return this.args.href ?? 'https://status.hashicorp.com';
  }

  /**
   * Get the class names to apply to the component.
   * @method classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames(): string {
    const classes = ['hds-app-footer__status-link'];

    // add a class based on status if no statusIconColor is explicitly specified
    if (this.status && !this.args.statusIconColor) {
      classes.push(`hds-app-footer__status-link--${this.status}`);
    }

    return classes.join(' ');
  }
}
