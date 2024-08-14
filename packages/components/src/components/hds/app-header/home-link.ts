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
    ariaLabel: string;
  };
  Element: HdsInteractiveSignature['Element'];
}

export default class HdsAppHeaderHomeLinkComponent extends Component<HdsAppHeaderHomeLinkSignature> {
  get ariaLabel(): string {
    const { ariaLabel } = this.args;

    assert(
      '@ariaLabel for "Hds::AppHeader::HomeLink" ("Logo") must have a valid value',
      ariaLabel !== undefined
    );

    return ariaLabel;
  }
}
