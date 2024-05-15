/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { assert } from '@ember/debug';

interface HeaderHomeLinkSignature {
  Args: {
    ariaLabel: unknown;
    color: unknown;
    'current-when': unknown;
    href: unknown;
    icon: unknown;
    isHrefExternal: unknown;
    isRouteExternal: unknown;
    model: unknown;
    models: unknown;
    query: unknown;
    replace: unknown;
    route: unknown;
  };
  Element: HTMLElement;
}

export default class HeaderHomeLinkComponent extends Component<HeaderHomeLinkSignature> {
  /**
   * @param ariaLabel
   * @type {string}
   * @description The value of `aria-label`
   */
  get ariaLabel() {
    let { ariaLabel } = this.args;

    assert(
      '@ariaLabel for "Hds::SideNav::Header::HomeLink" ("Logo") must have a valid value',
      ariaLabel !== undefined
    );

    return ariaLabel;
  }
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Header::HomeLink': typeof HeaderHomeLinkComponent;
    'header/home-link': typeof HeaderHomeLinkComponent;
  }
}
