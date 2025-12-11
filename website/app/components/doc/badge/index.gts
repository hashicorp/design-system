/**
 * Copyright IBM Corp. 2021, 2025
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
  'neutral-inverted',
  'information-inverted',
  'success-inverted',
  'warning-inverted',
  'critical-inverted',
  'outlined-inverted',
];

type BadgeType = (typeof TYPES)[number];

interface DocBadgeSignature {
  Args: {
    type?: BadgeType;
    size?: 'large' | 'medium';
  };
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}

export default class DocBadge extends Component<DocBadgeSignature> {
  get type() {
    const type = this.args.type ?? 'neutral';

    assert(
      `@type for "Doc::Badge" must be one of the following: ${TYPES.join(
        ', ',
      )}; received: ${this.args.type}`,
      TYPES.includes(type),
    );

    return type;
  }

  get size() {
    return this.args.size ?? 'large';
  }

  get classNames() {
    const classes = ['doc-badge'];

    classes.push(`doc-badge--type-${this.type}`);
    classes.push(`doc-badge--size-${this.size}`);

    return classes.join(' ');
  }

  <template>
    <div class={{this.classNames}} ...attributes>
      {{yield}}
    </div>
  </template>
}
