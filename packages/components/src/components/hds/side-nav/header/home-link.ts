/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { assert } from '@ember/debug';

import type { FlightIconSignature } from '@hashicorp/ember-flight-icons/components/flight-icon';
import type { HdsInteractiveSignature } from '../../interactive/';

interface HdsSideNavHeaderHomeLinkSignature {
  Args: HdsInteractiveSignature['Args'] & {
    icon: FlightIconSignature['Args']['name'];
    color?: string;
    ariaLabel: string;
  };
  Element: HdsInteractiveSignature['Element'];
}

export default class HdsSideNavHeaderHomeLinkComponent extends Component<HdsSideNavHeaderHomeLinkSignature> {
  /**
   * @param ariaLabel
   * @type {string}
   * @description The value of `aria-label`
   */
  get ariaLabel() {
    const { ariaLabel } = this.args;

    assert(
      '@ariaLabel for "Hds::SideNav::Header::HomeLink" ("Logo") must have a valid value',
      ariaLabel !== undefined
    );

    return ariaLabel;
  }
}
