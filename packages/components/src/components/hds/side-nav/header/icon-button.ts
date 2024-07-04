/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { assert } from '@ember/debug';

import type { FlightIconSignature } from '@hashicorp/ember-flight-icons/components/flight-icon';
import type { HdsInteractiveSignature } from '../../interactive/';

interface HdsSideNavHeaderIconButtonSignature {
  Args: HdsInteractiveSignature['Args'] & {
    icon: FlightIconSignature['Args']['name'];
    ariaLabel: string;
  };
  Element: HdsInteractiveSignature['Element'];
}

export default class HdsSideNavHeaderIconButtonComponent extends Component<HdsSideNavHeaderIconButtonSignature> {
  /**
   * @param ariaLabel
   * @type {string}
   * @description The value of `aria-label`
   */
  get ariaLabel(): string {
    const { ariaLabel } = this.args;

    assert(
      '@ariaLabel for "Hds::SideNav::Header::IconButton" must have a valid value',
      ariaLabel !== undefined
    );

    return ariaLabel;
  }
}
