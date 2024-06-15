/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { assert } from '@ember/debug';

import type { HdsInteractiveSignature } from '../interactive/';

export interface HdsAppHeaderHomeLinkSignature {
  Args: HdsInteractiveSignature['Args'] & {
    ariaLabel: string;
    color?: string;
    icon?: string;
  };
  Element: HdsInteractiveSignature['Element'];
}

export default class HdsAppHeaderHomeLinkComponent extends Component<HdsAppHeaderHomeLinkSignature> {
  /**
   * @param ariaLabel
   * @type {string}
   * @description The value of `aria-label`
   */
  get ariaLabel() {
    const { ariaLabel } = this.args;

    assert(
      '@ariaLabel for "Hds::AppHeader::HomeLink" ("Logo") must have a valid value',
      ariaLabel !== undefined
    );

    return ariaLabel;
  }
}
