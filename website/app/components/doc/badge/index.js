/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { assert } from '@ember/debug';

export const TYPES = [
  'neutral',
  'information',
  'success',
  'warning',
  'critical',
  'outlined',
];

export default class DocBadgeComponent extends Component {
  constructor() {
    super(...arguments);
    assert(
      `@type for "Doc::Badge" must be one of the following: ${TYPES.join(
        ', '
      )}; received: ${this.args.type}`,
      TYPES.includes(this.args.type)
    );
  }

  get type() {
    return this.args.type ?? 'neutral';
  }

  get classNames() {
    let classes = ['doc-badge'];

    // add a class based on the @type argument
    classes.push(`doc-badge--type-${this.type}`);

    return classes.join(' ');
  }
}
