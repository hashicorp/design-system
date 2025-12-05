/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { assert } from '@ember/debug';

export const TYPES = [
  'info',
  'information',
  // 'success',
  'warning',
  'critical',
  'insight',
  'callout',
];

export default class DocBannerComponent extends Component {
  constructor() {
    super(...arguments);
    assert(
      `@type for "Doc::Banner" must be one of the following: ${TYPES.join(
        ', ',
      )}; received: ${this.args.type}`,
      TYPES.includes(this.args.type),
    );
  }

  get icon() {
    let icon;
    switch (this.args.type) {
      case 'info':
      case 'information':
        icon = 'info';
        break;
      case 'warning':
        icon = 'alert-triangle';
        break;
      case 'critical':
        icon = 'alert-diamond';
        break;
      case 'insight':
        icon = 'bulb';
        break;
      case 'callout':
        icon = 'discussion-circle';
        break;
      default:
        break;
    }
    return icon;
  }

  get classNames() {
    let classes = ['doc-banner'];

    // add a class based on the @type argument
    classes.push(`doc-banner--type-${this.args.type}`);

    return classes.join(' ');
  }
}
