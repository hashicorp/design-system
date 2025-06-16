/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { assert } from '@ember/debug';

import type { HdsIconSignature } from '../icon';
import type { HdsInteractiveSignature } from '../interactive/';

export interface HdsAppHeaderHomeLinkSignature {
  Args: HdsInteractiveSignature['Args'] & {
    icon: HdsIconSignature['Args']['name'];
    color?: string;
    title?: string;
    ariaLabel: string;
  };
  Element: HdsInteractiveSignature['Element'];
}

export default class HdsAppHeaderHomeLink extends Component<HdsAppHeaderHomeLinkSignature> {
  get title(): string {
    const { title } = this.args;

    return title || '';
  }

  get ariaLabel(): string {
    const { ariaLabel, title } = this.args;

    assert(
      '@ariaLabel for "Hds::AppHeader::HomeLink" ("Logo") must have a valid value',
      ariaLabel !== undefined
    );

    // If title exists, prefix the aria label with it, otherwise use the provided ariaLabel
    return title ? `${title} ${ariaLabel}` : ariaLabel;
  }

}
